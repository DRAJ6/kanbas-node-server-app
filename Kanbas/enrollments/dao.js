import enrollmentModel from "./model.js";

export const createEnrollment = (enrollment) => {
    console.log("DAO. ENROLLMENT!!!");
    return enrollmentModel.create(enrollment);
};

export const findEnrollmentsForCourse = (courseId) => {
    const enrollments = enrollmentModel.find({ course: courseId});
    return enrollments;
};

export const findEnrollmentById = (enrollmentId) => {
    return enrollmentModel.findById(enrollmentId);
};

export const updateEnrollment = (enrollmentId, enrollment) => {
    return enrollmentModel.updateOne({_id: enrollmentId}, {$set: enrollment});
};

export const deleteEnrollment = (enrollmentId) => {
    return enrollmentModel.deleteOne({_id: enrollmentId});
};

export const findAllEnrollments = () => {
    return enrollmentModel.find();
};

export const findAllEnrollmentsForUser = (userId) => {
    return enrollmentModel.find({ user: userId });
};

export const deleteAllEnrollmentsForCourse = (courseId) => {
    return enrollmentModel.deleteMany({ course: courseId });
};