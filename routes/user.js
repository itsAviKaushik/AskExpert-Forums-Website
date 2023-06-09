const router = require("express").Router();
const { signupUser, createUser, validateOTP, showOTPForm, renderLogin, loginUser, checkUserId, logoutUser } = require("../controllers/users");

router.get("/signup", signupUser);

router.get("/login", renderLogin);

router.post("/login", loginUser);

router.post("/signup", createUser);

router.get("/validateOTP", showOTPForm);

router.post("/validateOTP", validateOTP);

router.get("/checkUserId/:userid", checkUserId);

router.get("/logout", logoutUser);

module.exports = router;