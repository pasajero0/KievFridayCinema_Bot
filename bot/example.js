const TelegramBot = require('node-telegram-bot-api');

const token = '525352673:AAH6g3UmtJVhOGTbgCShoU_WdRVrRXbJM7Q';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/gettodayfilm/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Скоро мы сможем предоставить вам информацию по сеансам за сегодняшний день.');
})

// // Bot.onText(/\/getfilmsbyfriday/, (msg, match) => {
// //   const chatId = msg.chat.id;
// //   Bot.sendMessage(chatId, 'Скоро мы сможем предоставить вам информацию по сеансам за следующую пятницу.');
// // })

// // Bot.onText(/\/getFilmsByFriday/, (msg, match) => {
// //   const chatId = msg.chat.id;
// //   Bot.sendMessage(chatId, 'Скоро мы сможем предоставить вам информацию по сеансам за следующую пятницу.');
// // })


// Bot.onText(/\/echo (.+)/, (msg, match) => {
//   console.log('msg =>', msg);
//   console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
//   console.log('match =>', match);
//   // 'msg' is the received Message from Telegram
//   // 'match' is the result of executing the regexp above on the text content
//   // of the message

//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"
//   Bot.getUserProfilePhotos(chatId).then((res) => {
//     console.log('############', res.photos)
//     Bot.sendPhoto(chatId, res.photos[0][2].file_id)
//   });

//   // send back the matched "whatever" to the chat
//   Bot.sendMessage(chatId, resp);
// });

// Bot.onText(/\/key2/, (msg) => {
//   const chatId = msg.chat.id;
//   Bot.sendMessage(chatId, 'Keys test', {
//     reply_markup: JSON.stringify({
//       inline_keyboard: [
//         [{ text: 'Кнопка 1', callback_data: '1' }],
//         [{ text: 'Кнопка 2', callback_data: 'data 2' }],
//         [{ text: 'Кнопка 3', callback_data: 'text 3' }]
//       ]
//     })
//   });
// });

// Bot.onText(/\/key1/, (msg) => {
//   const chatId = msg.chat.id;
//   Bot.sendMessage(chatId, 'Activate the keyboard', {
//     reply_markup: JSON.stringify({
//       keyboard: [
//         ['7', '8', '9'],
//         [{
//           text: 'test btn',
//           callback_data: '/key2'
//         }],
//       ],
//       resize_keyboard: true,
//     })
//   });
// });

// Bot.on('callback_query', (msg) => {
//   const chatId = msg.message.chat.id;
//   console.log('callback_query', msg);
//   Bot.sendMessage(chatId, msg.data);
// })

// const TelegramBot = require('node-telegram-bot-api');

// // replace the value below with the Telegram token you receive from @BotFather
// const token = '525352673:AAH6g3UmtJVhOGTbgCShoU_WdRVrRXbJM7Q';

// // Create a bot that uses 'polling' to fetch new updates
// const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});
