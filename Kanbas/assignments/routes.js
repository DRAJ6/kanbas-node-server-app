import * as dao from "./dao.js";

function AssignmentRoutes(app) {
    // Route that retrieves the assignments for the course ID encoded in the path (cid).
    // The course ID is parsed from the path and then used to filter the assignments for that course.
    const findAssignmentsForCourse = async (req, res) => {
        try {
            // Extract the course id from the request parameters.
            const courseId = req.params.cid;
            
            // Check if courseId is provided.
            if (!courseId) {
                return res.status(400).json({ error: "Course id is required" });
            }

            // Call the dao function to find all assignments for the specified course.
            const assignments = await dao.findAssignmentsForCourse(courseId);

            // Respond with the found assignments.
            res.status(200).json( {assignments} );
        } catch (e) {
            console.log("Error getting all the assignments: " + e);
            res.status(400).send("Error getting all the assignments");
        }
    };

    const findAssignmentById = async (req, res) => {
        try {
            // Extract the assigment id from the request parameters.
            const assignmentId = req.params.assignmentId;

            // Check if assignmentId is provided.
            if (!assignmentId) {
                return res.status(400).json({ error: "Assignment id is required" });
            }

            // Call the dao function to find assignment.
            const assignment = await dao.findAssignmentById(assignmentId);
            
            // Check if the assignment exists.
            if (!assignment) {
                return res.status(404).json({ error: "Assignment not found" });
            }

            // Respond with the found assignment.
            res.status(200).json({ assignment });
        } catch (e) {
            console.log("Error getting an assignment: " + e);
            res.status(400).send("Error getting an assignment");
        }
    };

    // Route that receives a new assignment posted from the React.js client application embedded in the Request body.
    // Create a new assignment object setting its source property to the cid path parameter and push it to the db.assignments array.
    // Reply to client with the newly created assignment.
    const createAssignment = async (req, res) => {
        const { cid } = req.params;
        const assigment = req.body;
        // Get rid of id, to avoid error.
        delete assigment._id;
        const newAssignment = await dao.createAssignment(assigment);
        res.send(newAssignment);
    };

    // Route that handles an HTTP PUT request with the assignment's ID embedded in the path and that updates in the HTTP body.
    // Parse the assignment's ID from the request parameters, find the assignment in the database, and then update corresponding assignment
    // with values in the request body.
    const updateAssignment = async (req, res) => {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ error: "Assignment id is required" });
            }
    
            const assigment = req.body;
            if (!assigment) {
                return res.status(400).json({ error: "Updated assignment data is required" });
            }
            // Get rid of id, to avoid error.
            delete assigment._id;
    
            const status = await dao.updateAssignment(id, assigment);
            res.json(status);
        } catch (e) {
            console.log("Error updating an assignment: " + e);
            res.status(400).send("Error updating assignment");
        }
    };

    // Route that handles an HTTP DELETE method with the assignment's ID embedded in the URL.
    // id request parameter is used to filter out the assignment from the assignments array in the database.
    // Respond with a 200 status signifying success.
    // Return a 404 if the assignment is not found.
    const deleteAssignment = async (req, res) => {
        console.log("in ROUTES.JS. deleteAssignment.");
        try {
            const id = req.params.id;
            console.log("id of assignment to delete = " + id);
            if (!id) {
                return res.status(400).json({ error: "Assignment id is required" });
            }

            const status = await dao.deleteAssignment(id);
            console.log("status = " + JSON.stringify(status));
            res.send(status);
        } catch (e) {
            console.log("Error deleting an assignment: " + e);
            res.status(400).send("Error deleting assignment");
        }
    };
    
    app.get("/api/courses/:cid/assignments", findAssignmentsForCourse);
    app.get("/api/courses/:cid/assignments/:assignmentId", findAssignmentById)
    app.post("/api/courses/:cid/assignments", createAssignment); 
    app.put("/api/assignments/:id", updateAssignment);
    app.delete("/api/assignments/:id", deleteAssignment);  
}
export default AssignmentRoutes;