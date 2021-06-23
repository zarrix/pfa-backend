const mongoose = require('mongoose');
 
const nurserySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    location: {
        region: String,
        province: String,
        commune: String
    },
    trees: [{
        name: String,
        quantity: {
            type: Number,
            default: 0
        }
    }],
    totalTrees: {
        type: Number,
        default: 0
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});
 
const Nursery = new mongoose.model('nursery', nurserySchema);
 
module.exports = Nursery;