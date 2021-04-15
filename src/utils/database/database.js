const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
const uri = "mongodb+srv://"+ process.env.DB_NAME +":" + process.env.DB_PASSWORD + "@cluster0.nueh7.mongodb.net/cse408db?retryWrites=true&w=majority";

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client)=>{
    if (error){
        return console.log("Unable to connect to database")
    }

    console.log("Connected to database successfully")
})



