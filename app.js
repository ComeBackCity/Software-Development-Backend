require("dotenv").config()
const express = require("express")
const cors = require("cors")
const chalk = require("chalk")

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.get('/', async (req, res)=>{
    res.send("Hello world!")
})

app.listen(port, ()=> {
    console.log(chalk.keyword("green")("Server is up on port " + port));
})

module.exports = app
