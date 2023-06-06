const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        const pass = await bcrypt.hash(this.password, 10);
        this.password = pass;
        next();
    }
    next();
})

module.exports = mongoose.model("user", userSchema);