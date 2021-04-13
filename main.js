const discord = require('discord.js')
const bot = new discord.Client()

const fs = require('fs')

const config = require('./config/config.json')
require('dotenv').config()

bot.commands = new discord.Collection()
bot.aliases = new discord.Collection()

fs.readdir('./commands/', (err, files) => {
	let jsfiles = files.filter((f) => f.split('.').pop() === 'js')
	jsfiles.forEach((f, i) => {
		let props = require(`./commands/${f}`)
		bot.commands.set(props.help.name, props)
		props.help.aliases.forEach((alias) => {
			bot.aliases.set(alias, props.help.name, props)
		})
	})
})

bot.on('ready', () => {
  console.log('Bot is ready...')
  bot.user.setActivity(`lo-fi in ${bot.guilds.cache.size} servers`, {type: 'PLAYING'})
  setInterval(() => {
   bot.user.setActivity(`lo-fi in ${bot.guilds.cache.size} servers`, {type: 'PLAYING'})   
  }, 100000)
})

bot.on('message', message => {
  if (message.author.bot) return
	if (message.channel.type === 'dm') return

	bot.prefix = process.env.PREFIX || config.prefix
	let msgArray = message.content.split(' ')
	let cmd = msgArray[0]
	let args = msgArray.splice(1)

	if (cmd.startsWith(bot.prefix)) {
		let cmdfile =
			bot.commands.get(cmd.slice(bot.prefix.length)) ||
			bot.commands.get(bot.aliases.get(cmd.slice(bot.prefix.length)))
		if (cmdfile) {
			cmdfile.run(bot, message, args)
		} else {
			message.channel.send(
				`I do not have such command. Use \`${bot.prefix}help\` to see all commands!`
			)
		}
	}
})

bot.login(process.env.TOKEN)
