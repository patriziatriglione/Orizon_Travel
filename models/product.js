const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
// Schema Product
const productSchema = new Schema ({
    name: {
        type: String,
        required: true,
    }
}, {timestamps: true})
const product = mongoose.model("products", productSchema);
module.exports = product;