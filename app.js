require("dotenv").config()
const express = require("express")
const cors = require("cors")
const chalk = require("chalk")
const mongodb = require("mongodb")
const database = require('./src/utils/database/database')
// const storage = require('./src/utils/storage/storage')

const officerRouter = require('./src/routes/officer')

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
// app.use(storage)
app.use(officerRouter)

app.get('/', async (req, res)=>{
    res.send("CSE-408 backend")
})

app.listen(port, ()=> {
    console.log(chalk.keyword("green")("Server is up on port " + port));
})

module.exports = app
