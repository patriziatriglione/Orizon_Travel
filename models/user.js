const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
// Schema User
const userSchema = new Schema ({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
}, {timestamps: true})
const user = mongoose.model("users", userSchema);
module.exports = user;