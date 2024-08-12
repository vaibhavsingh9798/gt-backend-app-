const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const connectToDB = require('./config/db')
const userRouter = require('./routes/user.route.js')
const app = express()
const PORT = process.env.PORT || 8003;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))




connectToDB();

app.use('/api/v1/users',userRouter)

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})




