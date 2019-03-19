"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const Users = require("./db_users.js");
const Actions = require("./db_actions.js");

const adminsList = [
    '157371788'
];

const bot = new Telegraf("769848173:AAHugU3o4R1Lv8Ow-vDWXl7ZfMokiPoIs9Y")
const publishedModules = 3;
const publishedLections = 16;
bot.use(Telegraf.log())

const modules = [
    {
        name: 'МОДУЛЬ 1',
        imgLink: "https://static.tildacdn.com/tild3932-3366-4161-a565-646234653164/_1.png",
        link: "http://znohistory.ed-era.com/m1", 
        description: "Про розселення слов'ян, поділ земель, навалу монголів та появу перших козаків.", 
        lections: [
            { 
                number: "Лекція 1",
                fullname: "Вступ до історії України.",
                description: "Історія про те, що таке історія взагалі та як нам вдається вивчати те, що вже минуло.",
                link: "http://znohistory.ed-era.com/m1/l1",
                imgLink: "https://static.tildacdn.com/tild6561-3463-4039-b234-313962653133/1.png",
                audioLink:""
            },
            { 
                number: "Лекція 2",
                fullname: "Стародавня історія України.",
                description: "Історія про те, як на українських землях з'явилися люди і вирішили тут лишитися.",
                link: "http://znohistory.ed-era.com/m1/l2",
                imgLink: "https://static.tildacdn.com/tild3864-3139-4363-b831-393537323937/1.png",
                audioLink:""
            },
            { 
                number: "Лекція 3",
                fullname: "Київська держава.",
                description: "Історія про те, як князі землю ділили, шлюби укладали та з кочовиками воювали.",
                link: "http://znohistory.ed-era.com/m1/l3",
                imgLink: "https://static.tildacdn.com/tild6431-6333-4138-a233-303431656536/photo.png",
                audioLink:""
            },
            { 
                number: "Лекція 4",
                fullname: "Галицько-Волинська держава. Монгольська навала.",
                description: "Історія про те, як Данило Галицький коронувався, а монголи вторглися на Русь.",
                link: "http://znohistory.ed-era.com/m1/l4",
                imgLink: "https://static.tildacdn.com/tild3037-3837-4137-a436-663030633539/photo.png",
                audioLink:""
            },
            { 
                number: "Лекція 5",
                fullname: "Українські землі у другій половині XIV - першій половині XVI ст.",
                description: "Історія про війни, королів, козаків та Україну в складі іноземних держав.",
                link: "http://znohistory.ed-era.com/m1/l5",
                imgLink: "https://static.tildacdn.com/tild6331-3635-4636-b132-623133333263/photo.png",
                audioLink:""
            }
        ],
        numberOfLections: 5,
        numberOfPublished: 5
    },
    {
        name: 'МОДУЛЬ 2',
        imgLink: "https://static.tildacdn.com/tild3361-3964-4532-b365-313161396665/2.png", 
        link: "http://znohistory.ed-era.com/m2", 
        fullname: "Друга половина ХVІ ст. – XVIII ст.",
        description: "Про утворення та занепад Речі Посполитої, війни, повстання, угоди та ліквідацію українського козацтва.", 
        lections: [
            { 
                number: "Лекція 6",
                fullname: "Українські землі у складі Речі Посполитої (друга половина XVI ст.)",
                description: "Історія про утворення Речі Постополитої, заснування Січі, Реформацію та Контрреформацію.",
                link: "http://znohistory.ed-era.com/m2/l6",
                imgLink: "https://static.tildacdn.com/tild6136-3232-4661-b037-386363306463/6.png",
                audioLink:""
            },
            { 
                number: "Лекція 7",
                fullname: "Українські землі в складі Речі Посполитої (перша половина XVII ст.)",
                description: "Історія про козацькі походи, повстання, церковне життя та культуру українських земель.",
                link: "http://znohistory.ed-era.com/m2/l7",
                imgLink: "https://static.tildacdn.com/tild3839-3433-4238-a138-663734313263/photo.png",
                audioLink:""
            },
            { 
                number: "Лекція 8",
                fullname: "Національно-визвольна війна під проводом Б. Хмельницького середини XVII ст.",
                description: "Історія про початок війни за незалежність, битви, угоди та перемир'я.",
                link: "http://znohistory.ed-era.com/m2/l8",
                imgLink: "https://static.tildacdn.com/tild6234-3036-4135-b737-646636303837/photo.png",
                audioLink:""
            },
            { 
                number: "Лекція 9",
                fullname: "Українські землі наприкінці 50-их у 80-ті рр. XVII ст.",
                description: "Історія про роздробленість, війни та гетьманів, що надто часто змінювалися.",
                link: "http://znohistory.ed-era.com/m2/l9",
                imgLink: "https://static.tildacdn.com/tild3263-3130-4231-a635-306439653430/photo.png",
                audioLink:""
            },
            { 
                number: "Лекція 10",
                fullname: "Українські землі наприкінці XVII - у першій половині XVIII століття.",
                description: "Історія про союз зі шведами, перемогу малоросійства та першу Конституцію.",
                link: "http://znohistory.ed-era.com/m2/l10",
                imgLink: "https://static.tildacdn.com/tild6532-6636-4366-a233-343361373332/photo.png",
                audioLink:""
            },
            { 
                number: "Лекція 11",
                fullname: "Українські землі у другій половині XVIII ст.",
                description: "Історія про реформи ліквідацію козацтва, масштабні повтання та три поділи Речі Постополитої.",
                link: "http://znohistory.ed-era.com/m2/l11",
                imgLink: "https://static.tildacdn.com/tild3838-3236-4137-a437-323664373832/12.png",
                audioLink:""
            }
        ],
        numberOfLections: 6,
        numberOfPublished: 6
    },
    {
        name: 'МОДУЛЬ 3',
        fullname: "XIX століття.",
        imgLink: "https://static.tildacdn.com/tild3364-6437-4164-b435-623331353435/Module_3.jpg",
        description: "Про українські землі в складі Російської та Австрійської імперій, національне відродження та українську культуру", 
        link: "http://znohistory.ed-era.com/m3",
        lections: [
            { 
                number: "Лекція 12",
                fullname: "Українські землі у складі Російської імперії наприкінці XVIII - у першій половині XIX ст.",
                description: "Історія про територіальні зміни, українське національне відродження та масонів.",
                link: "http://znohistory.ed-era.com/m3/l12",
                imgLink: "https://static.tildacdn.com/tild3566-3762-4666-a132-353332656639/12.png",
                audioLink:""
            },
            { 
                number: "Лекція 13-14",
                fullname: "Західноукраїнські землі в складі Австрійської імперії наприкінці XVIII - у першій половині XIX ст., культура.",
                description: "Історія про весну народів, будителів та Руську трійцю.",
                link: "http://znohistory.ed-era.com/m3/l13-l14",
                imgLink: "https://static.tildacdn.com/tild3737-3133-4133-a437-336665613930/_-1.png",
                audioLink:""
            },
            { 
                number: "Лекція 15",
                fullname: "Наддніпрянська Україна в другій половині XIX ст.",
                description: "-",
                link: "http://znohistory.ed-era.com/m3/l15",
                imgLink: "https://static.tildacdn.com/tild6165-6536-4663-a339-653537636264/_15.png",
                audioLink:""
            },
            { 
                number: "Лекція 16",
                fullname: "Західноукраїнські землі у складі Австро-Угорської імперії в другій половині XIX ст.",
                description: "-",
                link: "http://znohistory.ed-era.com/m3/l16",
                imgLink: "https://static.tildacdn.com/tild3131-3363-4361-a539-326662313462/photo.png",
                audioLink:""
            },
            { 
                number: "Лекція 17",
                fullname: "Культура України в другій половині XIX - на початку XX ст.",
                description: "-",
                link: "http://znohistory.ed-era.com/m3/l17",
                imgLink: "https://static.tildacdn.com/tild6434-6461-4265-b932-623234633761/Lecturre17.png",
                audioLink:""
            }
        ],
        numberOfLections: 5,
        numberOfPublished: 2
    }
];


    const modulesMenu = Telegraf.Extra
                    .markdown()
                    .markup((m) => m.keyboard([
                    m.callbackButton(modules[0].name),
                    m.callbackButton(modules[1].name),
                    m.callbackButton(modules[2].name)
                    ]).resize())

    bot.command('start', msg =>{
        msg.reply('Виберіть модуль:', modulesMenu);
        Users.add({
            chat_id: msg.from.id,
            first_name: msg.from.first_name,
            username: msg.from.username,
            last_name: msg.from.last_name,
            isAdmin: adminsList.includes(String(msg.from.id))
        });
        Actions.add({
            chat_id: ctx.from.id,
            message: ctx.message.text
        });
    })

    bot.hears(/\МОДУЛЬ (\d+)/, (ctx) => {
        Actions.add({
            chat_id: ctx.from.id,
            message: ctx.message.text
        });

        if(ctx.match[1] < 1 || ctx.match[1] > publishedModules)
            return ctx.reply("Такого модуля не існує або він ще не був опублікований 😔", modulesMenu);
        else
            return ctx.replyWithHTML(getModuleInfoHTML(ctx.match[1] - 1), getLectionsMenu(ctx.match[1]));
    })

    bot.hears(/\Лекція (\d+)/, (ctx) => {
        Actions.add({
            chat_id: ctx.from.id,
            message: ctx.message.text
        });

        let songsArr = [
            "https://fex.net/load/888840093332/1309398491",
            "https://fex.net/load/888840093332/1309398527",
            "https://fex.net/load/888840093332/1309398576",
            "https://fex.net/load/888840093332/1309398596",
            "https://fex.net/load/888840093332/1309398622",
            "https://fex.net/load/888840093332/1309398652",
            "https://fex.net/load/888840093332/1309398709"
        ];

        if(ctx.match[1] < 1 || ctx.match[1] > publishedLections)
            return ctx.reply("Такої лекції не існує або вона ще не була опублікована 😔", modulesMenu);
        else
            return ctx.replyWithHTML(getLectionInfoHTML(ctx.match[1]), ctx.replyWithAudio(songsArr[Math.floor(Math.random() * 6)]));
    })

    bot.hears('⬅️ Назад', (ctx) => {
        ctx.reply('Виберіть модуль:', modulesMenu);
        Actions.add({
            chat_id: ctx.from.id,
            message: ctx.message.text
        });
    })

    function getModuleInfoHTML(number){
        return  "<b>" + modules[number].name + 
                "</b><a href=\'" + modules[number].imgLink + 
                "\'>.</a>\n\n<i>" + modules[number].description + 
                "</i>\n\n" + getLectionsListHTML(number) + "<a href=\'" + modules[number].link + 
                "\'>Переглянути лекції на сайті... </a>";
    };

    function getLectionInfoHTML(number){
        let neededLection = getLection("Лекція " + number);

        if (!neededLection)
            return "Такої лекції не існує або вона ще не була опублікована 😔";
        
            return  "<b>" + neededLection.number + 
                "</b><a style=\"text-decoration: none; color: black;\"href=\'" 
                + neededLection.imgLink + 
                "\'>: </a>" + neededLection.fullname +
                "\n\n<i>" + neededLection.description + 
                "</i>\n\n<a href=\'" + neededLection.link + 
                "\'>Переглянути лекцію на сайті... </a>";
    };

    function getLection(name) {
        let i = 0; // module
        let j = 0;
        while (i < modules.length && j < modules[i].numberOfLections){
            if(modules[i].lections[j].number.includes(name))
                return modules[i].lections[j];
            j++;
            if (j === modules[i].numberOfLections){
                i++;
                j = 0;
            }  
        }
        return false;
      }

      function getLectionsListHTML(moduleNumber){
        let lectionsList = "";
            modules[moduleNumber].lections.forEach(element => {
                let lectionString = "<b>" + element.number + ": </b><i>" + element.fullname + "</i>";
                lectionsList += lectionString;
                lectionsList += "\n";
            });
            lectionsList += "\n";
        return lectionsList;
    }; 

    function getLectionsMenu(moduleNumber){
        let lectionsList = [];
            modules[moduleNumber - 1].lections.forEach(element => {
                lectionsList.push(element.number);
            });
            lectionsList.push("⬅️ Назад")

            let lectionsMenu = Telegraf.Extra
                .markup((m) => m.keyboard(lectionsList).resize());
        console.log(lectionsMenu);
        return lectionsMenu;
    }; 

    bot.hears("stats", (msg) => {
        if(adminsList.includes(msg.from.id))
            msg.reply(getActionsStatsHTML());

        Actions.add({
            chat_id: msg.from.id,
            message: msg.message.text
        });
    })

    function getActionsStatsHTML(){
        let html = "";
        for (let i = 0; i < publishedModules; i++)
            html += getConcreteActionStatsHTML(i);
        html += "\n";

        return html;
    };     

    function getConcreteActionStatsHTML(moduleNumber){
        let actionsForModule = "";

        modules[moduleNumber].lections.forEach(element => {
            Actions.getByMessage(element.number)
            let lectionString = "<b>" + element.number + ": </b><i>" + element.fullname + "</i>";
            lectionsList += lectionString;
            lectionsList += "\n";
        });
        lectionsList += "\n";
        return lectionsList;
    }; 

    bot.hears(/.*/, (msg) => {
        msg.reply("Не зрозумів... Скористайтеся, будь ласка, кнопками 🙃");
        Actions.add({
            chat_id: msg.from.id,
            message: msg.message.text
        });
    })

    bot.launch()
/*
const bot = new TelegramBot(token, { polling: true });
let rk = new ntkw_module.ReplyKeyboard();
let admin_rk = new ntkw_module.ReplyKeyboard();
const ik = new ntkw_module.InlineKeyboard();
const commandsArray = [
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
    if(adminsList.includes(String(msg.from.id))){
        bot.sendMessage(msg.from.id, "1 марта 2019 года ознаменуется сразу двумя важными событиями. Во-первых, мы наконец-то попрощаемся с зимой. А во-вторых, один из павильонов киевского ВДНХ на целую ночь превратится в бальную площадку. Здесь будет править Технобал.\n\nПереосмысленная классика подходящая по формату 21 веку.  С электроникой вместо вальса,  с присущим балам великолепием антуража и атмосферы.", admin_rk.open({ resize_keyboard: true }));
    }
    else{
        rk = new ntkw_module.ReplyKeyboard();
        rk
        .addRow("ABOUT")
        .addRow("DRESSCODE")
        .addRow("LINEUP")
        .addRow("ENTRANCE");
        let about = "1 марта 2019 года ознаменуется сразу двумя важными событиями. Во-первых, мы наконец-то попрощаемся с зимой. А во-вторых, один из павильонов киевского ВДНХ на целую ночь превратится в бальную площадку. Здесь будет править Технобал.\n\nПереосмысленная классика подходящая по формату 21 веку.  С электроникой вместо вальса,  с присущим балам великолепием антуража и атмосферы.";
        bot.sendMessage(msg.from.id, about, rk.open({ resize_keyboard: true }));
    }
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
    if(adminsList.includes(String(msg.from.id))){
        bot.sendMessage(msg.from.id, "Guest invite – main\n1000 грн. Приветствуется дресс-код. Вход на 2 персоны.\n\nBallroom - backstage\n1600 грн. Приветствуется дресс-код. Вход на 2 персоны.\n\nDebutant – main\nFree. Дресс-код обязателен. Вход на 2 персоны. Всего 500 пригласительных.\n\nhttps://www.technoball.com.ua/entrance", admin_rk.open({ resize_keyboard: true }));
    }
    else{
        rk = new ntkw_module.ReplyKeyboard();
        rk
        .addRow("ABOUT")
        .addRow("DRESSCODE")
        .addRow("LINEUP")
        .addRow("ENTRANCE");
        let info = "Guest invite – main\n1000 грн. Приветствуется дресс-код. Вход на 2 персоны.\n\nBallroom - backstage\n1600 грн. Приветствуется дресс-код. Вход на 2 персоны.\n\nDebutant – main\nFree. Дресс-код обязателен. Вход на 2 персоны. Всего 500 пригласительных.\n\nhttps://www.technoball.com.ua/entrance";
        bot.sendMessage(msg.from.id, info, rk.open({ resize_keyboard: true }));
    }
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
    if(adminsList.includes(String(msg.from.id))){
        bot.sendMessage(msg.from.id, "MR.G (LIVE)\nMARCEL DETTMANN\nSMAILOV\nVERA LOGDANIDI\nNA NICH", admin_rk.open({ resize_keyboard: true }));
    }
    else{
        rk = new ntkw_module.ReplyKeyboard();
        rk
        .addRow("ABOUT")
        .addRow("DRESSCODE")
        .addRow("LINEUP")
        .addRow("ENTRANCE");
        let info = "MR.G (LIVE)\nMARCEL DETTMANN\nSMAILOV\nVERA LOGDANIDI\nNA NICH";
        bot.sendMessage(msg.from.id, info, rk.open({ resize_keyboard: true }));
    }
});

bot.onText(/DRESSCODE/i, (msg) => {
    if(adminsList.includes(String(msg.from.id))){
        bot.sendMessage(msg.from.id, "Технобал приветствует дресс код гостей. Каждому необходим бальный наряд, подходящий для рейва. Удобный низ и блистательный верх. Бальные платья, коктейльные платья, фраки и смокинги. Организаторы не ограничивают фантазию, но напоминают, что это все же бал.\n\nДля категории Debutant дресс-код обязателен.", admin_rk.open({ resize_keyboard: true }));
    }
    else{
        rk = new ntkw_module.ReplyKeyboard();
        rk
        .addRow("ABOUT")
        .addRow("DRESSCODE")
        .addRow("LINEUP")
        .addRow("ENTRANCE");
        let info = "Технобал приветствует дресс код гостей. Каждому необходим бальный наряд, подходящий для рейва. Удобный низ и блистательный верх. Бальные платья, коктейльные платья, фраки и смокинги. Организаторы не ограничивают фантазию, но напоминают, что это все же бал.\n\nДля категории Debutant дресс-код обязателен.";
        bot.sendMessage(msg.from.id, info, rk.open({ resize_keyboard: true }));
    }
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

*/