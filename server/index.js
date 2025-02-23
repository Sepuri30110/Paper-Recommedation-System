const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const port = 3005

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect("mongodb://127.0.0.1:27017/Paper-Recommender")
    .then(res => console.log('Connected to MongoDB successfully'))
    .catch(err => console.log('Error connecting to MongoDB'))

const loginRoutes = require('./routes/login.route')
const adminRoutes = require('./routes/admin.route')
const userRoutes = require('./routes/user.route')

app.use('/',loginRoutes)
app.use('/admin',adminRoutes)
app.use('/user',userRoutes)

app.listen(port, () => {
    console.log(`Server listening on port : ${port}`)
})