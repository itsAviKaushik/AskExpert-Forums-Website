const User = require("../models/User");
const { sendMail } = require("../src/EmailEngine");
const jwt = require("jsonwebtoken");

exports.signupUser = (req, res) => {
    const params = {
        isAuthenticated: req.isAuthenticated
    };
    res.render("signup", params);
}

exports.createUser = async (req, res) => {
    try {
        console.log(req.body)
        const { password, cpassword, email, userid, firstname, lastname, tandc } = req.body;

        if (tandc !== "on") {
            throw new Error("Please accept the Terms & Conditions!");
        }
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

        const checkUser = await User.findOne({ email: email, emailVerified: true });

        if (checkUser) {
            throw new Error("Email Already Exists!");
        }

        const user = new User({
            email: email,
            username: firstname + " " + lastname,
            userid: userid,
            password: password
        });

        let otp = Math.floor(Math.random().toFixed(5) * 10000000);

        console.log(otp);

        user.otp = otp
        user.otpExpireTime = new Date(Date.now() + 1000 * 60 * 15);

        let message = `Hello ${firstname} ${lastname} <br>
        
        Welcome to our Website, <br>
        ${otp} is you OTP for setting up you account at AskExpert. This otp is valid this 15 mins. <br>

        Ignore this, if this is not done by you. <br>

        Thank You.
        `;

        await sendMail(user.email, "Email Verification", message);

        await user.save();

        res.cookie("validateEmail", user.email, { httpOnly: false });
        res.cookie("validateUserid", user.userid, { httpOnly: false });

        res.redirect("/user/validateOTP");
    } catch (error) {
        res.render("message", { message: error.message })
    }
}

exports.validateOTP = async (req, res, next) => {
    try {
        const params = {
            isAuthenticated: req.isAuthenticated
        };

        if (!req.cookies.validateEmail) {
            throw new Error("Something went wrong!");
        }

        if (!req.body.otp) {
            throw new Error("Please send a valid OTP!");
        }

        const { otp } = req.body;

        const checkUser = await User.findOne({ email: req.cookies.validateEmail, emailVerified: true });

        if (checkUser) {
            throw new Error("Email Already Verified!");
        }

        const user = await User.findOne({ email: req.cookies.validateEmail, userid: req.cookies.validateUserid })

        console.log(user.otpExpireTime);
        console.log(new Date(Date.now()));
        if (user.otp === otp && new Date(Date.now()) <= user.otpExpireTime) {
            user.emailVerified = true;

            await user.save();
            res.render("message", { message: "Account Created Successfully!", ...params })
        }
        else {
            res.render("message", { message: "Invalid OTP", ...params });
        }
    } catch (error) {
        res.render("message", { message: error.message })
    }
};

exports.showOTPForm = async (req, res) => {
    try {
        const params = {
            isAuthenticated: req.isAuthenticated
        };
        console.log(req.cookies);
        res.render("otp", params);
    } catch (error) {
        res.render("message", { message: error.message })
    }
}

exports.renderLogin = (req, res) => {
    const params = {
        isAuthenticated: req.isAuthenticated
    };
    res.render("login", params);
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please enter a valid Email");
        }

        if (!password) {
            throw new Error("Please enter a valid Password");
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            throw new Error("Invalid Credentials!");
        }

        let passwordMatch = await user.comparePassword(password);

        if (passwordMatch) {
            let token = await jwt.sign(user.email, process.env.JWT_SECRET);
            res.cookie("token", token, { httpOnly: false });
            res.redirect("/");
        } else {
            throw new Error("Invalid Credentials!");
        }
    } catch (error) {
        console.log(error.message);
        res.render("message", { message: error.message, isAuthenticated: false })
    }
}

exports.checkUserId = async (req, res) => {
    try {
        const { userid } = req.params;

        const user = await User.find({ userid: userid });

        if (user.length) {
            res.json({
                status: false,
                message: `UserId ${userid} already exists!`
            })
        }
        else {
            res.json({
                status: true,
                message: `UserId ${userid} is available!`
            })
        }
    } catch (error) {
        res.render("message", { message: error.message })
    }
}

exports.logoutUser = (req, res) => {
    try {
        res.cookie("token", null, { expiresIn: Date.now() - 10 });
        res.redirect("/");
    } catch (error) {
        res.render("message", { message: error.message })
    }
}