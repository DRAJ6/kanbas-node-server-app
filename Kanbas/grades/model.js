import mongoose from "mongoose";
import schema from "./schema.js";

const gradeModel = mongoose.model("Grades", schema);
export default gradeModel;