const TelegramBot = require('node-telegram-bot-api');

const TOKEN = process.env.HEROKU_APP_TOKEN || '525352673:AAH6g3UmtJVhOGTbgCShoU_WdRVrRXbJM7Q';

const HEROKU_APP_NAME = process.env.HEROKU_APP_NAME;

const options = HEROKU_APP_NAME ? { webHook: { port: process.env.PORT || 8443 } } : { polling: true };

const bot = new TelegramBot(TOKEN, options);

if (HEROKU_APP_NAME) {
  const URL = `https://${HEROKU_APP_NAME}.herokuapp.com:443`;
  bot.setWebHook(`${URL}/bot${TOKEN}`);
}

module.exports = bot;
