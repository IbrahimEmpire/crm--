const express = require("express")
const custDB = require('../Schemas/Customer')
const cust = express()


cust.get('/get', async(req, res, next)=>{
    const cust = await custDB.find()
    res.status(200).send({
        message: "This is Customer Details",
        cust
    })
})

cust.post('/post', async(req,res, next)=>{
try {
    let cust = await custDB.findOne({email: req.body.email})

    if(!cust){
        let cust = await custDB.create(req.body)
        res.status(200).send({
            message: "customer signup success"
        })
    }else{
        res.status(400).send({
            message: "This email id already register"
        }
        )
    }
} catch (error) {
    res.status(404).send({
        Message: "server error",
        error

    })
}
})

cust.delete("/:id", async(req, res)=>{
    try {
      let user = await custDB.findOne({custId: req.params.id})
      if(user){
        let user = await custDB.deleteOne({custId: req.params.id})
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


  cust.put("/:id", async(req, res)=>{
    try {
      let user = await custDB.findOne({custId: req.params.id})
      if(user){
        user.custName= req.body.custName,
        user.email = req.body.email,
        user.job = req.body.job,
        user.mobile= req.body.mobile,
        user.about= req.body.about
  
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



module.exports= cust