import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
    _id: String,
    student: String,
    assignment: String,
    grade: String
}, { collection: "grades" });
export default gradeSchema;