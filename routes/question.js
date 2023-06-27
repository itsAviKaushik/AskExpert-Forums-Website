const { renderQuestion, createQuestion } = require("../controllers/question");

const router = require("express").Router();

router.get("/ask", renderQuestion);

router.post("/ask", createQuestion);

module.exports = router;