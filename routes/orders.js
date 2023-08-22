const express = require("express");
const {
    getAllOrders,
    getOrderById,
    insertOrder,
    deleteOrder,
    updateOrder
} = require("../controllers/orders");
const {filterByDateAndProduct} = require("../controllers/filterOrders")
// Router Orders
const router = express.Router();
router.get("/", filterByDateAndProduct);
router.get("/", getAllOrders);
router.post("/", insertOrder);
router.delete("/:id", deleteOrder);
router.get("/:id", getOrderById);
router.patch("/:id", updateOrder);
module.exports = router;