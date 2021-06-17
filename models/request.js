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
    beneficiary: {
        name: String,
        type: String,
        phone: String,
        address : String
    },
    trees: [{
        name: String,
        quantity: {
            type: Number,
            required: true
        }
    }],
    payment: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "ongoing"
    }
});
 
const Request = new mongoose.model('request', requestSchema);
 
module.exports = Request;