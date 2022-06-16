const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect("mongodb://localhost/userManagementSystem")
const mongoDatabase = mongoose.connection

mongoDatabase.on('open', (err) => {
    if (err) {
        console.log("Error while connecting\n", error);
    }
    else {
        console.log("Database Connected");
    }
})

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: true }))

const userRoute = require('./routes/userRoutes')
app.use('/users', userRoute)

app.listen(8080, (err) => {
    if (err)
        console.log("Error listening to server")
    console.log("Server is up")
})