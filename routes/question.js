const { renderQuestion, createQuestion, getAllQuestions, fetchQuestion } = require("../controllers/question");
const { isAuthenticated } = require("../middlewares/auth");

const router = require("express").Router();

router.get("/", getAllQuestions);

router.get("/ask", isAuthenticated, renderQuestion);

router.post("/ask", isAuthenticated, createQuestion);

router.get("/:id", isAuthenticated, fetchQuestion);

module.exports = router;