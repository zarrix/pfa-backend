const mongoose = require('mongoose');
 
const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        default: null
    },
    askedAt: {
        type: Date,
        default: Date.now()
    }
});
 
const Question = new mongoose.model('question', questionSchema);
 
module.exports = Question;