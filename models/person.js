const mongoose =require('mongoose');
const bcrypt=require('bcrypt');
//define the person schema
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
    type:Number
    },
    work:{
        type:String,
        enum:['chef','water','manager'],
        required:true
    },
    mobile:{
        type:String,
        requeired:true,
       
    },
    email:{
        type:String,
        requeired:true,
        unique:true
    },
    adress:{
        type:String,
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        required:true,
        type:String,
    },
    password:{
        required:true,
        type:String
    }
});
//pre mlw function for save operation
personSchema.pre('save',async function(next){
    const person =this;
    if(!person.isModified('password')) return next();
    try{
        //hash pass genaration
        const salt = await bcrypt.genSalt(10);
        //hash pass
        const hasPassword =await bcrypt.hash(person.password,salt);
        //override the plain pass with the hased one
        person.password = hasPassword;
        next()
    }catch(err){
        return next(err);
    }
})
personSchema.methods.comparePassword = async function(candidatePassword) {
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}
//crating person model using the  schema
const Person = mongoose.model('person',personSchema);
module.exports=Person;