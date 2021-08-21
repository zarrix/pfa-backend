const mongoose = require('mongoose');

// create trees schema
const treesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    pricePerUnity: {
        type: Number,
        required: true
    }
}, { _id : false });
 
const requestSchema = new mongoose.Schema({
    requestedAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    type: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    province: String,
    commune: String,
    village: {
        type: String,
        required: true
    },
    nurseries: [String],
    responsible: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    beneficiary: {
        name: String,
        phone: String,
        address : String
    },
    trees: [treesSchema],
    totalTrees: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    commentary: String,
    status: {
        type: String,
        default: "ongoing"
    },
    association: String,
    boys: Number,
    girls: Number,
});
 
const Request = new mongoose.model('request', requestSchema);

module.exports = Request;