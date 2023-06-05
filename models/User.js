const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        unique: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    otp: String,
    otpExpireTime: String,
    dateCreated: {
        type: Date,
        default: Date.now()
    }
})