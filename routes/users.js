const express = require("express");
const {
    getAllUsers,
    insertUser,
    deleteUser,
    updateUser,
    getUserById,
} = require("../controllers/users")
// Router Users
const router = express.Router();
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", insertUser );
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);
module.exports = router;