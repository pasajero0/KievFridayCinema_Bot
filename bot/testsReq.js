const bot = require('./bot');

const { getFilmList } = require('./selectors');

const getFilmDate = () => {
  const date = new Date();
  const day = date.toLocaleString('en', { day: '2-digit' });
  const month = date.toLocaleString('en', { month: '2-digit' });
  const year = date.toLocaleString('en', { year: 'numeric' });
  return [day, month, year];
}

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
