// const express = require('express')                           // Equivalent to import.
import express from 'express';                                  // Now we can use import syntax instead of require.
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import cors from "cors";                                        // Import cors library.
import ModuleRoutes from './Kanbas/modules/routes.js';
import AssignmentRoutes from './Kanbas/assignments/routes.js';

const app = express();                                          // Create new express instance.
app.use(cors());                                                // Make sure cors is used right after creating the app express instance.
app.use(express.json());                                        // Make sure this statement occurs AFTER setting up CORS. Configure JSON HTTP body parsting first
ModuleRoutes(app);                                              // and then configure new routes.
CourseRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app);

// Use the PORT environment variable if available, or use 4000 otherwise when running local machine.
app.listen(process.env.PORT || 4000);                           // Listen to http://localhost:4000 OR the port declared in an environment variable called PORT available through process.env.PORT.