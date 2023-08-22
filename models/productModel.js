const Product = require("./product")
// read all products
const getAllProductDB = async(page, perPage) => {
    return Product.find()
    .skip((page - 1) * perPage)
    .limit(perPage)
};
// reand only one product
const getProductByIdDB = async (products) => {
    return Product.find({
        _id:{$in:products}
    })
};
// add new product
const inserProductDB = async(product) => {
    const newProduct = new Product(product);
    await newProduct.save();
    return newProduct;
};
//delete product
const deleteProductDB = async(_id) => {
    return Product.findByIdAndDelete(_id);
};
//modify product
const updateProductDB = async(_id, data) => {
    return Product.findByIdAndUpdate(_id, data, {new:true})
};
// look for the product name in the orders
const productFindDB = async({name:productName}) => {
    return Product.findOne({name:productName})
};
// calculate total number of products
const countDocuProductDB = async() => {
    return Product.countDocuments()
};
module.exports = {
    getAllProductDB,
    getProductByIdDB,
    inserProductDB,
    deleteProductDB,
    updateProductDB,
    productFindDB,
    countDocuProductDB
}