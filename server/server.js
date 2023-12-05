const express = require('express')
require('dotenv').config()
const dbConnect = require('./configs/dbConnect')
const initRoutes = require('./routes')
const cookieParser = require('cookie-parser')


const app = express()
const port = process.env.PORT || 8888
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
dbConnect()
initRoutes(app)

app.use('/', (req, res) => {
    res.send('SERVER ON!!!')
})
app.listen(port, () => {
    console.log(`Server is running on the port: ` + port)
})