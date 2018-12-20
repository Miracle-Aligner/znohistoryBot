"use strict"

// to know your password and uri: heroku config | grep MONGODB_URI

let fs = require('fs-promise');
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://dbuser1:dbuser1dbuser1@ds157422.mlab.com:57422/technoball_bot', {useMongoClient: true});

// mongoose.connect('mongodb://localhost:27017/chamber', {useMongoClient: true});
let  mongoosePaginate = require('mongoose-paginate');

let userSchema = new mongoose.Schema({
    chat_id: String,
    first_name: String,
    username: String,
    last_name: String,
    isAdmin: Boolean,
    mail: String,
    answer: String,
}, {collection: "Users"});
userSchema.plugin(mongoosePaginate);
let db = mongoose.connection;
let Users = mongoose.model('Users', userSchema, 'Users');

function getByChatId(chat_id){
    return Users.findOne({chat_id: chat_id})
    .then (doc => {return Promise.resolve(doc)})
    .catch (err => {console.log(err); return Promise.reject(err)});
}
/*
function getUserByFacebookIdAndName(id, token, username){
    return Users.findOne({'facebook.username': username, 'facebook.id': id})
    .then (doc => {
            return Promise.resolve(doc);
    })
    .catch (err => {console.log(err); return Promise.reject(err)});
}

function checkNull (users){
    return new Promise(function (resolve, reject) {
        if (users.length !== 0){
            reject("logintaken");
        }
        else resolve(users);
    });
}
*/
function add (user){
    return new Promise(function (resolve, reject) {
        db.collection('Users').insert(user, (err, data) => {
            if (err) reject("cannnot insert into db");
            else resolve(user);
        });
    });
}

function getAll(){
    return Users.find({})
    .then(doc => {return Promise.resolve(doc)})
    .catch(err => {return Promise.reject(err)});
}
/*
function changePassword(user, pass){
    return getUserByLoginAndPasshash(user.username, user.passhash)
    .then(user => {
        if (pass.newpassword0 === pass.newpassword1)
        {
            user.passhash = pass.newpassword0;
            Users.update({'_id': user._id}, user, {upsert: false})
            .then(data => {return Promise.resolve(user)})
            .catch(err => {return Promise.reject("Can't update password due to .update() method error.")})
            return Promise.resolve(user);
        }
        else
            return Promise.reject("pass.oldpassword0 !== oldpassword1");
    })
    .catch(err => {return Promise.reject(err)});
}

function changeDescription(user, description){
    return getUserByLoginAndPasshash(user.username, user.passhash)
    .then(user => {
        user.description = description;
        Users.update({'_id': user._id}, user, {upsert: false})
        .then(data => {return Promise.resolve(user)})
        .catch(err => {
            console.log(err); 
            return Promise.reject(err)
        })
        return Promise.resolve(user)
    })
    .catch(err => {return Promise.reject(err)});
}

function addAvatar(req){
    return getUserByLoginAndPasshash(req.user.username, req.user.passhash)
    .then(user => {
        console.log(req.files);
        user.avatarUrl = req.files[0].url;
        Users.update({'_id': user._id}, user, {upsert: false})
        .then(data => {return Promise.resolve(user)})
        .catch(err => {return Promise.reject("Can't update avatar due to .update() method error.\n Err: " + err)});
        return Promise.resolve(user);
    })
    .catch(err => {return Promise.reject(err)});
}

function addTelegram(user, telegramUsername){
    return getUserByLoginAndPasshash(user.username, user.passhash)
    .then(user => {
        user.telegramUsername = telegramUsername;
        Users.update({'_id': user._id}, user, {upsert: false})
        .then(data => {return Promise.resolve(user)})
        .catch(err => {return Promise.reject("Can't add Telegram Username due to .update() method error.")})
    })
    .catch(err => {return Promise.reject(err)});
}

function addFacebook(user, facebook){
    return new Promise(function (resolve, reject) {
        Users.find( {'facebook.id': facebook.id})
            .then (data => {
                checkNull(data)
                .then(() => {
                    getUserByLoginAndPasshash(user.username, user.passhash)
                    .then(user => {
                        let updUser = user;
                        updUser.facebook = {
                            id: facebook.id,
                            token: facebook.token,
                            username: facebook.username
                        };
                
                        Users.findOneAndUpdate({'_id': user._id}, updUser, {upsert:false}, function(err, doc){
                            if (err) {
                                console.log(err)
                                return Promise.reject(err)
                            }
                            return Promise.resolve(updUser);
                        });
                        return Promise.resolve(updUser);
                    })
                    .catch(err => {return Promise.reject(err)});
                })
                .catch (err => reject(err));                 
        })
        .catch(err => reject(err));   
	}); 
}

function addTwitter(user, twitterToken){
    return getUserByLoginAndPasshash(user.username, user.passhash)
    .then(user => {
        user.twitterToken = twitterToken;
        Users.update({'_id': user._id}, user, {upsert: false})
        .then(data => {return Promise.resolve("Twitter added!")})
        .catch(err => {return Promise.reject("Can't add Twitter due to .update() method error.")})
    })
    .catch(err => {return Promise.reject(err)});
}

let postsPerPage = 25;
function getPostsByUser(user, page){
    return new Promise((resolve, reject) => {
        let audios = getPostsByCategory(user, "Audio");
        let videos = getPostsByCategory(user, "Video");
        let books  = getPostsByCategory(user, "Books");
        let audiosPlusVideos = audios.concat(videos);
        let allPosts = audiosPlusVideos.concat(books);
        if (allPosts.length === 0)
            return Promise.reject("User has no posts.")
        // page counter starts from 1
        let startIndex = (page - 1) * postsPerPage;
        let endIndex = startIndex + postsPerPage;
        let arrayToSend;
        for (let i = startIndex, j = 0; i < endIndex; i++, j++)
            arrayToSend[j] = allPosts[i];
        return Promise.resolve(arrayToSend);
    });
}

function getPostsByCategory(user, category){
    return getUserByLoginAndPasshash(user.username, user.passhash)
    .then(user => {
        let posts;
        if(category === "Video"){
            posts = Video.getByAuthor(); 
        }
        else if(category === "Audio"){
            posts = Audio.getByAuthor(); 
        }
        else if(category === "Books"){
            posts = Books.getByAuthor(); 
        }
        else{
            return Promise.reject("No such category.")
        }
        return Promise.resolve(posts);
    })
    .catch(err => {return Promise.reject(err)});
}

function getFollowers(user){
    return getUserByLoginAndPasshash(user.username, user.passhash)
    .then(user => {
        return Promise.resolve(user.followers)
    })
    .catch(err => {return Promise.reject(err)});
}

function getFollowingUsers(user){
    return getUserByLoginAndPasshash(user.username, user.passhash)
    .then(user => {
        return Promise.resolve(user.followed)
    })
    .catch(err => {return Promise.reject(err)});
}
*/
module.exports = {
    add,
    getAll,
    getByChatId
    /*
    addAvatar,
    addTwitter,
    addTelegram,
    addFacebook,
    getFollowers,
    changePassword,
    getPostsByUser,
    getFollowingUsers,
    changeDescription,
    getPostsByCategory,
    getUserByFacebookToken,
    getUserByLoginAndPasshash,
    getUserByFacebookIdAndName*/
}