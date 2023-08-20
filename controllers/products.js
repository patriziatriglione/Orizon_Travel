const mongoose = require("mongoose");
const Product = require("../models/product");
const httpStatus = require ("http-status-codes")
// read all products 
const getAllProducts = async (req, res) => {
   try {
        const products = await Product.find()
        res.status(httpStatus.OK).json({
            success: true,
            data: products
        })
    } catch(error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
}
// read only one product
const getProductById = async (req, res) => {
    const {id = _id} = req.params;
    try {
        const product = await Product.findById(id)
        res.status(httpStatus.OK).json({
            success: true,
            data: product
        })
    } catch(error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message:error.message
        })
    }
}
// add new Product
const insertProduct = async (req, res) => {
    const product = new Product (req.body)
    try {
        await product.save()
        res.status(httpStatus.CREATED).json({
            success: true,
            data: product
        })
    } catch(error) {
        res.status(httpStatus.CONFLICT).json({
            success: false,
            message: error.message
        })
    }
}
// delete Product
const deleteProduct = async ( req, res) => {
    const {id = _id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "invalid id",
        })
    }
    try {
        await Product.findByIdAndDelete(id)
        res.status(httpStatus.OK).json({
            success: true,
            message: `product with id ${id} successfully deleted`
        })
    } catch(error) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message : error.message
        })
    }
}
// modify product
const updateProduct = async (req, res) => {
    const {id = _id} = req.params;
    const data = {...req.body};
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: "invalid id",
        })
    }
    try {
        const product = await Product.findByIdAndUpdate(id, data, {new:true})
        res.status(httpStatus.OK).json({
            success: true,
            message: `product with id ${id} changed successfully`,
            data: product
        });
    } catch(error) {
        res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message : error.message
    });
}
}
module.exports = {
    getAllProducts,
    insertProduct,
    deleteProduct,
    updateProduct,
    getProductById,
};