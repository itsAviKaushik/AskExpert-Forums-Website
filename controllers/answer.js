const Question = require("../models/Question");
const { upload } = require("../src/fileUploader");
const path = require("path");

exports.addAnAnswer = async (req, res) => {
    const params = {
        isAuthenticated: req.isAuthenticated
    }
    try {
        const { id, images, comment } = req.body;

        const question = await Question.findById(id);

        const obj = {
            comment: comment,
            user: req.user
        }

        let imagesAnswer = [];

        console.log(req.files);

        if (req.files?.images) {
            if (Array.isArray(req.files.images)) {
                // Array Code

                let i = 0;
                for (i = 0; i < req.files.images.length; i++) {
                    let result = await upload(req.files.images[i], path.join(__dirname, "../views/images/answers"), `${question._id}${i}`);
                    imagesAnswer.push(result);
                }
            } else {
                let result = await upload(req.files.images, path.join(__dirname, "../views/images/answers"), question._id);
                // Object Code
                imagesAnswer.push(result);
            }
        }

        obj.images = imagesAnswer;

        question.answers.push(obj);

        await question.save();

        res.render("message", { ...params, message: "Comment saved Successfully!" });
    } catch (error) {
        res.render("message", { ...params, message: error.message });
    }
}