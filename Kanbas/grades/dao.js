import gradeModel from "./model.js";

export const createGrade = (grade) => {
    return gradeModel.create(grade);
};

export const findGradesForMultipleAssignments = (assignmentIds) => {
    return gradeModel.find({ assignment: { $in: assignmentIds } });
};

export const findGradesForAssignment = (assignmentId) => {
    const grades = gradeModel.find({ assignment: assignmentId});
    return grades;
};

export const findGradeById = (gradeId) => {
    return gradeModel.findById(gradeId);
};

export const findGradesByStudent = (studentId) => {
    return gradeModel.find({ student: studentId});
}

export const updateGrade = (gradeId, grade) => {
    return gradeModel.updateOne({_id: gradeId}, {$set: grade});
};

export const deleteGrade = (gradeId) => {
    return gradeModel.deleteOne({_id: gradeId});
};