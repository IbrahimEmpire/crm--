const express = require("express")
const App = require("./app")
const Node = express()


const PORT = 4000

Node.get('/', (req, res)=>{
    res.send("welcome our server")
})

Node.use("/", App)

Node.listen(PORT,()=>{
    console.log("Port is started on:",PORT)


  
} )


