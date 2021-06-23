const mongoose = require('mongoose');
 
const requestSchema = new mongoose.Schema({
    requestedAt: {
        type: Date,
        defaut: Date.now()
    },
    location: {
        region: String,
        province: String,
        commune: String,
        village: String
    },
    nurseryId: String,
    beneficiary: {
        name: String,
        type: String,
        phone: String,
        address : String
    },
    trees: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalTrees: {
        type: Number,
        required: true
    },
    pricePerTree: Number,
    totalPrice: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "ongoing"
    }
});
 
const Request = new mongoose.model('request', requestSchema);
 
module.exports = Request;