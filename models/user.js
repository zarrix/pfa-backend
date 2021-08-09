const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create User Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    picture : {
        type: String,
        required: true,
        default: 'default.png'
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    access: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const User = new mongoose.model('user', userSchema);
 
module.exports = User;