const passport =require('passport');
const LocalStrategy =require('passport-local').Strategy;
const Personn =require('./models/person');

passport.use(new LocalStrategy(async(USERNAME,password,done)=>{
    //authentication logic
    try{
     
        console.log('Recived credentials: ', USERNAME,password);
        const user = await Personn.findOne({username:USERNAME});
      if(!user)
        return done(null,false, {message :'Incorrect Username.'});
      const isPasswardMatch = await user.comparePassword(password);
      if(isPasswardMatch){
        return done(null,user);
      }else{
        return done(null,false,{message :'Incorrect Password.'});
      }
    }catch(err){
    return done(err);
    }
    }))
    module.exports=passport;// export configured passport