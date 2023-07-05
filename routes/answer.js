const { addAnAnswer } = require("../controllers/answer");
const { isAuthenticated } = require("../middlewares/auth");

const router =require("express").Router();

router.post("/save", isAuthenticated, addAnAnswer);

module.exports = router;