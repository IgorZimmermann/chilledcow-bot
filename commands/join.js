const discord = require('discord.js')
const axios = require('axios').default

const colors = require('../config/colors.json')
const config = require('../config/config.json')

module.exports.run = async (bot, message, args) => {
  let voiceChannel = message.member.voice.channel
  if (!voiceChannel) return message.reply('Please join a voice channel first')
  voiceChannel.join()
  let videoInfo = await axios.get(`https://www.youtube.com/oembed?url=${config.stream}&format=json`)
  let joinEmbed = new discord.MessageEmbed()
    .setAuthor(bot.user.username)
    .setColor(colors.green)
    .setTitle('Joined Channel')
    .setThumbnail(videoInfo.data.thumbnail_url)
    .setURL(config.stream)
    .addField('Channel', voiceChannel.name)
    .addField('Streaming', videoInfo.data.title);
  message.channel.send(joinEmbed)
}

module.exports.help = {
  name: 'join',
  aliases: ['j', 'come'],
  description: 'Joins the voice channel of the author',
  hasAccess: 'Everyone',
  usage: '.join'
}