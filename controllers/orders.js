const mongoose= require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");
const httpStatus = require ("http-status-codes");
// read all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate("products users")
        if (!orders.length) {
            return res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: "Order not found"
            });
         }
         res.status(httpStatus.OK).json({
             success: true,
             data: orders
         })
     } catch(error) {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
             success: false,
             message: error.message
         })
     }
 }
 // read only one order
 const getOrderById = async (req, res) => {
    const {id = _id} = req.params;
    try {
        const order = await Order.findById(id)
        .populate("products users")
        res.status(httpStatus.OK).json({
            success: true,
            data: order
        })
    } catch(error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message:error.message
        })
    }
}
 // creare new Order
 const insertOrder = async ( req, res) => {
    const {products, users} = req.body;
    try {
        const validProducts = await Product.find({
            _id: {$in: products}
        });
        const validUsers = await User.find({
            _id: {$in:users}
        });
        if (!validProducts.length || !validUsers.length) {
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: "Invalid products or users"
            });
        }
        const order = new Order({
            products: validProducts.map(product => product._id),
            users: validUsers.map(user => user._id)
        });
        await order.populate("products users")
        await order.save()
        res.status(httpStatus.CREATED).json({
            success: true,
            data: order
        });
    } catch(error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
 }
 // delete Order
 const deleteOrder = async ( req, res) => {
    const {id = _id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "invalid id",
        })
    }
    try {
        await Order.findByIdAndDelete(id)
        res.status(httpStatus.OK).json({
            success: true,
            message: `order with id ${id} successfully deleted`
        })
    } catch(error) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message : error.message
        })
    }
}
// modify order
const updateOrder = async (req, res) => {
    const {id = _id} = req.params;
    const data = {...req.body};
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "invalid id",
        })
    }
    try {
        const order = await Order.findByIdAndUpdate(id, data, {new:true})
        .populate("products users");
        res.status(httpStatus.OK).json({
            success: true,
            message: `order with id ${id} changed successfully`,
            data: order
        });
    } catch(error) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message : error.message
    });
}
}
module.exports = {
    getAllOrders,
    insertOrder,
    deleteOrder,
    getOrderById,
    updateOrder
};