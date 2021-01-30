const discord = require('discord.js')
const bot = new discord.Client()

const ytdl = require('ytdl-core')

const config = require('./config/config.json')
const secrets = require('./config/secrets.json')

bot.on('ready', () => {
  console.log('Bot is ready...')
})

bot.on('voiceStateUpdate', async (oldVoice, newVoice) => {
  if (newVoice.channel && newVoice.client.user.id === bot.user.id) {
    newVoice.connection.play(await ytdl(config.stream, {type: 'opus'}))
  }
})

bot.on('message', message => {
  if (message.author.bot) return
	if (message.channel.type === 'dm') return

	bot.prefix = config.prefix
	let msgArray = message.content.split(' ')
	let cmd = msgArray[0]
	let args = msgArray.splice(1)

	if (cmd.startsWith(bot.prefix)) {
		let command = cmd.slice(bot.prefix.length)
		if (command === 'join') {
      let voiceChannel = message.member.voice.channel
      if (!voiceChannel) return message.reply('Please join a voice channel first')
      voiceChannel.join()
      message.channel.send('Joined the voice channel')
    }
	}
})

bot.login(secrets.token)