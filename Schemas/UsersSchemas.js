const mongoose = require("mongoose")
const validator =  require("validator")
// const { default: isEmail } = require("validator/lib/isemail")

const userSchemas = new mongoose.Schema({
    userId:{type:Number, require:true},
    firstName:{type: String, require: true},
    lastName:{type: String, require: true},
    email:{type: String, require: true,
        lowerCase:true,
    validator: (value)=>{
        isEmail(value)
    }
    },
    password:{type:String, require:true},
    role:{type: String, require:true},
    createdOn:{type:Date, default: Date.now()},
    updatedOn:{type:Date, default: Date.now()}
},
{
    versionKey: false
}
)

const UserDB = mongoose.model("user", userSchemas)
module.exports = UserDB