const express = require("express");
const {
    getAllOrders,
    getOrderById,
    insertOrder,
    deleteOrder,
    updateOrder
} = require("../controllers/orders");
// Router Orders
const router = express.Router();
router.get("/", getAllOrders);
router.post("/", insertOrder);
router.delete("/:id", deleteOrder);
router.get("/:id", getOrderById);
router.patch("/:id", updateOrder);
module.exports = router;