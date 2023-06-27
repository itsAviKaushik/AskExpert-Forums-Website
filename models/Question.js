const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: String,
        images: [
            {
                name: {
                    type: String,
                    required: true
                },
                size: {
                    type: Number,
                    required: true
                },
                dateUploaded: {
                    type: Date,
                    default: Date.now()
                }
            }
        ],
        views: {
            type: String,
            default: 0
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        answers: [
            {
                comments: {
                    type: String,
                    required: true
                },
                images: [
                    {
                        name: {
                            type: String,
                            required: true
                        },
                        size: {
                            type: Number,
                            required: true
                        },
                        dateUploaded: {
                            type: Date,
                            default: Date.now()
                        }
                    }
                ],
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true
                },
                dateCommented: {
                    type: Date,
                    default: Date.now()
                }
            }
        ],
        dateAsked: {
            type: Date,
            default: Date.now()
        }
    }
);

module.exports = mongoose.model("question", questionSchema)