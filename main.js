const discord = require('discord.js')
const bot = new discord.Client()

const config = require('./config/config.json')
const secrets = require('./config/secrets.json')

bot.on('ready', () => {
  console.log('Bot is ready...')
})

bot.login(secrets.token)