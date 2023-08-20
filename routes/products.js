const express = require("express");
const {
    getAllProducts, 
    insertProduct, 
    deleteProduct, 
    updateProduct, 
    getProductById,
} = require("../controllers/products")
// Router Products
const router = express.Router();
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", insertProduct );
router.delete("/:id", deleteProduct);
router.patch("/:id", updateProduct);
module.exports = router;