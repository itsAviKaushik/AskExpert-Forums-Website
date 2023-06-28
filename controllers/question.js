const Question = require("../models/Question");
const { upload } = require("../src/fileUploader");
const path = require("path");

exports.renderQuestion = async (req, res) => {
    const params = {
        isAuthenticated: req.isAuthenticated
    }
    res.render("addQuestions", params);
}

exports.createQuestion = async (req, res) => {
    try {
        const { questionTitle, questionDesc } = req.body;

        if (!questionTitle) throw new Error("Please enter a valid Question");

        const question = new Question({
            title: questionTitle,
            description: questionDesc,
        });

        let images = [];

        console.log(req.files);

        if (req.files?.images) {
            if (Array.isArray(req.files.images)) {
                // Array Code

                let i = 0;
                for (i = 0; i < req.files.images.length; i++) {
                    let result = await upload(req.files.images[i], path.join(__dirname, "../views/images/questions"), `${question._id}${i}`);
                    images.push(result);
                }
            } else {
                let result = await upload(req.files.images, path.join(__dirname, "../views/images/questions"), question._id);
                // Object Code
                images.push(result);
            }
        }

        question.images = images;
        question.user = req.user;

        await question.save();

        res.render("message", { isAuthenticated: true, message: "Discussion Started Successfully!" })
    } catch (error) {
        res.render("message", { isAuthenticated: true, message: error.message })
    }
}