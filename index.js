const express = require("express");
const path = require("path");
const dbConnect = require("./src/dbConnect");
const { signupUser } = require("./controllers/users");
const cookieParser = require("cookie-parser");

require("dotenv").config({
    path: "config/.env"
})

dbConnect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/views")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index")
})

app.use("/user", require("./routes/user"))

app.listen(process.env.PORT, () => {
    console.log(`Listening to http://localhost:${process.env.PORT}`);
})