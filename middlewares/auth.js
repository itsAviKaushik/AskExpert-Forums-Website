const jwt = require("jsonwebtoken");

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