const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME,
    })
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Connection error:', err));
}

module.exports = connectDB;