const express = require('express')
require('dotenv').config()
const dbConnect = require('./config/dbconnect')
const initRouters = require('./routes')




const app = express()
const port = process.env.PORT || 8888
app.use(express.json())
app.use(express.urlencoded({extends:true}))
dbConnect()
initRouters(app)

// app.use('/',(req,res) => (res.send('SERVER ONnnnn')))

app.listen(port, () =>{
    console.log('server running on the port' + port);
})