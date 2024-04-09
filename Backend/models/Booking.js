const mongoose = require('mongoose');

//Schema
const bookingSchema = new mongoose.Schema(
    {
        rooms: {
            type: String,
            required: true,
        },
        roomid: {
            type: String,
            required: true
        },
        userid: {
            type: String,
            required: true,
        },
        fromdate: {
            type: String,
            required: true,
        },
        todate: {
            type: String,
            required: true,
        },
        totalamount: {
            type: Number,
            required: true,
        },
        totaldays: {
            type: Number,
            required: true,
        },
        transactionId: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            default: 'booked'
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
const bookingModel = mongoose.model('bookings', bookingSchema);

module.exports = bookingModel;