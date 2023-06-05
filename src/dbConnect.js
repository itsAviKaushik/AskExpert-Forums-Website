const mongoose = require("mongoose");

async function dbConnect() {
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017/askexpert");
        console.log("Database Connected!");
    } catch (error) {
        console.log("Error Connecting Database!");
        console.log("Error Message: ", error.message);
    }
}

module.exports = dbConnect;