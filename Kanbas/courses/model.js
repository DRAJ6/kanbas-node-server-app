import mongoose from "mongoose";
import schema from "./schema.js";

// Once you give a model a name (ex. Courses), it is unique.
const courseModel = mongoose.model("Courses", schema);

// Export the model and use it to implement all the CRUD operations that we need.
// Wrap all the low level functions that are very idiosyncratic about that specific Mongo vender.
// We want to have a higher level API that is more specific to our needs (what we want to do).
// For that we need to implement the dao.
export default courseModel;