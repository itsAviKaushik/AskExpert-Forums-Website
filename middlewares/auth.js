const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.checkAuthentication = async (req, res, next) => {
    const { token } = req.cookies;

    try {
        const email = await jwt.verify(token, process.env.JWT_SECRET);

        req.isAuthenticated = true;
        
        next();
    } catch (error) {
        req.isAuthenticated = false;

        next();
    }
}

exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    try {
        const email = await jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ email: email, emailVerified: true });

        if (!user) {
            res.render("message", { message: "Please login to continue", isAuthenticated: false })
        }
        
        req.user = user;
        next();
    } catch (error) {
        req.isAuthenticated = false;
        res.render("message", { message: "Please login to continue", isAuthenticated: false })
    }
}