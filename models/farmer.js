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
 
const farmerSchema = new mongoose.Schema({
    requestedAt: {
        type: Date,
        defaut: Date.now()
    },
    location: {
        region: String,
        province: String,
        commune: String,
        village: {
            type: String,
            required: true
        }
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
    association: {
        type: String,
        default: ""
    },
    commentary: String,
    status: {
        type: String,
        default: "ongoing"
    }
});
 
const Farmer = new mongoose.model('farmer', farmerSchema);

module.exports = Farmer;