import mongoose from "mongoose";
import schema from "./schema.js";

const assignmentModel = mongoose.model("Assignments", schema);
export default assignmentModel;