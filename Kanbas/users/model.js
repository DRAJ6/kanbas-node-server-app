import mongoose from "mongoose";
import schema from "./schema.js";

const userModel = mongoose.model("Users", schema);           // Create mongoose model from the schema.
export default userModel;                                    // Export so it can be used elsewhere.