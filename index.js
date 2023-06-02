const express = require("express");
const path = require("path");

require("dotenv").config({
    path: "config/.env"
})

const app = express();

app.use(express.static(path.join(__dirname, "/views")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index")
})

app.listen(process.env.PORT, () => {
    console.log(`Listening to http://localhost:${process.env.PORT}`);
})