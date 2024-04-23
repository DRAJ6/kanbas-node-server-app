import assignmentModel from "./model.js";

export const createAssignment = (assignment) => {
    console.log("IN DAO. assignment = " + JSON.stringify(assignment));
    return assignmentModel.create(assignment);
};

export const findAssignmentsForCourse = (courseId) => {
    const assigments = assignmentModel.find({ course: courseId});
    return assigments;
};

export const findAssignmentById = (assignmentId) => {
    return assignmentModel.findById(assignmentId);
};

export const updateAssignment = (assignmentId, assignment) => {
    console.log("IN DAO. assignmentId = " + assignmentId);
    console.log("IN DAO. assignment = " + JSON.stringify(assignment));
    return assignmentModel.updateOne({_id: assignmentId}, {$set: assignment});
};

export const deleteAssignment = (assignmentId) => {
    console.log("IN DAO. deleteAssignment. assignmentId = " + assignmentId);
    return assignmentModel.deleteOne({_id: assignmentId});
};