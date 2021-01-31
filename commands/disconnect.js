const discord = require('discord.js')

const colors = require('../config/colors.json')

module.exports.run = async (bot, message, args) => {
  let voiceChannel = message.guild.me.voice.channel
  if (!voiceChannel) return message.reply('I\'m not in a voice channel')
  if (voiceChannel !== message.member.voice.channel) return message.reply('We\'re not in the same voice channel')
  voiceChannel.leave()
  let leaveEmbed = new discord.MessageEmbed()
    .setAuthor(bot.user.username)
    .setColor(colors.red)
    .setTitle('Left Channel')
    .addField('Channel', voiceChannel.name);
  message.channel.send(leaveEmbed)
}

module.exports.help = {
  name: 'disconnect',
  aliases: ['dis', 'exit', 'quit', 'leave'],
  description: 'Disconnects from the voice channel',
  hasAccess: 'Everyone',
  usage: '.disconnect'
}