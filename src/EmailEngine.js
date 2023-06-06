const nodemailer = require("nodemailer");

exports.sendMail = async (email, subject, message)=> {
    const transport = await nodemailer.createTransport({
        smtp: "smtp.gmail.com",
        user: {
            email: "avichalkaushik007@gmail.com",
            pass: process.env.EMAIL_PASSWORD
        }
    })

    await transport.sendMail({
        email: email,
        subject: subject,
        html: message
    })

    return true;
}