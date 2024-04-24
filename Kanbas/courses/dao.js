import courseModel from "./model.js";

// CRUD.
// dao shields rest of application from idiosyncrasies from any vender (ex. Mongo) we choose.
// If we swap vendors, we just have to change the dao.

export const createCourse = (course) => {
    return courseModel.create(course);
};

// What courseModel.find returns is not the actual courses. It returns a promise that
// you can then register and then it calls you back.
export const findAllCourses = () => {
    return courseModel.find();
};

export const findCourseById = (courseId) => {
    return courseModel.findById(courseId);
};

// $set operator patterns matches fields and replaces with new value.
// $set automatically looks for the fields in the new object and compare them
// against the records with the same property and will swap out the values.
export const updateCourse = (courseId, course) => {
    return courseModel.updateOne({_id: courseId}, {$set: course});
};

export const deleteCourse = (courseId) => {
    return courseModel.deleteOne({_id: courseId});
};

// Find alist of courses given a list of courseIds.
export const findListOfCourses = (courseIds) => {
    return courseModel.find({ _id: { $in: courseIds } });
};