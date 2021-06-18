const ObjectId = require("mongoose").Types.ObjectId;

// Models
const Image = require('../models/image');

//Read image from mongoDB
module.exports.getImage = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : '+req.params.id);
    } else {
        Image
        .findById( 
            req.params.id, 
            function(err,image) {
                if (err) console.log("Error to get Image");
                else {
                    res.contentType(image.img.contentType);
                    res.send(image.img.data);
                }
        });
    }
}

//update image
module.exports.updateImage = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : '+req.params.id);
    } 
    else {
        if (req.file) { 
            if (
                req.file.mimetype != "image/jpg" &&
                req.file.mimetype != "image/png" &&
                req.file.mimetype != "image/jpeg"
            ) return res.status(400).send({"error": "invalid image format"});
    
            if (req.file.size > 800000) return res.status(400).send({"error": "the file size is bigger than 800Kb"});
            
            Image.findByIdAndUpdate(
                req.params.id,
                {   
                    img: {
                        data: req.file.buffer,
                        contentType: req.file.mimetype
                    }
                },
                { new: true },
                (err, docs) => {
                    if (err) res.status(500).send(err.message);
                    else {
                        console.log("Image updated successfully.");
                        res.status(200).send("Image updated successfully.")
                    }
                }
            );
        } else  {
            res.status(400).send({"error": "No image added"});
        }
    }
}