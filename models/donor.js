const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Donations Schema
const donationsSchema = new Schema({
    projectId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    donatedAt: {
        type: Date,
        default: Date.now()
    }
}, { _id : false });

//create Donor Schema & Model
const donorSchema = new Schema({
    picture : {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        default: 'Individual'
    },
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: String,
    address: String,
    donations: [donationsSchema],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Donor = mongoose.model('donor', donorSchema);

module.exports = Donor;