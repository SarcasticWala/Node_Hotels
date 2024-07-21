const mongoose = require('mongoose');
const myUrl = 'mongodb://localhost:27017/hotel';
mongoose.connect(myUrl,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
})
const db= mongoose.connection;
db.on('connected',()=>{
    console.log('connected to database');
})
db.on('error',()=>{
    console.log('error in database connection');
})
db.on('disconected',()=>{
    console.log('Database is dis-connection');
})
//export
module.exports = db;