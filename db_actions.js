"use strict"

let fs = require('fs-promise');
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://dbuser1:dbuser1dbuser1@ds163825.mlab.com:63825/znohistory_bot', {useNewUrlParser: true});

let  mongoosePaginate = require('mongoose-paginate');

let actionsSchema = new mongoose.Schema({
    chat_id: String,
    message: String,
}, {collection: "Actions"});

actionsSchema.plugin(mongoosePaginate);
let db = mongoose.connection;
let Actions = mongoose.model('Actions', actionsSchema, 'Actions');

function getByChatId(chat_id){
    return Actions.findOne({chat_id: chat_id})
    .then (doc => {return Promise.resolve(doc)})
    .catch (err => {console.log(err); return Promise.reject(err)});
}

function add (action){
    return new Promise(function (resolve, reject) {
        db.collection('Actions').insert(action, (err, data) => {
            if (err) reject("cannnot insert into db");
            else resolve(action);
        });
    });
}

function getAll(){
    return Actions.find()
    .then(doc => {return Promise.resolve(doc)})
    .catch(err => {return Promise.reject(err)});
}

function getByMessage(message){
    return Actions.findOne({message: message})
    .then (doc => {return Promise.resolve(doc)})
    .catch (err => {console.log(err); return Promise.reject(err)});
}

function getQuantityByMessage(message){
    return Actions.findOne({message: message})
    .then (doc => {
        if(doc != null)
            return Promise.resolve(doc.length)
        else 
            return 0})
    .catch (err => {console.log(err); return 0});
}

module.exports = {
    add,
    getAll,
    getByChatId,
    getByMessage,
    getQuantityByMessage
}