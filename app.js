const express = require("express")
const Admin = require("./Controler/Admin")
const pars = require("body-parser")
const cust = require("./Controler/Customer")
const App = express()
const cors = require("cors")


const connect =  require("./dbcofig")
connect()
App.use(cors())
App.use(pars.urlencoded({ extended: true}))
App.use(pars.json())

App.use("/Admin", Admin)
App.use("/cust", cust)

module.exports=App