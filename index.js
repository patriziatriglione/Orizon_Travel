const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users")
const orderRoutes = require("./routes/orders")
// function for dotenv
dotenv.config();
// function for express
const app = express();
app.use(express.urlencoded({ extended: true }));
// to use json method
app.use(express.json())
// PORT
const port = process.env.PORT || 3000;
//connect to mongoose
mongoose.connect(process.env.CONNECT_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on("error", err => {
    console.log(err)
})
mongoose.connection.on("connected", res => {
    console.log("connected")
})
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})