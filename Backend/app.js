const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const express = require("express");
const connectToDb = require("./db/db.js")
const app = express();

connectToDb()
app.use(cors())
app.get("/", function(req, res){
    res.send("this is home page")
})


module.exports = app