const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const passport =require('passport');
const LocalStrategy =require('passport-local').Strategy;
const Personn =require('./models/person');

const bodyParser = require('body-parser');
app.use(bodyParser.json());// will store in req.body

const PORT =process.env.PORT || 3001;
//middleware function
const logRequest =(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);

next();
}
app.use(logRequest);

passport.use(new LocalStrategy(async(USERNAME,passward,done)=>{
//authentication logic
try{
 
    console.log('Recived credentials: ', USERNAME,passward);
    const user = await Personn.findOne({username:USERNAME});
  if(!user)
    return done(null,false, {message :'Incorrect Username.'});
  const isPasswardMatch =user.passward ===passward ?true : false;
  if(isPasswardMatch){
    return done(null,user);
  }else{
    return done(null,false,{message :'Incorrect Password.'});
  }
}catch(err){
return done(err);
}
}))

app.use(passport.initialize());
app.get('/', passport.authenticate('local',{session: false}),function (req, res) {
  res.send('welcome to My Hotel')
})
 //import the router files
const personRoutes =require('./Routes/personRoutes');
const MenuItemRoutes= require('./Routes/menuItemRoutes');
const Person = require('./models/person');
//use the routes
app.use('/person',personRoutes);
app.use('/menu',MenuItemRoutes);

app.listen(PORT, () => {
  console.log('server is running on port 3001')
})