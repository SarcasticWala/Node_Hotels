const mongoose =require('mongoose');
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
//crating person model using the  schema
const Person = mongoose.model('person',personSchema);
module.exports=Person;