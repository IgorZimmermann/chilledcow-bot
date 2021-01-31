const discord = require('discord.js')
const { readdirSync } = require('fs')

const colors = require('../config/colors.json')

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

module.exports.run = async (bot, message, args) => {
	let helpEmbed = new discord.MessageEmbed()
		.setAuthor(bot.user.username)
		.setColor(colors.orange)
	let command = args[0]
	let commands = readdirSync('./commands/').filter(f => f.endsWith('.js'))
	if (!command) {
		commands.forEach((c, i) => {
			let props = require(`./${c}`).help
			let callwords
			if (props.aliases.length > 0 && props.aliases[0] !== '') {
				callwords = `${props.name}, ${props.aliases.join(', ')}`
			} else {
				callwords = props.name
			}
			helpEmbed.addField(
				capitalizeFirstLetter(props.name),
				`\n\nCallwords:  ${callwords}\n\nDescription:  ${props.description}\n\nHas Access:  ${props.hasAccess}\n\nUsage:  ${props.usage.replace('.', bot.prefix)}\n\n`
			)
		})
		message.channel.send(helpEmbed)
	} else if (command) {
		let cmdFile =
			bot.commands.get(command) || bot.commands.get(bot.aliases.get(command))
		if (!cmdFile) {
			return message.channel.send(
				`I do not have such command. Use \`${bot.prefix}help\` to see all commands!`
			)
		} else {
			let callwords
			if (cmdFile.help.aliases.length > 0 && cmdFile.help.aliases[0] !== '') {
				callwords = `${cmdFile.help.name}, ${cmdFile.help.aliases.join(', ')}`
			} else {
				callwords = cmdFile.help.name
			}
			helpEmbed.addField(
				capitalizeFirstLetter(cmdFile.help.name),
				`\n\nCallwords:  ${callwords}\n\nDescription:  ${
					cmdFile.help.description
				}\n\nHas Access:  ${
					cmdFile.help.hasAccess
				}\n\nUsage:  ${cmdFile.help.usage.replace('.', bot.prefix)}\n\n`
			)
			message.channel.send(helpEmbed)
		}
	}
}

module.exports.help = {
	name: 'help',
	aliases: ['h', 'halp'],
	description: 'Tells you everything about a command or all commands',
	hasAccess: 'Everyone',
	usage: '.help <command> or .help'
}
