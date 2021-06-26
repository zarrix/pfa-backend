const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");

// Models
const Tree = require('../models/tree');
const Image = require('../models/image');

//Read Trees from mongoDB
module.exports.getTrees = (req, res) => {
    let filter = {};
    const sort = req.query.orderby || "updatedAt";
    const asc = (req.query.asc === 'true') ? 1 : -1;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    if (req.query.search) filter.name = new RegExp(req.query.search, "i");
    Tree
        .find(filter, (err, docs) => {
            if (err) console.log('Error while reading data : ' + err);
            else res.send(docs)
        })
        .sort( {[sort]: asc} )
        .limit(limit)
        .skip((page - 1) * limit);
}

//Read Tree by id
module.exports.getTreeById = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).send("Unkown Id : " + req.params.id);
    } else {
        Tree
            .findById(req.params.id, (err, docs) => {
                if (err) console.log('Error while reading data : ' + err);
                else res.send(docs);
            })       
    }
}

//create a Tree
module.exports.addTree = (req, res) => {
    if (req.file) {       
        if (
            req.file.mimetype != "image/jpg" &&
            req.file.mimetype != "image/png" &&
            req.file.mimetype != "image/jpeg"
        ) return res.status(400).send({"error": "invalid image format"});

        if (req.file.size > 800000) return res.status(400).send({"error": "the file size is bigger than 800Kb"});
        
        
        const image = new Image({
                img: {
                        data: req.file.buffer,
                        contentType: req.file.mimetype
                }
        })

        image.save()
                .then((img) => {
                        console.log('Image added successfully.');
                        const tree = new Tree({
                            name: req.body.name,
                            latinName: req.body.latinName,
                            picture: img._id,
                            price: req.body.price,
                            weight: req.body.weight,
                            dimensions: req.body.dimensions
                        })
                        tree.save()
                        .then(() => {
                            console.log('Tree added successfully.');
                            res.status(201).json(tree);
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(400).send(err.message)
                        });
                });
    } else  {
        const image = new Image({
            img: {
                data: fs.readFileSync('./uploads/tree.jpg'),
                contentType: 'image/jpg'
            }
        })

        image.save()
            .then((img) => {
                    console.log('Default Image added successfully.');
                    const tree = new Tree({
                        name: req.body.name,
                        latinName: req.body.latinName,
                        picture: img._id,
                        price: req.body.price,
                        weight: req.body.weight,
                        dimensions: req.body.dimensions
                    })
                    tree.save()
                    .then(() => {
                        console.log('Tree added successfully.');
                        res.status(201).json(tree);
                    })
                    .catch(err => console.log(err));
            });
    }
        
}

//update a Tree
module.exports.updateTree = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : '+req.params.id);
    } 
    else {
        Tree.findByIdAndUpdate(
            req.params.id,
            {   
                name: req.body.name,
                latinName: req.body.latinName,
                price: req.body.price,
                weight: req.body.weight,
                dimensions: req.body.dimensions,
                updatedAt: Date.now()
            },
            { new: true },
            (err, docs) => {
                if (err) res.status(500).send(err.message);
                else {
                    console.log("Tree updated.");
                    res.status(200).send(docs)
                }
            }
        );
    }
}

//delete a Tree
module.exports.deleteTree = (req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : ' + req.params.id);
    } 
    else {
        Tree.findByIdAndDelete(
            req.params.id, 
            (err, docs) => {
                if (err) res.status(500).send(err.message);
                else {
                    console.log("Tree deleted.");
                    res.status(200).send(docs)
                }
            }
        );  
    }  
}