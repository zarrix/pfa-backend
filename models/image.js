const mongoose = require('mongoose');
 
const imageSchema = new mongoose.Schema({
    img:
    {
        data: Buffer,
        contentType: String
    }
});
 
const Image = new mongoose.model('image', imageSchema);
 
module.exports = Image;