const User = require("./user")
// read all users
const getAllUsersDB = async(page,perPage) => {
    return User.find()
    .skip((page - 1) * perPage)
    .limit(perPage)
}
// read only one user
const getUserByIdDB = async(users) => {
    return User.find({
        _id:{$in:users}
    });
};
// add  new User 
const insertUserDB = async(user) => {
    const newUser = new User(user);
    await newUser.save();
    return newUser;
};
// delete user
const deleteUserDB = async(_id) => {
    return User.findByIdAndDelete(_id)
};
// modify user
const updateUserDB = async(_id, data) => {
    return User.findByIdAndUpdate(_id, data, {new:true})
};
// calculate total number of products
const countDocuUserDB = async() => {
    return User.countDocuments()
};
module.exports = {
    getUserByIdDB,
    getAllUsersDB,
    insertUserDB,
    deleteUserDB,
    updateUserDB,
    countDocuUserDB
}