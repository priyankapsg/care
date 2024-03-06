const mongoose = require("mongoose");
const mongoURL = 'mongodb://127.0.0.1:27017/caring';

mongoose.connect(mongoURL);
const connection = mongoose.connection;

connection.on('error', ()=>{
    console.log('Mongodb connection failed')
})

connection.on('connected',()=>{
    console.log('successfully connected to mongodb')
})

module.exports = mongoose