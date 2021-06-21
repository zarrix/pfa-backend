const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//create Donation Schema & Model
const donationSchema = new Schema({
    projectId : {
        type: String,
        required: true
    },
    donorId : {
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
});

const Donation = mongoose.model('donation', donationSchema);

module.exports = Donation;