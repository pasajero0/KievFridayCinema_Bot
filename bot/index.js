const TelegramBot = require('node-telegram-bot-api');

const token = '525352673:AAH6g3UmtJVhOGTbgCShoU_WdRVrRXbJM7Q';

const Bot = new TelegramBot(token, { polling: true });

Bot.onText(/\/echo (.+)/, (msg, match) => {
  // console.log('msg =>', msg);
  // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  // console.log('match =>', match);
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  Bot.getUserProfilePhotos(chatId).then((res) => {
    console.log('############', res.photos)
    Bot.sendPhoto(chatId, res.photos[0][2].file_id)
  });

  // send back the matched "whatever" to the chat
  Bot.sendMessage(chatId, resp);
});

Bot.onText(/\/key2/, (msg) => {
  const chatId = msg.chat.id;
  Bot.sendMessage(chatId, 'Keys test', {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'Кнопка 1', callback_data: '1' }],
        [{ text: 'Кнопка 2', callback_data: 'data 2' }],
        [{ text: 'Кнопка 3', callback_data: 'text 3' }]
      ]
    })
  });
});

Bot.onText(/\/key1/, (msg) => {
  const chatId = msg.chat.id;
  Bot.sendMessage(chatId, 'Activate the keyboard', {
    reply_markup: JSON.stringify({
      keyboard: [
        ['7', '8', '9'],
        [{
          text: 'test btn',
          callback_data: '/key2'
        }],
      ],
      resize_keyboard: true,
    })
  });
});

// $keyboard = [
//     ['7', '8', '9'],
//     ['4', '5', '6'],
//     ['1', '2', '3'],
//          ['0']
// ];

// $reply_markup = $telegram->replyKeyboardMarkup([
//     'keyboard' => $keyboard, 
//     'resize_keyboard' => true, 
//     'one_time_keyboard' => true
// ]);

// $response = $telegram->sendMessage([
//     'chat_id' => 'CHAT_ID', 
//     'text' => 'Hello World', 
//     'reply_markup' => $reply_markup
// ]);

Bot.on('callback_query', (msg) => {
  const chatId = msg.message.chat.id;
  console.log('callback_query', msg);
  Bot.sendMessage(chatId, msg.data);
})
