const bot = require('./bot');
const { getFilmList, afterEleven } = require('./selectors');
const moment = require('moment');
const currentDate = moment().utcOffset("+03:00");

const getThisOrNextFriday = () => {
  let thisFriday = moment().utcOffset("+03:00").day(5);
  return currentDate.isSameOrBefore(thisFriday) ? thisFriday : moment().day(12);
};

const getFormatedFilms = (films) => {
  const strArray = films.map((val)=>{
    return `\n\n[${val.title}](${val.link})\n${val.time.join(' | ')}`;
  })
  return strArray.join('')
}

bot.onText(/\/today/, async (msg, match) => {
  const chatId = msg.chat.id;
  const firstText = `Здравствуйте, дамы и господа!\nСегодня *${currentDate.format('DD.MM.YYYY')}*.\nСпустя миг мы получим список фильмов, которые находятся в прокате.\nОжидайте... `;
  bot.sendMessage(chatId, firstText, { parse_mode: 'Markdown' });

  const res = await getFilmList(currentDate);

  if (((res || {}).content || []).length) {
    str = `В прокате кинотеатра Multiplex представлены следующие фильмы:${getFormatedFilms(res.content)}`;
  } else {
    str = `В данный момент список фильмов не доступен😕`;
  }
  bot.sendMessage(chatId, str, { parse_mode: 'Markdown' });
})

bot.onText(/\/friday/, async (msg, match) => {
  const chatId = msg.chat.id;
  const fridayDate = getThisOrNextFriday();
  const firstText = `Здравствуйте, дамы и господа!\nПятница *${fridayDate.format('DD.MM.YYYY')}*.\nСпустя миг мы получим список фильмов, которые находятся в прокате.\nОжидайте... `;
  bot.sendMessage(chatId, firstText, { parse_mode: 'Markdown' });

  const res = await getFilmList(fridayDate);
  const src = '';
  if (((res || {}).content || []).length) {
    str = `В прокате кинотеатра Multiplex, в пятницу, представлены следующие фильмы:${getFormatedFilms(afterEleven(res.content))}`;
  } else {
    str = `В данный момент список фильмов не доступен😕`;
  }
  bot.sendMessage(chatId, str, { parse_mode: 'Markdown' });
});

console.log('>>>>>>>>>>Bot started<<<<<<<<<<')
