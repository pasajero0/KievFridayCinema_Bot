const bot = require('./bot');
const { getFilmList } = require('./selectors');

const getFilmDate = () => {
  const date = new Date();
  const day = date.toLocaleString('en', { day: '2-digit' });
  const month = date.toLocaleString('en', { month: '2-digit' });
  const year = date.toLocaleString('en', { year: 'numeric' });
  return [day, month, year];
}

const getFormatedFilms = (films) => {
  const strArray = films.map((val)=>{
    return `\n\n[${val.title}](${val.link})\n${val.time.join(' | ')}`;
  })
  return strArray.join('')
}

bot.onText(/\/gettodayfilm/, async (msg, match) => {
  const chatId = msg.chat.id;
  const firstText = `Здравствуйте, дамы и господа!\nСегодня *${getFilmDate().join('.')}*.\nЧерез пару секунд вы получите список фильмов, которые находятся в прокате.\nОжидайте... `;
  bot.sendMessage(chatId, firstText, { parse_mode: 'Markdown' });

  const res = await getFilmList(getFilmDate().join(''))
  const str = `В прокате кинотеатра Multiplex присутствуют следующие фильмы:${getFormatedFilms(res.content)} `
  bot.sendMessage(chatId, str, { parse_mode: 'Markdown' });
})

bot.onText(/\/getfilmsbyfriday/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Скоро мы сможем предоставить вам информацию по сеансам за следующую пятницу.111');
});

if (process.env.NODE_ENV !== 'production') require('./testsReq');

console.log('>>>>>>>>>>Bot started<<<<<<<<<<')
