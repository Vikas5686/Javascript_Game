const { mongoose } = require('mongoose');

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        country:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        Score:{
            type:Number,
            require
        }       
    }
)

const users=new mongoose.model("Users",userSchema)
module.exports=users;