const mongoose = require("mongoose")
const validator =  require("validator")
// const { default: isEmail } = require("validator/lib/isemail")

const customerSchemas = new mongoose.Schema({
    custId:{type:Number, require:true},
    custName:{type: String, require: true},
    email:{type: String, require: true,
        lowerCase:true,
    validator: (value)=>{
        isEmail(value)
    }
    },
    job:{type:String, require:true},
    mobile:{type: String, require:true},
    about:{type: Array, require:false},
    createdOn:{type:Date, default: Date.now()},
    updatedOn:{type:Date, default: Date.now()}
},
{
    versionKey: false
}
)

const custDB = mongoose.model("customer", customerSchemas)
module.exports = custDB