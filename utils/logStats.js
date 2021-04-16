module.exports = bot => {
  console.log(`\nSTATS\nChannels: ${bot.channels.cache.size}\nServers: ${bot.guilds.cache.size}`)
}