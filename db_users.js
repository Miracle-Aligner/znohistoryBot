"use strict"

let fs = require('fs-promise');
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://dbuser1:dbuser1dbuser1@ds163825.mlab.com:63825/znohistory_bot', {useNewUrlParser: true});

let  mongoosePaginate = require('mongoose-paginate');

let userSchema = new mongoose.Schema({
    chat_id: String,
    first_name: String,
    username: String,
    last_name: String,
    isAdmin: Boolean,
    messages: Array,
}, {collection: "Users"});

userSchema.plugin(mongoosePaginate);
let db = mongoose.connection;
let Users = mongoose.model('Users', userSchema, 'Users');

function getByChatId(chat_id){
    return Users.findOne({chat_id: chat_id})
    .then (doc => {return Promise.resolve(doc)})
    .catch (err => {console.log(err); return Promise.reject(err)});
}

function add (user){
    return new Promise(function (resolve, reject) {
        db.collection('Users').insert(user, (err, data) => {
            if (err) reject("cannnot insert into db");
            else resolve(user);
        });
    });
}

function getAll(){
    return Users.find()
    .then(doc => {return Promise.resolve(doc)})
    .catch(err => {return Promise.reject(err)});
}


module.exports = {
    add,
    getAll,
    getByChatId
}