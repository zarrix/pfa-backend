const mongoose = require('mongoose');
 
const treeSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    picture : {
        type: String,
        required: true,
    },
    price: {
        usd: Number,
        mad: Number
    },
    weight: {
        value: Number,
        unity: String
    },
    dimensions: {
        value: Number,
        unity: String
    },
    total: {
        type: Number,
        default: 0
    },
    updatedAt: {
        type: Date,
        defaut: Date.now()
    }
});
 
const Tree = new mongoose.model('tree', treeSchema);
 
module.exports = Tree;