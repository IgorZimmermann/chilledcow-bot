const discord = require('discord.js')

const colors = require('../config/colors.json')

module.exports.run = async (bot, message, args) => {
  let voiceChannel = message.member.voice.channel
  if (!voiceChannel) return message.reply('Please join a voice channel first')
  voiceChannel.join()
  let joinEmbed = new discord.MessageEmbed()
    .setAuthor(bot.user.username)
    .setColor(colors.green)
    .setTitle('Joined Channel')
    .setThumbnail('https://raw.githubusercontent.com/IgorZimmermann/chilledcow-bot/master/logo.jpg')
    .addField('Channel', voiceChannel.name);
  message.channel.send(joinEmbed)
}

module.exports.help = {
  name: 'join',
  aliases: ['j', 'come'],
  description: 'Joins the voice channel of the author',
  hasAccess: 'Everyone',
  usage: '.join'
}