import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    _id: String,
    title: String,
    subtitle: String,
    description: String,
    dueDate: Date,
    availableFromDate: Date,
    untilDate: Date,
    points: String,
    course: String
}, { collection: "assignments" });
export default assignmentSchema;