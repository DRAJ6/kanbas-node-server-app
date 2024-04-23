import db from "../Database/index.js";

function AssignmentRoutes(app) {
    // Route that handles an HTTP PUT request with the assignment's ID embedded in the path and that updates in the HTTP body.
    // Parse the assignment's ID from the request parameters, find the assignment in the database, and then update corresponding assignment
    // with values in the request body.
    app.put("/api/assignments/:mid", (req, res) => {
        const { mid } = req.params;
        const assignmentIndex = db.assignments.findIndex((m) => m._id === mid);
        db.assignments[assignmentIndex] = {...db.assignments[assignmentIndex], ...req.body};
        if (!db.assignments) {
            res.status(404).json({ message: `Unable to update assignment with ID ${id}` });
        }
        res.sendStatus(204);
    });

    // Route that handles an HTTP DELETE method with the assignment's ID embedded in the URL.
    // mid request parameter is used to filter out the assignment from the assignments array in the database.
    // Respond with a 200 status signifying success.
    // Return a 404 if the assignment is not found.
    app.delete("/api/assignments/:mid", (req, res) => {
        const { mid } = req.params;
        db.assignments = db.assignments.filter((m) => m._id !== mid);
        if (!db.assignments) {
            res.status(404).json({ message: `Unable to delete assignment with ID ${id}` });
        }
        res.sendStatus(200);
    });
    
    // Route that receives a new assignment posted from the React.js client application embedded in the Request body.
    // Create a new assignment object setting its source property to the cid path parameter and push it to the db.assignments array.
    // Reply to client with the newly created assignment.
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.assignments.push(newAssignment);
        res.send(newAssignment);
    });    

    // Route that retrieves the assignments for the course ID encoded in the path (cid).
    // The course ID is parsed from the path and then used to filter the assignments for that course.
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments.filter((m) => m.course === cid);
        res.send(assignments);
    });
}
export default AssignmentRoutes;