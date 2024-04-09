const mongoose = require('mongoose');

//Schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    }
);

//Model
const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;