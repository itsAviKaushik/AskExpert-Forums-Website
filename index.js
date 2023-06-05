const express = require("express");
const path = require("path");
const dbConnect = require("./src/dbConnect");

require("dotenv").config({
    path: "config/.env"
})

dbConnect();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "/views")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

app.post("/signup", (req, res) => {
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

        res.render("signup")
    } catch (error) {
        res.render("message", { message: error.message })
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Listening to http://localhost:${process.env.PORT}`);
})