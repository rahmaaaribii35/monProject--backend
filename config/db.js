// Import Mongoose
const mongoose = require('mongoose');

//exportation
module.exports.connectToMangoDb = async () => {
    mongoose.set('strictQuery', false)
    mongoose.connect("mongodb+srv://monProject:eJZqAH4vDgl34dI3@cluster0.4p1eixh.mongodb.net/myDatabaseName").then(() => {
         console.log('connect to db') 
        }).catch((error) => console.log(error))

}

