const mongoose= require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user")
const httpStatus = require ("http-status-codes");
// filter by date and products
const filterByDateAndProduct = async (req,res) => {
   const productName = req.query.name;
   const orderDate = req.query.date ? new Date(req.query.date) : null;
   let nextDay = null;
if (orderDate) {
  nextDay = new Date(orderDate);
  nextDay.setDate(orderDate.getDate() + 1);
}
// limits results
const limit = req.query.limit ? parseInt(req.query.limit) : null;
// results in ascending, descending or by date modified
const sortOrder = req.query.sort === "asc" ? 1 : -1
const sortField = req.query.sortField || "createdAt";
const sortOption = {
  [sortField]: sortOrder,
}
try {
    let product = null;
    // if the product is not there, a warning message appears
    if(productName) {
         product = await Product.findOne({ name: productName});
    if (!product) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "Product not found"
        });
    }
}
// check if there is the product and the date or only one of the two
let orderQuery = {};
if (product) {
    orderQuery.products = product._id;
}
if (orderDate) {
    orderQuery.createdAt ={
        $gte: orderDate,
        $lt: nextDay,  
    };
}
const orders = await Order.find(orderQuery)
    .populate("products users")
    .limit(limit)
    .sort(sortOption)
    if (orders.length === 0) {
        return res.status(httpStatus.NOT_FOUND).json({
          success: false,
          message: "No orders found for the specified criteria.",
        });
      }
      res.status(httpStatus.OK).json({
        success: true,
        orders: orders
    })
  } catch(errror) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: "Internal server error"
    })
  }
}
module.exports = {
    filterByDateAndProduct
}