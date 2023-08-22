const Order = require ("./order")
// read all orders 
const getAllOrderDB = async(page, perPage) => {
    return Order.find()
    .populate("products users")
    .skip((page - 1) * perPage)
    .limit(perPage)
};
// read only one order
const getOrderByIdDB = async(_id) => {
    return Order.findById(_id)
    .populate("products users")
    
};
// create new Order
const insertOrderDB = async (order) => {
    const newOrder = new Order(order);
    await newOrder.save();
    await newOrder.populate("products users")
    return newOrder;
};
//delete Order
const deleteOrderDB = async(_id) => {
    return Order.findByIdAndDelete(_id);
};
// modify order
const updateOrderDB = async(_id, data) => {
    return Order.findByIdAndUpdate(_id, data, {new:true})
    .populate("products users");
};
// filter order
const ordersDB = async(orderQuery, page, perPage, sortOption) => {
    return Order.find(orderQuery)
    .populate("products users")
    .skip((page - 1) * perPage)
    .limit(perPage)
    .sort(sortOption)
};
// calculate total number of documents with filter
const countDocumentsDB = async(orderQuery) => {
    return Order.countDocuments(orderQuery)
};
// calculate total number of documents
const countDocuOrderDB = async() => {
    return Order.countDocuments()
};
module.exports = {
    getAllOrderDB,
    getOrderByIdDB,
    insertOrderDB,
    deleteOrderDB,
    updateOrderDB,
    ordersDB,
    countDocumentsDB,
    countDocuOrderDB
}