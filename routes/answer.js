const { addAnAnswer, deleteAnswer } = require("../controllers/answer");
const { isAuthenticated } = require("../middlewares/auth");

const router =require("express").Router();

router.post("/save", isAuthenticated, addAnAnswer);

router.get("/delete/:answerId/:questionId", isAuthenticated, deleteAnswer);

module.exports = router;