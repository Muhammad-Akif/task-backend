const mongoose = require('mongoose')

const connectDB = async () => {
    try {        
        const connection = await mongoose.connect(process.env.MONGO_URI)
        // connection.then(() => console.log(`connected db`)).catch("unable to connect db")
        console.log(`connected Mongodb : ${connection.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB