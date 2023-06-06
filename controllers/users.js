const User = require("../models/User");
const { sendMail } = require("../src/EmailEngine");

exports.signupUser = (req, res) => {
    res.render("signup")
}

exports.createUser = async (req, res) => {
    try {
        const { password, cpassword, email, userid, firstname, lastname } = req.body;

        if (!password) {
            throw new Error("Please enter a valid Password!");
        }
        if (!email) {
            throw new Error("Please enter a valid Email!");
        }
        if (!firstname) {
            throw new Error("Please enter a valid Firstname!");
        }
        if (!lastname) {
            throw new Error("Please enter a valid Lastname!");
        }
        if (!userid) {
            throw new Error("Please enter a valid Userid!");
        }

        if (password !== cpassword) {
            throw new Error("Password doesn't Match!");
        }
    
        const user = new User({
            email: email,
            username: firstname + " " + lastname,
            userid: userid,
            password: password
        });

        let otp = Math.floor(Math.random().toFixed(6) * 10000000);

        console.log(otp);

        user.otp = otp
        user.otpExpireTime = new Date(Date.now() + 1000 * 60 * 15);

        let message = `Hello ${firstname} ${lastname}
        
        Welcome to our Website,
        ${otp} is you OTP for setting up you account at AskExpert. This otp is valid this 15 mins.

        Ignore this, if this is not done by you.

        Thank You.
        `;

        await sendMail(user.email, "Email Verification", message);
        
        await user.save();

        res.render("signup")
    } catch (error) {
        res.render("message", { message: error.message })
    }
}
