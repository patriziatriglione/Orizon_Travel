const  mongoose = require("mongoose");
const User = require ("../models/user")
const httpStatus = require ("http-status-codes")
const validator = require('validator');
// read all users 
const getAllUsers = async (req, res) => {
   try {
        const users = await User.find()
        res.status(httpStatus.OK).json({
            success: true,
            data: users
        })
    } catch(error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}
// read only one user
const getUserById = async (req, res) => {
    const {id = _id} = req.params;
    try {
        const user = await User.findById(id)
        res.status(httpStatus.OK).json({
            success: true,
            data: user
        })
    } catch(error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message:error.message
        })
    }
}
// add new User
const insertUser = async (req, res) => {
    const user = new User (req.body)
    if (!validator.isEmail(user.email)) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: "invalid email format"
        });
    }
    try {
        await user.save()
        res.status(httpStatus.CREATED).json({
            success: true,
            data: user
        })
    } catch(error) {
        res.status(httpStatus.CONFLICT).json({
            success: false,
            message: error.message
        })
    }
}
// delete user
const deleteUser = async ( req, res) => {
    const {id = _id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "invalid id",
        })
    }
    try {
        await User.findByIdAndDelete(id)
        res.status(httpStatus.OK).json({
            success: true,
            message: `user with id ${id} successfully deleted`
        })
    } catch(error) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message : error.message
        })
    }
}
// modify user
const updateUser = async (req, res) => {
    const {id = _id} = req.params;
    const data = {...req.body};
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "invalid id",
        })
    }
    if (data.email && !validator.isEmail(data.email)) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: "invalid email format"
        })
    }
    try {
        const user = await User.findByIdAndUpdate(id, data, {new:true})
        res.status(httpStatus.OK).json({
            success: true,
            message: `user with id ${id} changed successfully`,
            data: user
        });
    } catch(error) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message : error.message
    });
}
}
module.exports = {
    getAllUsers,
    insertUser,
    deleteUser,
    updateUser,
    getUserById,
};