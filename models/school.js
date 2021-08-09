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
 
const schoolSchema = new mongoose.Schema({
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
    school: {
        name: String,
        phone: String,
        address : String
    },
    boys: {
        type: Number,
        required: true
    },
    girls: {
        type: Number,
        required: true
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
    }
});
 
const School = new mongoose.model('school', schoolSchema);

module.exports = School;