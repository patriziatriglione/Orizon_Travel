const  mongoose = require("mongoose");
const httpStatus = require ("http-status-codes")
const validator = require('validator');
const {
    getUserByIdDB,
    getAllUsersDB,
    insertUserDB,
    deleteUserDB,
    updateUserDB,
    countDocuUserDB
} = require("../models/userModel")
// read all users 
const getAllUsers = async (req, res) => {
   try {
    // page number
    const page = parseInt(req.query.page) || 1;
    //number of users per page
    const perPage = parseInt(req.query.perPage) || 10;
    // calculate total number of documents and how many pages are needed to include documents based on "perPage"
    const totalUsers = await countDocuUserDB();
    const totalPages = Math.ceil(totalUsers / perPage)
    const users = await getAllUsersDB(page, perPage)
    res.status(httpStatus.OK).json({
        success: true,
        data: users,
        pageInfo: {
            currentPage: page,
            totalPages: totalPages,
            totalUsers: totalUsers
        }
    });
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
        const user = await getUserByIdDB(id)
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
    try {
        const user = await insertUserDB(req.body); 
        if (!validator.isEmail(user.email)) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: "invalid email format"
        });
    }
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
        await deleteUserDB(id)
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
        const user = await updateUserDB(id, data)
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