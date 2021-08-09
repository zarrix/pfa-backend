const mongoose = require('mongoose');
 
const nurserySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    partner: String,
    region: String,
    province: String,
    commune: String,
    almond: {
        type: Number,
        default: 0
    },
    pomegranate: {
        type: Number,
        default: 0
    },
    carob: {
        type: Number,
        default: 0
    },
    walnut: {
        type: Number,
        default: 0
    },
    cherry: {
        type: Number,
        default: 0
    },
    fig: {
        type: Number,
        default: 0
    },
    argan: {
        type: Number,
        default: 0
    },
    olive: {
        type: Number,
        default: 0
    },
    totalTrees: {
        type: Number,
        default: 0
    },
    soil: {
        type: Number,
        default: 0
    },
    workers: {
        type: Number,
        default: 0
    },
    transport: {
        type: Number,
        default: 0
    },
    seeds: {
        type: Number,
        default: 0
    },
    fertilizers: {
        type: Number,
        default: 0
    },
    takersSalaries: {
        type: Number,
        default: 0
    },
    totalMoney: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});
 
const Nursery = new mongoose.model('nursery', nurserySchema);
 
module.exports = Nursery;