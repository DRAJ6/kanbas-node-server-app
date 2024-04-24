import mongoose from "mongoose";
import schema from "./schema.js";

const enrollmentModel = mongoose.model("Enrollments", schema);
export default enrollmentModel;