const express = require("express")
const UserDB = require("../Schemas/UsersSchemas")
const { hassedPasword, createToken, passwordCompare, tokenValue, role } = require("../validators/auth")
const Admin = express()

Admin.get("/get",tokenValue, async(req, res, next)=>{
    const user = await UserDB.find()
    res.status(200).send({
        message:"Token value 1min ",
        success: true,
        data: user

    })
})

Admin.post("/post",async(req, res, next)=>{

    
try {
   
    let user =await UserDB.findOne({email: req.body.email})
   
if(!user){
    let hashed = await hassedPasword(req.body.password)
    req.body.password = hashed
    let user = await UserDB.create(req.body)
  
    res.status(200).send({
        message: "user signup success",

    })
}else{
    res.status(401).send({
        message: "this emailId already exist"
    })
}
} catch (error) {
    console.log(error)
    res.status(400).send({
        message: "inrernal server error", 
        error,
        
    })
}
})



Admin.delete("/:id", async(req, res)=>{
    try {
      let user = await UserDB.findOne({userId: req.params.id})
      if(user){
        let user = await UserDB.deleteOne({userId: req.params.id})
        res.status(200).send({
          message:" user delete seccesfuly"
        })
      }else{
        res.status(400).send({
          message:"users does not exist"
        })
      }
    } catch (error) {
      res.status(500).send({
  message:"server error"
      })
      
    }
  })


  Admin.patch("/:id", async(req, res)=>{
    try {
      let user = await UserDB.findOne({userId: req.params.id})
      if(user){
        user.firstName= req.body.firstName,
        user.lastName = req.body.lastName,
        user.email = req.body.email,
        user.password= req.body.password,
        user.role= req.body.role
  
        await user.save()
  
        res.status(200).send({
            message: "user update success"
        })
  
      }else{
        res.status(500).send({
          message:"user does not exist"
        })
      }
      
    } catch (error) {
      res.status(500).send({
        message:"server error"
            })
      
    }
  })




  Admin.post("/login", async(req, res)=>{
    try {
      let user = await UserDB.findOne({email: req.body.email})
      
      if(user){
        if(await passwordCompare(req.body.password, user.password)){
          let token = await createToken({
            name:user.firstName,
            email: user.email,
            role: user.role,
            id: user.userId
          })
          res.status(200).send({
            message:"login success",
            yourToken: token
          
          })
        }else{
          res.status(500).send({
            message: "sorry incorrect password"
          })
        }
       
      }else{
        res.status(400).send({
          message:"user does not exist"
        })
      }
    } catch (error) {
      console.log("The Error is:   ------",error)
      res.status(500).send({
        message:"server error"
      })
    }
  })
  


module.exports = Admin