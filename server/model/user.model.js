const mongoose = require("mongoose");
// Recall how exports work in Node.js?
const UserSchema = require('./user.schema');

const UserModel = mongoose.model("User", UserSchema);

function addUser(user) {
    return UserModel.create(user);
}

function getUserByUserName(username) {
    return UserModel.findOne({username: username}).exec();
}

function getAllUsers() {
    return UserModel.find().exec();
}

async function updateUserByUsername(usernameToUpdate, newValues) {
    await UserModel.updateOne({username: usernameToUpdate}, newValues).exec();
    return UserModel.findOne({username: usernameToUpdate}).exec();
}

// Make sure to export a function after you create it!
module.exports = {
    addUser,
    getUserByUserName,
    getAllUsers,
    updateUserByUsername
};