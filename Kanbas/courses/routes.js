import * as dao from "./dao.js";

function CourseRoutes(app) {
    // Route that makes courses available at http://localhost:4000/api/courses.
    // We are using the dao to retrieve findAllCourses. Saving it to a local variables
    // and responding with courses. The communication between the browser and the 
    // Node.js server is an asynchronous communication. axios.get does not get the information
    // right away -- it gives you a promise instead. You can use the async await syntax.
    // The communication between the server and the database is also asynchronous, hence
    // why we use await before dao and declare the function as async.
    const findAllCourses = async (req, res) => {
        try {
            const courses = await dao.findAllCourses();
            res.send(courses);
            return;
        } catch (e) {
            console.log("Error getting all the courses: " + e);
            res.status(400).send("Error getting all the courses");
        }
    };

    // Get route that parses the id of course as a path parameter and responds with the corresponding
    // course in the Database's courses array.
    // If the course is not available a status code of 404 is sent back along with a short message in the response.
    // If a course is found, it is sent in the response.
    const findCourseById = async (req, res) => {
        try {
            const courseId = req.params.courseId;
            const course = await dao.findCourseById(courseId);
            res.send(course);
        } catch (e) {
            console.log("Error getting a course: " + e);
            res.status(400).send("Error getting a course");
        }
    };

    // Route that creates a new course and adds it to the Database.
    // New course is passed into the HTTP body from the client and is appended to the end of the courses array in the Dashboard.
    // New course is given a new unique identifier and sent back to the client in the response.
    const createCourse = async (req, res) => {
        try {
            const course = req.body;
            // Get rid of id, to avoid error.
            delete course._id;
            const newCourse = await dao.createCourse(course);
            res.json(newCourse);
        } catch (e) {
            console.log("Error adding course: " + e);
            res.status(400).send("Error adding course");
        }
    };

    // Put route that parses the id of course as a path parameter and updates the corresponding course with the updates in HTTP
    // request body. Database's courses array is updated with new version of corresponding course.
    // Successful status 204 is sent back as the response.
    const updateCourse = async (req, res) => {
        try {
            const id = req.params.id;
            const course = req.body;
            // Get rid of id, to avoid error.
            delete course._id;

            const status = await dao.updateCourse(id, course);
            res.json(status);
        } catch (e) {
            console.log("Error updating a course: " + e);
            res.status(400).send("Error updating course");
        }
    };

    // Delete route that parses the id of course as a path parameter and removes the corresponding course
    // from the Database's courses array. Status 204 is sent back as the response.
    const deleteCourse = async (req, res) => {
        try {
            const id = req.params.id;
            const status = await dao.deleteCourse(id);
            res.send(status);
        } catch (e) {
            console.log("Error deleting a course: " + e);
            res.status(400).send("Error deleting course");
        }
    };

    const findListOfCourses = async (req, res) => {
        try {
            const courseIds = req.query.courseIds || req.body.courseIds;
            if (!courseIds || !Array.isArray(courseIds)) {
                return res.status(400).send("Course IDs must be provided as an array.");
            }
    
            // Find courses based on the provided course IDs.
            const courses = await dao.findListOfCourses(courseIds);
    
            res.json(courses);
        } catch (e) {
            console.log("Error finding the list of courses: " + e);
            res.status(400).send("Error finding the list of course");
        }
    };

    app.get("/api/courses", findAllCourses);
    app.get("/api/courses/:courseId", findCourseById); 
    app.post("/api/courses", createCourse);
    app.put("/api/courses/:id", updateCourse);
    app.delete("/api/courses/:id", deleteCourse);  
    app.get("/api/coursesList", findListOfCourses);  
}
export default CourseRoutes;