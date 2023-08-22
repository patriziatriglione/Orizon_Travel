const {
  ordersDB,
  countDocumentsDB
} = require("../models/orderModel")
const {productFindDB} = require("../models/productModel")
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
         product = await productFindDB({name:productName});
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
// page number
const page = parseInt(req.query.page) || 1;
//number of orders per page
const perPage = parseInt(req.query.perPage) || 10;
// calculate total number of documents and how many pages are needed to include documents based on "perPage"
const totalOrders = await countDocumentsDB(orderQuery);
const totalPages = Math.ceil(totalOrders / perPage)
const orders = await ordersDB(orderQuery, page, perPage, sortOption)
    if (orders.length === 0) {
        return res.status(httpStatus.NOT_FOUND).json({
          success: false,
          message: "No orders found for the specified criteria.",
        });
      }
      res.status(httpStatus.OK).json({
        success: true,
        orders: orders,
        pageInfo: {
          currentPage: page,
          totalPages: totalPages,
          totalOrders: totalOrders
      }
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