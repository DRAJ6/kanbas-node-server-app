import mongoose from "mongoose";
import schema from "./schema.js";

const moduleModel = mongoose.model("Modules", schema);
export default moduleModel;