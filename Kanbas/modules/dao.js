import moduleModel from "./model.js";

export const createModule = (module) => {
    return moduleModel.create(module);
};

export const findModulesForCourse = (courseId) => {
    return moduleModel.find({ course: courseId});
};

export const findModuleById = (moduleId) => {
    return moduleModel.findById(moduleId);
};

export const updateModule = (moduleId, module) => {
    return moduleModel.updateOne({_id: moduleId}, {$set: module});
};

export const deleteModule = (moduleId) => {
    return moduleModel.deleteOne({_id: moduleId});
};