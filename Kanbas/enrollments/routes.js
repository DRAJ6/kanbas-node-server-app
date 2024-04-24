import * as dao from "./dao.js";

function EnrollmentRoutes(app) {
    const findEnrollmentsForCourse = async (req, res) => {
        try {
            const courseId = req.params.cid;
            if (!courseId) {
                return res.status(400).json({ error: "Course id is required" });
            }

            const enrollments = await dao.findEnrollmentsForCourse(courseId);
            res.status(200).json( {enrollments} );
        } catch (e) {
            console.log("Error getting all the enrollments: " + e);
            res.status(400).send("Error getting all the enrollments");
        }
    };

    const findEnrollmentById = async (req, res) => {
        try {
            const enrollmentId = req.params.enrollmentId;
            if (!enrollmentId) {
                return res.status(400).json({ error: "Enrollment id is required" });
            }

            const enrollment = await dao.findEnrollmentById(enrollmentId);
            if (!enrollment) {
                return res.status(404).json({ error: "Enrollment not found" });
            }

            res.status(200).json({ enrollment });
        } catch (e) {
            console.log("Error getting an enrollment: " + e);
            res.status(400).send("Error getting an enrollment");
        }
    };

    const createEnrollment = async (req, res) => {
        try {
            console.log("in createEnrollment!!!!!!!!!");
            const { cid } = req.params;
            const enrollment = req.body;
            // Get rid of id, to avoid error.
            delete enrollment._id;
            console.log("CREATE ENROLLMENT. cid = " + cid + ", enrollment = " + JSON.stringify(enrollment));
            const newEnrollment = await dao.createEnrollment(enrollment);
            console.log("newEnrollment = " + JSON.stringify(newEnrollment));
            res.send(newEnrollment);
        } catch (e) {
            console.log("Error creating an enrollment: " + e);
            res.status(400).send("Error creating an enrollment");
        }
    };

    const updateEnrollment = async (req, res) => {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ error: "Enrollment id is required" });
            }
    
            const enrollment = req.body;
            if (!enrollment) {
                return res.status(400).json({ error: "Updated enrollment data is required" });
            }
            // Get rid of id, to avoid error.
            delete enrollment._id;
    
            const status = await dao.updateEnrollment(id, enrollment);
            res.json(status);
        } catch (e) {
            console.log("Error updating an enrollment: " + e);
            res.status(400).send("Error updating enrollment");
        }
    };

    const deleteEnrollment = async (req, res) => {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ error: "Enrollment id is required" });
            }

            const status = await dao.deleteEnrollment(id);
            res.send(status);
        } catch (e) {
            console.log("Error deleting an enrollment: " + e);
            res.status(400).send("Error deleting enrollment");
        }
    };

    const findAllEnrollments = async (req, res) => {
        try {
            const enrollments = await dao.findAllEnrollments();
            res.send(enrollments);
            return;
        } catch (e) {
            console.log("Error getting all the enrollments: " + e);
            res.status(400).send("Error getting all the enrollments");
        }
    };

    const findAllEnrollmentsForUser = async (req, res) => {
        try {
            const userId = req.params.userId;
            const enrollments = await dao.findAllEnrollmentsForUser(userId);
            res.set(enrollments);
            return;
        } catch (e) {
            console.error('Error finding enrollments for user:', e);
            res.status(400).send("Error getting all the enrollments for user");
        }
    };

    const deleteAllEnrollmentsForCourse = async (req, res) => {
        try {
            const cid = req.params.cid;
            if (!cid) {
                return res.status(400).json({ error: "Course id is required" });
            }

            const status = await dao.deleteAllEnrollmentsForCourse(cid);
            res.json(status);
        } catch (e) {
            console.log("Error deleting all enrollments for course: " + e);
            res.status(400).send("Error deleting all enrollments for course");
        }
    };

    app.get("/api/courses/:cid/enrollments", findEnrollmentsForCourse);
    app.get("/api/courses/:cid/enrollments/:enrollmentId", findEnrollmentById)
    app.post("/api/courses/:cid/enrollments", createEnrollment); 
    app.put("/api/enrollments/:id", updateEnrollment);
    app.delete("/api/enrollments/:id", deleteEnrollment);
    app.get("/api/enrollments", findAllEnrollments);
    app.get("/api/enrollments/user/:userId", findAllEnrollmentsForUser);
    app.delete("/api/courses/:cid/enrollments", deleteAllEnrollmentsForCourse);
}
export default EnrollmentRoutes;