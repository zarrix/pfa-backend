const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create User Schema
const dataSchema = new Schema({
    year: [{
            month: Number
        },
    ],
    
}, {strict: false});

const Data = new mongoose.model('data', dataSchema);
 
module.exports = Data;