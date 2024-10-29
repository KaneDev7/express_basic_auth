const mongoose = require('mongoose')

module.exports = connectToDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('database successfuly connect')
    } catch (error) {
        console.log('err to connect')
        console.log('error db', error)
    }
}

