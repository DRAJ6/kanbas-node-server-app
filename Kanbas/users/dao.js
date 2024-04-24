import userModel from "./model.js";

// CRUD.
export const createUser = (user) => userModel.create(user);

export const fetchUsersForGrades = (userIdArray) => userModel.find({ _id: { $in: userIdArray } });;

export const findAllUsers = () => userModel.find();

export const findUserById = (userId) => userModel.findById(userId);

export const updateUser = (userId, user) =>  userModel.updateOne({ _id: userId }, { $set: user });

export const deleteUser = (userId) => userModel.deleteOne({ _id: userId });

export const findUserByEmail = (email) => userModel.findOne({email});

export const findUserByUsername = (username) =>  userModel.findOne({ username: username });

export const findUserByCredentials = (username, password) =>  userModel.findOne({ username: username, password: password });

export const findUsersByRole = (role) => userModel.find({ role: role });