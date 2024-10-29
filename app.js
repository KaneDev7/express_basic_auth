const express = require('express')
const port = process.env.PORT || 3000
const connecToDb = require('./configs/db')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth.route')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')

dotenv.config()
const app = express()

// middleware
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

// routes
app.use('/api/auth', authRoute)
connecToDb()

app.listen(port, (err) => {
    if (!err) console.log('server run in port ' + port)
})