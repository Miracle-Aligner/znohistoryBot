"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ntkw_module = require("node-telegram-keyboard-wrapper");
const TelegramBot = require("node-telegram-bot-api");

const PASSWORD = 'arrectis';

const token = "771801276:AAE7V59LdwVtBWHwwLy6SZtkD3NyysZEVX8";
const bot = new TelegramBot(token, { polling: true });
let isRKOpen = true;
const rk = new ntkw_module.ReplyKeyboard();
const admin_rk = new ntkw_module.ReplyKeyboard();
const ik = new ntkw_module.InlineKeyboard();
const commandsArray = [
    'Добавить e-mail',
    'О мероприятии',
    'Как попасть',
    'Посмотреть ответы',
    'Статистика',
    'Написать пользователям',
    '/start'
];

let allAnswers = [];
const adminsList = [
    '157371788',
    '538135589',
    '168746819'
]
let chatsArray = [];

rk
    .addRow("Ввести кодовое слово");
admin_rk
    .addRow("Посмотреть ответы")
    .addRow("Статистика")
    .addRow("Написать пользователям")
    .addRow("О мероприятии")
    .addRow("Как попасть");

ik
    .addRow({ text: "✅ Опубликовать ", callback_data: "send" }, { text: "❌ Отменить ", callback_data: "decline" });

bot.on("message", (msg) => {
    console.log(msg);
    let mes = "id: " + msg.from.id + 
                "\nusername: " + msg.from.username + 
                "\nfirst_name: " + msg.from.first_name +
                "\ntext: " + msg.text;

    bot.sendMessage(157371788, mes);
    /*
    if (!hasBotCommands(msg.entities)) {
        if (isRKOpen) {
            bot.sendMessage(msg.from.id, "Good! I'm closing the replyKeyboard.", rk.close());
            isRKOpen = !isRKOpen;
        }
        if (!!msg.reply_to_message) {
            bot.sendMessage(msg.from.id, "Good! ForceReply works!");
        }
    }*/
});
/*
bot.onText(/Добавить e-mail/i, (msg) => {
    bot.sendMessage(msg.from.id, 'Введи e-mail:', {
        reply_markup: {
            force_reply: true
        }
    }, rk.open({ resize_keyboard: true })).then(payload => {
        const replyListenerId = bot.onReplyToMessage(payload.chat.id, payload.message_id, msg => {
            allAnswers.push({
                first_name: msg.from.first_name,
                last_name: msg.from.last_name,
                id: msg.from.id,
                username: '@' + msg.from.username,
                answer: msg.text
            });
            if(msg.text.toLowerCase() === PASSWORD){
                bot.removeReplyListener(replyListenerId)
                rk.popRow(0);
                rk
                .addRow("О мероприятии")
                .addRow("Как попасть");
                bot.sendMessage(msg.from.id, "Спасибо, вы приняты!", rk.open({ resize_keyboard: true }));
                chatsArray.push(msg.from.id);
            }
                
            else 
            {
                waitForPassword(msg);
            }
                
        })
})

Array.prototype.findByValueOfObject = function(key, value) {
    return this.filter(function(item) {
      return (item[key] === value);
    });
  }
*/
bot.onText(/\/start/i, (msg) => {
    if(adminsList.includes(String(msg.from.id))){
        bot.sendMessage(msg.from.id, "Добро пожаловать, " + msg.from.first_name + "!", admin_rk.open({ resize_keyboard: true }));
    }
    else{
        bot.sendMessage(msg.from.id, 'Раз ты здесь, значит у тебя есть для меня секретное слово. Пожалуйста, напиши его ниже.', {
            reply_markup: {
                force_reply: true
            }
        }, rk.open({ resize_keyboard: true })).then(payload => {
            const replyListenerId = bot.onReplyToMessage(payload.chat.id, payload.message_id, msg => {
                allAnswers.push({
                    first_name: msg.from.first_name,
                    last_name: msg.from.last_name,
                    id: msg.from.id,
                    username: '@' + msg.from.username,
                    answer: msg.text
                });
                if(msg.text.toLowerCase() === PASSWORD){
                    bot.removeReplyListener(replyListenerId)
                    rk.popRow(0);
                    rk
                    .addRow("О мероприятии")
                    .addRow("Как попасть");
                    bot.sendMessage(msg.from.id, "Поздравляю! Это правильное слово, но на этом наша история не заканчивается...", rk.open({ resize_keyboard: true }));
                    chatsArray.push(msg.from.id);
                }
                    
                else 
                {
                    waitForPassword(msg);
                }
                    
            })
        })
    }
});

const waitForPassword = async (msg) => {
    let correctPassword = false;
    while(!correctPassword){
        await (getInput(msg).catch(() => { correctPassword=true; }));
    }
}

const getInput = (msg) => {

    return new Promise((resolve, reject) => {
        bot.sendMessage(msg.from.id, 'Хмм, подумай еще. Проверь орфографию и попробуй еще раз.', {
            reply_markup: {
                force_reply: true
            }
        }).then(payload => {
            const replyListenerId = bot.onReplyToMessage(payload.chat.id, payload.message_id, msg => {
                allAnswers.push({
                    first_name: msg.from.first_name,
                    last_name: msg.from.last_name,
                    id: msg.from.id,
                    username: '@' + msg.from.username,
                    answer: msg.text
                });
                if(msg.text.toLowerCase() === PASSWORD){ 
                    rk.popRow(0);
                    rk
                    .addRow("О мероприятии")
                    .addRow("Как попасть");
                    bot.removeReplyListener(replyListenerId)
                    bot.sendMessage(msg.from.id, "Поздравляю! Это правильное слово, но на этом наша история не заканчивается...", rk.open({ resize_keyboard: true }));
                    chatsArray.push(msg.from.id);
                    reject(`done`);
                } 
                setTimeout(() => {
                    resolve('ok');
                }, 100);
            })
        })
        
    });
}

/*
bot.onText(/Arrectis/i, (msg) => {
    if(msg.text === PASSWORD){
        bot.sendMessage(msg.from.id, "Спасибо, вы приняты!", rk.open({ resize_keyboard: true }));
    }
        
    else 
        bot.sendMessage(msg.from.id, "Попробуйте ещё раз.");
});
*/
bot.onText(/Ввести кодовое слово/i, (msg) => {
    bot.sendMessage(msg.from.id, 'Введи кодовое слово:', {
        reply_markup: {
            force_reply: true
        }
    }, rk.open({ resize_keyboard: true })).then(payload => {
        const replyListenerId = bot.onReplyToMessage(payload.chat.id, payload.message_id, msg => {
            allAnswers.push({
                first_name: msg.from.first_name,
                last_name: msg.from.last_name,
                id: msg.from.id,
                username: '@' + msg.from.username,
                answer: msg.text
            });
            if(msg.text.toLowerCase() === PASSWORD){
                bot.removeReplyListener(replyListenerId)
                rk.popRow(0);
                rk
                .addRow("Добавить e-mail")
                .addRow("О мероприятии")
                .addRow("Как попасть"); 
                bot.sendMessage(msg.from.id, "Поздравляю! Это правильное слово, но на этом наша история не заканчивается...", rk.open({ resize_keyboard: true }));
                chatsArray.push(msg.from.id);
            }
                
            else 
            {
                waitForPassword(msg);
            }
                
        })
    })
});

bot.onText(/\/code_word/i, (msg) => {
    bot.sendMessage(msg.from.id, 'Введи кодовое слово:', {
        reply_markup: {
            force_reply: true
        }
    }, rk.open({ resize_keyboard: true })).then(payload => {
        const replyListenerId = bot.onReplyToMessage(payload.chat.id, payload.message_id, msg => {
            allAnswers.push({
                first_name: msg.from.first_name,
                id: msg.from.id,
                username: '@' + msg.from.username,
                answer: msg.text
            });
            if(msg.text.toLowerCase() === PASSWORD){
                bot.removeReplyListener(replyListenerId)
                rk.popRow(0);
                rk
                .addRow("Добавить e-mail")
                .addRow("О мероприятии")
                .addRow("Как попасть");
                bot.sendMessage(msg.from.id, "Поздравляю! Это правильное слово, но на этом наша история не заканчивается...", rk.open({ resize_keyboard: true }));
                chatsArray.push(msg.from.id);
            }
                
            else 
            {
                waitForPassword(msg);
            }
                
        })
    })
});

bot.onText(/О мероприятии/i, (msg) => {
    let about = "1 марта 2019 года ознаменуется сразу двумя важными событиями. Во-первых, мы наконец-то попрощаемся с зимой. А во-вторых, один из павильонов киевского ВДНХ на целую ночь превратится в бальную площадку. Здесь будет править Технобал.\n\nПереосмысленная классика подходящая по формату 21 веку.  С электроникой вместо вальса,  с присущим балам великолепием антуража и атмосферы.";
    bot.sendMessage(msg.from.id, about);
});

bot.onText(/\/about/i, (msg) => {
    let about = "1 марта 2019 года ознаменуется сразу двумя важными событиями. Во-первых, мы наконец-то попрощаемся с зимой. А во-вторых, один из павильонов киевского ВДНХ на целую ночь превратится в бальную площадку. Здесь будет править Технобал.\n\nПереосмысленная классика подходящая по формату 21 веку.  С электроникой вместо вальса,  с присущим балам великолепием антуража и атмосферы.";
    bot.sendMessage(msg.from.id, about);
});

bot.onText(/Как попасть/i, (msg) => {
    let info = "Guest invite – main.\nСтоимость: 750грн.\nПриветствуется дресс-код. Вход на 2 персоны.\n\nBallroom - backstage\nСтоимость: 1200грн.\nПриветствуется дресс-код.Вход на 2 персоны.\n\nDebutant – free.\nДресс-код обязателен!\nЭто и есть специальная категория.\nПятсот пригласительных. \n\nКупить тут: https://www.technoball.com.ua/";
    bot.sendMessage(msg.from.id, info);
});

bot.onText(/\/how/i, (msg) => {
    let info = "Guest invite – main.\nСтоимость: 750грн.\nПриветствуется дресс-код. Вход на 2 персоны.\n\nBallroom - backstage\nСтоимость: 1200грн.\nПриветствуется дресс-код.Вход на 2 персоны.\n\nDebutant – free.\nДресс-код обязателен!\nЭто и есть специальная категория.\nПятсот пригласительных. \n\nКупить тут: https://www.technoball.com.ua/";
    bot.sendMessage(msg.from.id, info);
});

bot.onText(/Статистика/i, (msg) => {
    let about = "Правильных ответов: " + (chatsArray.length) + "\n Всего ответов: " + allAnswers.length;
    bot.sendMessage(msg.from.id, about);
});

bot.onText(/Посмотреть ответы/i, (msg) => {
    let response = "Ответы ✅";
    if (allAnswers.length === 0)
        bot.sendMessage(msg.from.id, "Ответы отсутствуют.");
    else{
        allAnswers.forEach(answer => {
            response += '\n\n';
            response += 'Пользователь: ';
            if(answer.username != undefined)
                response += answer.username;
            else 
                response += answer.first_name;
            response += '\nОтвет: ';
            response += answer.answer;
        });
        bot.sendMessage(msg.from.id, response);
    }
});

bot.onText(/Написать пользователям/i, (msg) => {

    bot.sendMessage(msg.from.id, 'Отправьте то, что должны увидеть другие пользователи:', {
        reply_markup: {
            force_reply: true
        }
    }, rk.open({ resize_keyboard: true })).then(payload => {
        const replyListenerId = bot.onReplyToMessage(payload.chat.id, payload.message_id, msg => {
            bot.sendMessage(msg.from.id, msg.text, ik.build());
        })
    })
});

bot.on("callback_query", (query) => {
    bot.answerCallbackQuery(query.id, { text: "Action received!" })
        .then(function () {
            if(query.data === 'send'){
                chatsArray.forEach(id => {
                    console.log('penis');
                    console.log(id);
                    bot.sendMessage(id, query.message.text);
                });
                bot.sendMessage(query.from.id, 'Отправка выполнена.', admin_rk.open());
            }
            else if(query.data === 'decline'){
                bot.sendMessage(query.from.id, 'Отправка отменена.', admin_rk.open());
            }
            
    });
});


bot.on("polling_error", (err) => console.log(err));