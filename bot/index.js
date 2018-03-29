const TelegramBot = require('node-telegram-bot-api');
const { _getFilmList } = require('./selectors');
const moment = require('moment');

const token = '525352673:AAH6g3UmtJVhOGTbgCShoU_WdRVrRXbJM7Q';

const getFilmDate = () => {
  const date = new Date();
  const day = date.toLocaleString('en', { day: '2-digit' });
  const month = date.toLocaleString('en', { month: '2-digit' });
  const year = date.toLocaleString('en', { year: 'numeric' });
  return [day, month, year];
}

/////////////////////////////////////////////////////////////////////////////////
const currentDate = moment();

const getThisOrNextFriday = () => {
  let thisFriday = moment().day(5);
  return currentDate.isSameOrBefore(thisFriday) ? thisFriday : moment().day(12);
};
/////////////////////////////////////////////////////////////////////////////////

const getFormatedFilms = (films) => {
  const strArray = films.map((val)=>{
    return `\n\n[${val.title}](${val.link})\n${val.time.join(' | ')}`;
  })
  return strArray.join('')
}

const InitBot = () => {
  const bot = new TelegramBot(token, { polling: true });
  const getFilmList = _getFilmList();

  bot.onText(/\/today/, async (msg, match) => {
    const chatId = msg.chat.id;
    const firstText = `Здравствуйте, дамы и господа!\nСегодня *${getDate.format('DD.MM.YYYY')}*.\nСпустя миг мы получим список фильмов находящихся в прокате.\nОжидайте... `;
    bot.sendMessage(chatId, firstText, { parse_mode: 'Markdown' });

    const res = await getFilmList(getDate.format('DDMMYYYY'))
    const str = `В прокате кинотеатра Multiplex представлены следующие фильмы:${getFormatedFilms(res.content)} `
    bot.sendMessage(chatId, str, { parse_mode: 'Markdown' });
  })


  bot.onText(/\/experementalgettodayfilm/, async (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Получаем список фильмов. Ожидайте...');

    const res = await getFilmList(getFilmDate().join(''))
    const str = `
    Сегодня ${getFilmDate(res.date).join('.')}
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


  bot.onText(/\/friday/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Скоро мы сможем предоставить вам информацию по сеансам за следующую пятницу.');
  });

  console.log('>>>>>>>>>> bot is activated <<<<<<<<<<')
};

module.exports = InitBot;
