const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
// Schema Order
const orderSchema = new Schema ({
    products:[{
        type: Schema.Types.ObjectId, 
        ref: "products"
    }],
    users:[{
        type: Schema.Types.ObjectId,
        ref: "users"
    }]
}, {timestamps: true})
const order = mongoose.model("orders", orderSchema);
module.exports = order;