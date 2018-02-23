const TelegramBot = require('node-telegram-bot-api');
const getFilmData = require('../parser');

const token = '525352673:AAH6g3UmtJVhOGTbgCShoU_WdRVrRXbJM7Q';

const getFilmDate = () => {
  const date = new Date();
  const day = date.toLocaleString('en', { day: '2-digit' });
  const month = date.toLocaleString('en', { month: '2-digit' });
  const year = date.toLocaleString('en', { year: 'numeric' });
  return [day, month, year].join('.');
}

const getFormatedFilms = (films) => {
  const strArray = films.map((val)=>{
    return `\n\n[${val.title}](${val.link})\n${val.time.join(' | ')}`;
  })
  return strArray.join('')
}

const InitBot = () => {
  const bot = new TelegramBot(token, { polling: true });


  bot.onText(/\/gettodayfilm/, async (msg, match) => {
    const chatId = msg.chat.id;
    const firstText = `Здравствуйте, дамы и господа!\nСегодня *${getFilmDate()}*.\nЧерез пару секунд вы получите список фильмов, которые находятся в прокате.\nОжидайте... `;
    bot.sendMessage(chatId, firstText, { parse_mode: 'Markdown' });

    const res = await getFilmData()
    const str = `В прокате кинотеатра Multiplex присутствуют следующие фильмы:${getFormatedFilms(res.content)} `
    bot.sendMessage(chatId, str, { parse_mode: 'Markdown' });
  })


  bot.onText(/\/experementalgettodayfilm/, async (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Получаем список фильмов. Ожидайте...');

    const res = await getFilmData()
    const str = `
    Сегодня ${getFilmDate(res.date)}
    \nВ прокате кинотеатра Multiplex присутствуют следующие фильмы:
    `
    // ${getFormatedFilms(res.content)}
    bot.sendMessage(chatId, str, { parse_mode: 'Markdown' });
    res.content.map((val) => {
      const str = `
      \n[${val.title}](${val.link})
      \n${val.time.join(' | ')}
      `;
      bot.sendMessage(chatId, str, {
        parse_mode: 'Markdown',
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{ text: 'Голосовать', callback_data: val.title }],
          ]
        })
      });
    });

  })


  bot.on('callback_query', (msg) => {
    const chatId = msg.message.chat.id;
    bot.sendMessage(chatId, msg.data);
  });


  bot.onText(/\/getfilmsbyfriday/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Скоро мы сможем предоставить вам информацию по сеансам за следующую пятницу.');
  });

  console.log('>>>>>>>>>>Bot started<<<<<<<<<<')
};

module.exports = InitBot;
