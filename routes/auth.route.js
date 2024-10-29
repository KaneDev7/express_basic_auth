const express = require('express')
const {
    registerController,
    signInController,
    logOutController,
    getUserAuthController }  = require('../controllers/auth.controller')
const checkSession = require('../middlewares/checkSession')

const authRoute = express.Router()

authRoute.post('/user/register', registerController)
authRoute.post('/user/signin', signInController)
authRoute.get('/user/logout', logOutController)
authRoute.get('/user/session', checkSession, getUserAuthController)

module.exports = authRoute