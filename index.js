require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const authRoute = require('./routes/auth')

const  dbURI = "mongodb://localhost/pies"
app.use(express.json())
app.use('/api/auth', authRoute)


mongoose.connect(process.env.MONGODB_URL || dbURI , {useNewUrlParser: true, useUnifiedTopology: true})
    .then(res => {console.log("Db started successfully");})
    .catch(err => {console.log(err);})
const db = mongoose.connection


app.listen(2400, () => {console.log("Server started: 2400")})