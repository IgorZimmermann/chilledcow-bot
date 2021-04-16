const discord = require('discord.js')
const ytdl = require('ytdl-core')

const colors = require('../config/colors.json')
const config = require('../config/config.json')

module.exports.run = async (bot, message, args) => {
  let voiceChannel = message.member.voice.channel
  if (!voiceChannel) return message.reply('Please join a voice channel first')
  voiceChannel.join()
    .then(async connection => {
      let videoInfo = await ytdl.getInfo(config.stream)
      let joinEmbed = new discord.MessageEmbed()
        .setAuthor(bot.user.username)
        .setColor(colors.green)
        .setTitle('Joined Channel')
        .setThumbnail(videoInfo.videoDetails.thumbnails[2].url)
        .addField('Channel', voiceChannel.name)
        .addField('Streaming', videoInfo.videoDetails.title)
        .setFooter('From '+videoInfo.videoDetails.author.name, videoInfo.videoDetails.author.thumbnails[2].url);
      message.channel.send(joinEmbed)

      return connection.play(ytdl(config.stream, {type: 'opus'}))
    }).then(dispatcher => {
      dispatcher.on('error', console.error)
    })
}

module.exports.help = {
  name: 'join',
  aliases: ['j', 'come'],
  description: 'Joins the voice channel of the author',
  hasAccess: 'Everyone',
  usage: '.join'
}