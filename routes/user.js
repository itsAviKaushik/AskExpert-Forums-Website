const router = require("express").Router();
const { signupUser, createUser } = require("../controllers/users");

router.get("/", signupUser);

router.post("/", createUser);

module.exports = router;