const TelegramBot = require('node-telegram-bot-api');
const getFilmData = require('./parser');

const token = '525352673:AAH6g3UmtJVhOGTbgCShoU_WdRVrRXbJM7Q';

const getFormatedFilms = (films) => {
  const strArray = films.map((val)=>{
    return `
    =====> ${val.title}
    ${val.link}
    ${val.time.join('\n\t')}
    `;
  })
  return strArray.join('\n')
}

const Bot = new TelegramBot(token, { polling: true });

Bot.onText(/\/gettodayfilm/, (msg, match) => {
  const chatId = msg.chat.id;
  Bot.sendMessage(chatId, 'Скоро мы сможем предоставить \n вам информацию по сеансам за сегодняшний день.');

  getFilmData().then((res) => {
    // Сегодня ${JSON.stringify(res.data)} \n
    const str = `
    В прокате кинотеатра Multiplex присутствуют следующие фильмы:
    ${getFormatedFilms(res.content)}
    `
    Bot.sendMessage(chatId, str);
  });
})

Bot.onText(/\/getfilmsbyfriday/, (msg, match) => {
  const chatId = msg.chat.id;
  Bot.sendMessage(chatId, 'Скоро мы сможем предоставить вам информацию по сеансам за следующую пятницу.');
})
