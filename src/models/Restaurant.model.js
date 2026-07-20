const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a restaurant name']
    },
    logo: {
        type: String,
        default: 'no-logo.png'
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subscriptionPlan: {
        type: String,
        enum: ['Basic', 'Pro', 'Enterprise'],
        default: 'Basic'
    },
    settings: {
        currency: { type: String, default: 'USD' },
        taxRate: { type: Number, default: 0 },
        theme: { type: String, default: 'light' }
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
