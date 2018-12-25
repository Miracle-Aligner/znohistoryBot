"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ntkw_module = require("node-telegram-keyboard-wrapper");
const TelegramBot = require("node-telegram-bot-api");
const Users = require("./db_users.js");

const PASSWORD = 'arrectis';

const token = "771801276:AAE7V59LdwVtBWHwwLy6SZtkD3NyysZEVX8";
const bot = new TelegramBot(token, { polling: true });
let isRKOpen = true;
let rk = new ntkw_module.ReplyKeyboard();
let admin_rk = new ntkw_module.ReplyKeyboard();
const ik = new ntkw_module.InlineKeyboard();
const commandsArray = [
    'Добавить e-mail',
    'ABOUT',
    'ENTRANCE',
    'DRESSCODE',
    'LINEUP',
    'Посмотреть ответы',
    'Статистика',
    'Написать пользователям',
    '/start'
];

const adminsList = [
    '157371788',
    '538135589',
    '168746819'
];

rk
    .addRow("Ввести кодовое слово");
admin_rk
    .addRow("Посмотреть ответы")
    .addRow("Статистика")
    .addRow("Написать пользователям")
    .addRow("ABOUT")
    .addRow("DRESSCODE")
    .addRow("LINEUP")
    .addRow("ENTRANCE");

ik
    .addRow({ text: "✅ Опубликовать ", callback_data: "send" }, { text: "❌ Отменить ", callback_data: "decline" });

bot.on("message", (msg) => {
    console.log(msg);
    let mes = "id: " + msg.from.id;
    if (msg.from.username == undefined)
        mes += "\nusername: -";
    else{
        mes += "\nusername: @" + msg.from.username;
    }
    if (msg.from.first_name == undefined)
        mes += "\nfirst_name: -";
    else{
        mes += "\nfirst_name: " + msg.from.first_name;
    }
    if (msg.from.last_name == undefined)
        mes += "\nlast_name: -";
    else{
        mes += "\nlast_name: " + msg.from.last_name;
    }
    mes += "\ntext: " + msg.text;

    console.log(msg);

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
                rk = new ntkw_module.ReplyKeyboard();
                rk
                .addRow("ABOUT")
                .addRow("ENTRANCE");
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
                Users.add({
                    chat_id: msg.from.id,
                    first_name: msg.from.first_name,
                    username: msg.from.username,
                    last_name: msg.from.last_name,
                    isAdmin: adminsList.includes(String(msg.from.id)),
                    mail: null,
                    answer: msg.text
                });
                if(msg.text.toLowerCase() === PASSWORD){
                    bot.removeReplyListener(replyListenerId)
                    rk = new ntkw_module.ReplyKeyboard();
                    rk
                    .addRow("ABOUT")
                    .addRow("DRESSCODE")
                    .addRow("LINEUP")
                    .addRow("ENTRANCE");
                    bot.sendMessage(msg.from.id, "Поздравляю! Это правильное слово, но на этом наша история не заканчивается...", rk.open({ resize_keyboard: true }));
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
                Users.add({
                    chat_id: msg.from.id,
                    first_name: msg.from.first_name,
                    username: msg.from.username,
                    last_name: msg.from.last_name,
                    isAdmin: adminsList.includes(String(msg.from.id)),
                    mail: null,
                    answer: msg.text
                });
                if(msg.text.toLowerCase() === PASSWORD){ 
                    rk = new ntkw_module.ReplyKeyboard();
                    rk
                    //.addRow("Добавить e-mail")
                    .addRow("ABOUT")
                    .addRow("DRESSCODE")
                    .addRow("LINEUP")
                    .addRow("ENTRANCE");
                    bot.removeReplyListener(replyListenerId)
                    bot.sendMessage(msg.from.id, "Поздравляю! Это правильное слово, но на этом наша история не заканчивается...", rk.open({ resize_keyboard: true }));
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
            Users.add({
                chat_id: msg.from.id,
                first_name: msg.from.first_name,
                username: msg.from.username,
                last_name: msg.from.last_name,
                isAdmin: adminsList.includes(String(msg.from.id)),
                mail: null,
                answer: msg.text
            });
            if(msg.text.toLowerCase() === PASSWORD){
                bot.removeReplyListener(replyListenerId)
                rk = new ntkw_module.ReplyKeyboard();
                rk
                // .addRow("Добавить e-mail")
                .addRow("ABOUT")
                .addRow("DRESSCODE")
                .addRow("LINEUP")
                .addRow("ENTRANCE"); 
                bot.sendMessage(msg.from.id, "Поздравляю! Это правильное слово, но на этом наша история не заканчивается...", rk.open({ resize_keyboard: true }));
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
            Users.add({
                chat_id: msg.from.id,
                first_name: msg.from.first_name,
                username: msg.from.username,
                last_name: msg.from.last_name,
                isAdmin: adminsList.includes(String(msg.from.id)),
                mail: null,
                answer: msg.text
            });
            if(msg.text.toLowerCase() === PASSWORD){
                bot.removeReplyListener(replyListenerId)
                rk = new ntkw_module.ReplyKeyboard();
                rk
                .addRow("ABOUT")
                .addRow("DRESSCODE")
                .addRow("LINEUP")
                .addRow("ENTRANCE");
                bot.sendMessage(msg.from.id, "Поздравляю! Это правильное слово, но на этом наша история не заканчивается...", rk.open({ resize_keyboard: true }));
            }
                
            else 
            {
                waitForPassword(msg);
            }
                
        })
    })
});

bot.onText(/ABOUT/i, (msg) => {
    rk = new ntkw_module.ReplyKeyboard();
        rk
        .addRow("ABOUT")
        .addRow("DRESSCODE")
        .addRow("LINEUP")
        .addRow("ENTRANCE");
    let about = "1 марта 2019 года ознаменуется сразу двумя важными событиями. Во-первых, мы наконец-то попрощаемся с зимой. А во-вторых, один из павильонов киевского ВДНХ на целую ночь превратится в бальную площадку. Здесь будет править Технобал.\n\nПереосмысленная классика подходящая по формату 21 веку.  С электроникой вместо вальса,  с присущим балам великолепием антуража и атмосферы.";
    bot.sendMessage(msg.from.id, about, rk.open({ resize_keyboard: true }));
});

bot.onText(/О мероприятии/i, (msg) => {
    rk = new ntkw_module.ReplyKeyboard();
        rk
        .addRow("ABOUT")
        .addRow("DRESSCODE")
        .addRow("LINEUP")
        .addRow("ENTRANCE");
    let about = "1 марта 2019 года ознаменуется сразу двумя важными событиями. Во-первых, мы наконец-то попрощаемся с зимой. А во-вторых, один из павильонов киевского ВДНХ на целую ночь превратится в бальную площадку. Здесь будет править Технобал.\n\nПереосмысленная классика подходящая по формату 21 веку.  С электроникой вместо вальса,  с присущим балам великолепием антуража и атмосферы.";
    bot.sendMessage(msg.from.id, about, rk.open({ resize_keyboard: true }));
});

bot.onText(/\/about/i, (msg) => {
    rk = new ntkw_module.ReplyKeyboard();
        rk
        .addRow("ABOUT")
        .addRow("DRESSCODE")
        .addRow("LINEUP")
        .addRow("ENTRANCE");
    let about = "1 марта 2019 года ознаменуется сразу двумя важными событиями. Во-первых, мы наконец-то попрощаемся с зимой. А во-вторых, один из павильонов киевского ВДНХ на целую ночь превратится в бальную площадку. Здесь будет править Технобал.\n\nПереосмысленная классика подходящая по формату 21 веку.  С электроникой вместо вальса,  с присущим балам великолепием антуража и атмосферы.";
    bot.sendMessage(msg.from.id, about);
});

bot.onText(/ENTRANCE/i, (msg) => {
    rk = new ntkw_module.ReplyKeyboard();
    rk
    .addRow("ABOUT")
    .addRow("DRESSCODE")
    .addRow("LINEUP")
    .addRow("ENTRANCE");
    let info = "Guest invite – main\n1000 грн. Приветствуется дресс-код. Вход на 2 персоны.\n\nBallroom - backstage\n1600 грн. Приветствуется дресс-код. Вход на 2 персоны.\n\nDebutant – main\nFree. Дресс-код обязателен. Вход на 2 персоны. Всего 500 пригласительных.\n\nhttps://www.technoball.com.ua/entrance";
    bot.sendMessage(msg.from.id, info, rk.open({ resize_keyboard: true }));
});

bot.onText(/Как попасть/i, (msg) => {
    rk = new ntkw_module.ReplyKeyboard();
        rk
        .addRow("ABOUT")
        .addRow("DRESSCODE")
        .addRow("LINEUP")
        .addRow("ENTRANCE");
    let info = "Guest invite – main\n1000 грн. Приветствуется дресс-код. Вход на 2 персоны.\n\nBallroom - backstage\n1600 грн. Приветствуется дресс-код. Вход на 2 персоны.\n\nDebutant – main\nFree. Дресс-код обязателен. Вход на 2 персоны. Всего 500 пригласительных.\n\nhttps://www.technoball.com.ua/entrance";
    bot.sendMessage(msg.from.id, info, rk.open({ resize_keyboard: true }));
});

bot.onText(/LINEUP/i, (msg) => {
    rk = new ntkw_module.ReplyKeyboard();
    rk
    .addRow("ABOUT")
    .addRow("DRESSCODE")
    .addRow("LINEUP")
    .addRow("ENTRANCE");
    let info = "MR.G (LIVE)\nMARCEL DETTMANN\nSMAILOV\nVERA LOGDANIDI\nNA NICH";
    bot.sendMessage(msg.from.id, info, rk.open({ resize_keyboard: true }));
});

bot.onText(/DRESSCODE/i, (msg) => {
    rk = new ntkw_module.ReplyKeyboard();
    rk
    .addRow("ABOUT")
    .addRow("DRESSCODE")
    .addRow("LINEUP")
    .addRow("ENTRANCE");
    let info = "Технобал приветствует дресс код гостей. Каждому необходим бальный наряд, подходящий для рейва. Удобный низ и блистательный верх. Бальные платья, коктейльные платья, фраки и смокинги. Организаторы не ограничивают фантазию, но напоминают, что это все же бал.\n\nДля категории Debutant дресс-код обязателен.";
    bot.sendMessage(msg.from.id, info, rk.open({ resize_keyboard: true }));
});

bot.onText(/\/how/i, (msg) => {
    rk = new ntkw_module.ReplyKeyboard();
    rk
    .addRow("ABOUT")
    .addRow("DRESSCODE")
    .addRow("LINEUP")
    .addRow("ENTRANCE");
    let info = "Guest invite – main\nGuest invite – main\n1000 грн. Приветствуется дресс-код. Вход на 2 персоны.\n\nBallroom - backstage\n1600 грн. Приветствуется дресс-код. Вход на 2 персоны.\n\nDebutant – main\nFree. Дресс-код обязателен. Вход на 2 персоны. Всего 500 пригласительных.\n\nhttps://www.technoball.com.ua/entrance";
    bot.sendMessage(msg.from.id, info);
});

bot.onText(/Статистика/i, (msg) => {
    Users.getAll()
    .then(data => {
        let allUsers = data;
        Users.getAllPassed()
        .then(allPassed => {
            let about = "Правильных ответов: " + allPassed.length + 
                "\n Всего ответов: " + allUsers.length;
            bot.sendMessage(msg.from.id, about);
        });
    });
});

bot.onText(/Посмотреть ответы/i, (msg) => {
    let response = "Ответы ✅";
    Users.getAll().then(db_entities => {
        if (db_entities.length === 0)
            bot.sendMessage(msg.from.id, "Ответы отсутствуют.");
        else{
            db_entities.forEach(answer => {
                response += '\n\n';
                response += 'Пользователь: ';
                if (answer.username == null)
                    response += "\nusername: -";
                else{
                    response += "\nusername: @" + answer.username;
                }
                if (answer.first_name == null)
                    response += "\nfirst_name: -";
                else{
                    response += "\nfirst_name: " + answer.first_name;
                }
                if (answer.last_name == null)
                    response += "\nlast_name: -";
                else{
                    response += "\nlast_name: " + answer.last_name;
                }
                response += '\nОтвет: ';
                response += answer.answer;

                if (3000 - response.length < 200){
                    bot.sendMessage(msg.from.id, response);
                    response = "";
                }
            });
            bot.sendMessage(msg.from.id, response);
        }
    })
    .catch(err => {
        bot.sendMessage(msg.from.id, "Ответы отсутствуют.");
    })
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
            Users.getAllPassed().then(db_entities => {
                let chatsArr = [];
                db_entities.forEach(entity => {
                    if(!chatsArr.includes(entity.chat_id)){
                        chatsArr.push(entity.chat_id);
                    }
            })
            if(query.data === 'send'){
                chatsArr.forEach(entity => {
                    bot.sendMessage(entity, query.message.text);
                    
                });
                admin_rk = new ntkw_module.ReplyKeyboard();
                admin_rk
                .addRow("Посмотреть ответы")
                .addRow("Статистика")
                .addRow("Написать пользователям")
                .addRow("ABOUT")
                .addRow("DRESSCODE")
                .addRow("LINEUP")
                .addRow("ENTRANCE");
                bot.sendMessage(query.from.id, 'Отправка выполнена.', admin_rk.open());
            }
            else if(query.data === 'decline'){
                bot.sendMessage(query.from.id, 'Отправка отменена.', admin_rk.open());
            }
            })
                       
    });
});


bot.on("polling_error", (err) => console.log(err));