import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    _id: String,
    name: String,
    description: String,
    module: String
});

const moduleSchema = new mongoose.Schema({
    _id: String,
    name: String,
    description: String,
    course: String,
    lessons: {
        type: [lessonSchema],
        required: false
    }
}, { collection: "modules" });
export default moduleSchema;