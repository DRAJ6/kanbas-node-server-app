import Database from "../Database/index.js";

function CourseRoutes(app) {
    // Get route that parses the id of course as a path parameter and responds with the corresponding
    // course in the Database's courses array.
    // If the course is not available a status code of 404 is sent back along with a short message in the response.
    // If a course is found, it is sent in the response.
    app.get("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = Database.courses.find((c) => c._id === id);
        if (!course) {
            res.status(404).send("Course not found");
            return;
        }
        res.send(course);
    });    

    // Put route that parses the id of course as a path parameter and updates the corresponding course with the updates in HTTP
    // request body. Database's courses array is updated with new version of corresponding course.
    // Successful status 204 is sent back as the response.
    app.put("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = req.body;
        Database.courses = Database.courses.map((c) => c._id === id ? { ...c, ...course } : c);
        res.sendStatus(204);
    });
    
    // Delete route that parses the id of course as a path parameter and removes the corresponding course
    // from the Database's courses array. Status 204 is sent back as the response.
    app.delete("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        Database.courses = Database.courses.filter((c) => c._id !== id);
        res.sendStatus(204);
    });    

    // Route that creates a new course and adds it to the Database.
    // New course is passed into the HTTP body from the client and is appended to the end of the courses array in the Dashboard.
    // New course is given a new unique identifier and sent back to the client in the response.
    app.post("/api/courses", (req, res) => {
        const course = { ...req.body, _id: new Date().getTime().toString() };
        Database.courses.push(course);
        res.send(course);
    });

    // Route that makes courses available at http://localhost:4000/api/courses.
    app.get("/api/courses", (req, res) => {
        const courses = Database.courses;
        res.send(courses);
    });
}
export default CourseRoutes;