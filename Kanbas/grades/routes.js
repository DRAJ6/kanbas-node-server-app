import * as dao from "./dao.js";
import * as assignmentDao from "../assignments/dao.js";

function GradeRoutes(app) {
    const findGradesForCourse = async (req, res) => {
        try {
            const cid = req.params.cid;
            console.log("find grades for course. cid = " + cid);
            if (!cid) {
                return res.status(400).json({ error: "Course id is required" });
            }

            // Find all assignments belonging to the given course.
            const assignments = await assignmentDao.findAssignmentsForCourse(cid);

            // Get the ids of these assignments.
            const assignmentIds = assignments.map(assignment => assignment._id);

            const grades = await dao.findGradesForMultipleAssignments(assignmentIds);
            console.log("find grades for course. grades = " + grades);
            res.status(200).json( {grades} );
        } catch (e) {
            console.log("Error getting all the grades for course: " + e);
            res.status(400).send("Error getting all the grades for course");
        }
    };

    const findGradesForAssignment = async (req, res) => {
        try {
            const assignmentId = req.params.assignmentId;
            if (!assignmentId) {
                return res.status(400).json({ error: "Assignment id is required" });
            }

            const grades = await dao.findGradesForAssignment(assignmentId);
            res.status(200).json( {grades} );
        } catch (e) {
            console.log("Error getting all the grades: " + e);
            res.status(400).send("Error getting all the grades");
        }
    };

    const findGradeById = async (req, res) => {
        try {
            const gradeId = req.params.gradeId;
            if (!gradeId) {
                return res.status(400).json({ error: "Grade id is required" });
            }

            const grade = await dao.findGradeById(gradeId);
            if (!grade) {
                return res.status(404).json({ error: "Grade not found" });
            }

            res.status(200).json({ grade });
        } catch (e) {
            console.log("Error getting a grade: " + e);
            res.status(400).send("Error getting a grade");
        }
    };

    const findGradesByStudent = async (req, res) => {
        try {
            const studentId = req.params.studentId;
            if (!studentId) {
                return res.status(400).json({ error: "Student id is required" });
            }

            const grade = await dao.findGradesByStudent(studentId);
            if (!grade) {
                return res.status(404).json({ error: "Grade not found" });
            }

            res.status(200).json({ grade });
        } catch (e) {
            console.log("Error getting a grade for student: " + e);
            res.status(400).send("Error getting a grade for student");
        }
    };

    const createGrade = async (req, res) => {
        const { cid } = req.params;
        const grade = req.body;
        // Get rid of id, to avoid error.
        delete grade._id;
        const newGrade = await dao.createGrade(grade);
        res.send(newGrade);
    };

    const updateGrade = async (req, res) => {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ error: "Grade id is required" });
            }
    
            const grade = req.body;
            if (!grade) {
                return res.status(400).json({ error: "Updated grade data is required" });
            }
            // Get rid of id, to avoid error.
            delete grade._id;
    
            const status = await dao.updateGrade(id, grade);
            res.json(status);
        } catch (e) {
            console.log("Error updating a grade: " + e);
            res.status(400).send("Error updating grade");
        }
    };

    const deleteGrade = async (req, res) => {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ error: "Grade id is required" });
            }

            const status = await dao.deleteGrade(id);
            res.send(status);
        } catch (e) {
            console.log("Error deleting a grade: " + e);
            res.status(400).send("Error deleting grade");
        }
    };

    app.get("/api/courses/:cid/grades", findGradesForCourse);
    app.get("/api/courses/:cid/assignments/:assignmentId/grades", findGradesForAssignment);
    app.get("/api/courses/:cid/assignments/:assignmentId/grades/:gradeId", findGradeById);
    app.get("/api/grades/:studentId", findGradesByStudent);
    app.post("/api/courses/:cid/assignments/:assignmentId/grades", createGrade); 
    app.put("/api/grades/:id", updateGrade);
    app.delete("/api/grades/:id", deleteGrade);  
}
export default GradeRoutes;