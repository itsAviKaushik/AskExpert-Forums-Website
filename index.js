const express = require("express");
const path = require("path");
const dbConnect = require("./src/dbConnect");
const { signupUser } = require("./controllers/users");
const cookieParser = require("cookie-parser");
const { checkAuthentication, isAuthenticated } = require("./middlewares/auth");
const fileUpload = require("express-fileupload");

require("dotenv").config({
    path: "config/.env"
})

dbConnect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use(checkAuthentication);
app.use(express.static(path.join(__dirname, "/views")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    console.log(req.isAuthenticated);
    const params = {
        isAuthenticated: req.isAuthenticated
    };
    res.render("index", params);
})

app.use("/user", require("./routes/user"))
app.use("/question", require("./routes/question"))
app.use("/answer", require("./routes/answer"))

app.listen(process.env.PORT, () => {
    console.log(`Listening to http://localhost:${process.env.PORT}`);
})