const express = require("express")
const App = require("./app")
const Node = express()


const PORT = 4000

Node.use("/", App)

Node.listen(PORT,()=>{
    console.log("Port is started on:",PORT)

  
} )


