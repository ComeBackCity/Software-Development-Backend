require("dotenv").config()
const express = require("express")
const cors = require("cors")
const chalk = require("chalk")
const mongodb = require("mongodb")
const database = require('./src/utils/database/database')
const bodyParser = require("body-parser");
const storage = require('./src/utils/storage/storage')

const officerRouter = require('./src/routes/officer')
const miscRouter = require('./src/routes/misc')
const publicRouter = require('./src/routes/public')

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(storage)
app.use(officerRouter)
app.use(miscRouter)
app.use(publicRouter)

app.get('/', async (req, res) => {
    res.send("CSE-408 backend")
})

app.listen(port, () => {
    console.log(chalk.keyword("green")("Server is up on port " + port));
})

module.exports = app
