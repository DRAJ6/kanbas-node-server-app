import mongoose from "mongoose";

const userSchema = new mongoose.Schema({            // Creat the schema.
    _id: String,
    username: {                                     // String field that is required and unique.
        type: String, 
        required: true, 
        unique: true 
    },
    password: {                                     // String field that is required but not unique.
        type: String, 
        required: true 
    },
    // likesAlbums: [
    //     { ref: "Albums", type: mongoose.Schema.Types.ObjectId}
    // ],
    firstName: String,                              // String fields
    email: String,                                  // with no additional
    lastName: String,                               // configurations.
    dob: Date,                                      // Date field with no configurations.
    role: {
        type: String,                                   // String field
        enum: ["STUDENT", "FACULTY", "ADMIN", "USER"],  // allowed string values
        default: "USER"                                 // default value if not provided.
    }
}, { collection: "users" });                         // Store data in "users" collection.
export default userSchema;