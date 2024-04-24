import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
    _id: String,
    user: String,
    course: String
}, { collection: "enrollments" });
export default enrollmentSchema;