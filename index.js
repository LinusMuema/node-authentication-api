require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const authRoute = require('./routes/auth')

const  dbURI = "mongodb://localhost/users"
app.use(express.json())
app.use('/api/auth', authRoute)

mongoose.connect(process.env.MONGODB_URL || dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (err) => {
    console.log(err)
});
db.once('open', () => {
    console.log('db opened successfully')
});


app.listen(process.env.PORT || 2400, () => {console.log("Server started: 2400")})