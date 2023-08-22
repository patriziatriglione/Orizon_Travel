const mongoose = require("mongoose");
const httpStatus = require ("http-status-codes");
const {
    getAllProductDB,
    getProductByIdDB,
    inserProductDB,
    deleteProductDB,
    updateProductDB,
    countDocuProductDB
} = require("../models/productModel");
// read all products 
const getAllProducts = async (req, res) => {
   try {
    // page number
    const page = parseInt(req.query.page) || 1;
    // number of products per page
    const perPage = parseInt(req.query.perPage) || 10;
    // calculate total number of documents and how many pages are needed to include documents based on "perPage"
    const totalProducts = await countDocuProductDB();
    const totalPages = Math.ceil(totalProducts / perPage)
    const products = await getAllProductDB(page,perPage)
    
        res.status(httpStatus.OK).json({
            success: true,
            data: products,
            pageInfo: {
                currentPage: page,
                totalPages: totalPages,
                totalProducts: totalProducts
            }
        });
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
        const product = await getProductByIdDB(id)
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
    try {
        const product = await inserProductDB(req.body);
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
        await deleteProductDB(id)
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
        const product = await updateProductDB(id, data)
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