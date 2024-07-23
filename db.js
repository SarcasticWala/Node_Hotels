const mongoose = require('mongoose');
require('dotenv').config();
 const myUrl =process.env.DB_URL_LOCAL ;
// const myUrl=process.env.DB_URL;
mongoose.connect(myUrl)
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log('Error in database connection', err);
    });

const db= mongoose.connection;

db.on('disconected',()=>{
    console.log('Database is dis-connection');
})
//export
module.exports = db;