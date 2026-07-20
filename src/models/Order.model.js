const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true
    },
    selectedVariant: String,
    selectedAddOns: [String],
    notes: String,
    status: {
        type: String,
        enum: ['Pending', 'Preparing', 'Ready', 'Served'],
        default: 'Pending'
    }
});

const orderSchema = new mongoose.Schema({
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
    tableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table' // optional, null for delivery/takeaway
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // Waiter or Cashier who placed it
    },
    orderType: {
        type: String,
        enum: ['Dine-In', 'Takeaway', 'Delivery'],
        default: 'Dine-In'
    },
    items: [orderItemSchema],
    subTotal: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Preparing', 'Ready', 'Served', 'Paid', 'Cancelled'],
        default: 'Pending'
    },
    kitchenNotes: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
