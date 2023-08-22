const mongoose= require("mongoose");
const httpStatus = require ("http-status-codes");
const {
    getProductByIdDB,
    productFindDB
} = require("../models/productModel")
const {getUserByIdDB} = require("../models/userModel")
const {
    getOrderByIdDB,
    insertOrderDB,
    deleteOrderDB,
    updateOrderDB,
    countDocumentsDB,
    ordersDB
} = require ("../models/orderModel")
// read all orders
const getAllOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        // number of orders per page
        const perPage = parseInt(req.query.perPage) || 10;
        // filter by date and products
        const productName = req.query.name;
        const orderDate = req.query.date ? new Date(req.query.date) : null;
        let nextDay = null;
        if (orderDate) {
            nextDay = new Date(orderDate);
            nextDay.setDate(orderDate.getDate() + 1);
        }
        // results in ascending, descending or by date modified
        const sortOrder = req.query.sort === "asc" ? 1 : -1
        const sortField = req.query.sortField || "createdAt";
        const sortOption = {
            [sortField]: sortOrder,
}
let orderQuery = {};
let product;
// if the product is not there, a warning message appears
if(productName) {
    product = await productFindDB({name:productName});
if (!product) {
   return res.status(httpStatus.NOT_FOUND).json({
       success: false,
       message: "Product not found"
   });
}
}
// check if there is the product and the date or only one of the two
if (product) {
    orderQuery.products = product._id;
}
if (orderDate) {
    orderQuery.createdAt ={
        $gte: orderDate,
        $lt: nextDay,  
    };
}
// calculate total number of documents and how many pages are needed to include documents based on "perPage"
const totalOrders = await countDocumentsDB(orderQuery);
const totalPages = Math.ceil(totalOrders / perPage)
const orders = await ordersDB(orderQuery, page, perPage, sortOption);
if (!orders.length) {
            return res.status(httpStatus.NOT_FOUND).json({
                success: false,
                message: "Order not found"
            });
         }
         res.status(httpStatus.OK).json({
             success: true,
             data: orders,
             pageInfo: {
                currentPage: page,
                totalPages: totalPages,
                totalOrders: totalOrders
             }

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
        const order = await getOrderByIdDB(id)
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
 // create new Order
 const insertOrder = async ( req, res) => {
    const {products, users} = req.body;
    try {
        const validProducts = await getProductByIdDB(products);
        const validUsers = await getUserByIdDB(users);
        if (!validProducts.length || !validUsers.length) {
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: "Invalid products or users"
            });
        }
        const order = {
            products: validProducts.map(product => product._id),
            users: validUsers.map(user => user._id)
        };
        const insertOrder = await insertOrderDB(order);
        res.status(httpStatus.CREATED).json({
            success: true,
            data: insertOrder
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
        await deleteOrderDB(id);
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
        const order = await updateOrderDB(id, data)
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