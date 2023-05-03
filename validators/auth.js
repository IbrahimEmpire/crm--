const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const salt = 10
const sk = 'pg.jadw2537'


const hassedPasword = async(password)=>{
    const salted = await bcrypt.genSalt(salt)
    const hassedPasword = await bcrypt.hash(password, salted)
    return hassedPasword
}


const createToken = async(paylode)=>{
    let token = await jwt.sign(paylode,sk,{expiresIn: '1m'})
    return token
}

const passwordCompare = async(password, hassedPassword)=>{
 return await bcrypt.compare(password, hassedPassword)
}


const tokenValue = async(req, res, next)=>{
    console.log(req.headers.authorization)
    if(req.headers.authorization){
        let tokan =await req.headers.authorization.split(" ")[1]
        console.log(tokan)
        let data = await jwt.decode(tokan)
        console.log(data)
        if(Math.floor(((+new Date())/1000)) < data.exp){
           next()
        }else{
            res.status(400).send({
                message: "sorry sir token time out please login again"
            })
        }
    }else(
        res.status(400).send({
            message:"need a value token"
        })
    )
}

const role = async(req, res, next)=>{
    if(req.headers.authorization){
        let token = req.headers.authorization.split(" ")[1]
        let data = await jwt.decode(token)
    
    if(data.role === "admin" || data.role === "manager"){
        next()
    }else{
        res.status(400).send({
            message: "sorry this data only for admin or managers"
        })
    }
}else{
    res.status(400).send({
        message: "Need token"})
}
}

module.exports= {hassedPasword,createToken,passwordCompare,tokenValue, role}