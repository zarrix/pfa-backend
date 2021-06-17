const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Donation Schema 
const donationsSchema = new Schema({
    donorId: {
        type: String,
        required: true
    },
    donorName: {
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
}, { _id : false })

//create Project Schema & Model
const projectSchema = new Schema({
    image: {
        type: String,
        default: "default.png"
    },
    title : {
        type: String,
        required: true
    },
    description: String,
    category: {
        type: String,
        required: true
    },
    goal: Number,
    totalDons: {
        type: Number,
        default: 0
    },
    donations: [donationsSchema],
    updates: [],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

const Project = mongoose.model('project', projectSchema);

module.exports = Project;