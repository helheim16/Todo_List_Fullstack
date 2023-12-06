const mongoose = require("mongoose");

const MONGODB_URL = "mongodb://127.0.0.1:27017";

const db = async () => {
    try {
        const con = await mongoose.connect(MONGODB_URL);
        console.log(`connected to mongodb: ${con.connection.host}`);
    } catch (error) {
        console.error(error);   
    }
}

module.exports = db;
