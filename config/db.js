const mongoose = require('mongoose')

async function connectToDB(){
 const {MONGO_URI} = process.env
   try{
     await  mongoose.connect(MONGO_URI)
     console.log('mongodb connected')
   }catch(err){
    console.log('mongodb connection error',err)
   }
}

module.exports = connectToDB;