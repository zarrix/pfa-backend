const ObjectId = require("mongoose").Types.ObjectId;

// Models
const Nursery = require('../models/nursery');
const Tree = require('../models/tree');

//Read Nurseries from mongoDB
module.exports.getNurseries = (req, res) => {
    let filter = {};
    const sort = req.query.orderby || "updatedAt";
    const asc = (req.query.asc === 'true') ? 1 : -1;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    if (req.query.search) filter.name = new RegExp(req.query.search, "i");
    Nursery
        .find(filter, (err, docs) => {
            if (err) console.log('Error while reading data : ' + err);
            else res.send(docs)
        })
        .sort( {[sort]: asc} )
        .limit(limit)
        .skip((page - 1) * limit);
}

//Read Nursery by id
module.exports.getNurseryById = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).send("Unkown Id : " + req.params.id);
    } else {
        Nursery
            .findById(req.params.id, (err, docs) => {
                if (err) console.log('Error while reading data : ' + err);
                else res.send(docs);
            })       
    }
}

//create a Nursery
module.exports.addNursery = (req, res) => {
    const nursery = new Nursery({
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
    })
    nursery.save()
        .then(() => {
            console.log('Nursery added successfully.');
            res.status(201).json(nursery);
        })
        .catch(err => console.log(err));
}

//update a Nursery
module.exports.updateNursery = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : '+req.params.id);
    } 
    else {
        Nursery.findByIdAndUpdate(
            req.params.id,
            {   
                name: req.body.name,
                description: req.body.description,
                location: req.body.location,
            },
            { new: true },
            (err, docs) => {
                if (err) res.status(500).send(err.message);
                else {
                    console.log("Nursery updated.");
                    res.status(200).send(docs)
                }
            }
        );
    }
}

//delete a Nursery
module.exports.deleteNursery = (req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : ' + req.params.id);
    } 
    else {
        Nursery.findByIdAndDelete(
            req.params.id, 
            (err, docs) => {
                if (err) res.status(500).send(err.message);
                else {
                    console.log("Nursery deleted.");
                    res.status(200).send(docs)
                }
            }
        );  
    }  
}

//add trees to a nursery
module.exports.addTree = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : '+req.params.id);
    } 
    else {
        Tree.findOneAndUpdate(
            {name: req.body.name},
            {   
                updatedAt: Date.now(),
                $inc: {total: req.body.quantity},
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
                else if (!docs) return res.status(400).send({"error": "Unknown Tree"})
                else {
                    console.log("Tree infomation updated.")
                    Nursery.findByIdAndUpdate(
                        req.params.id,
                        {   
                            updatedAt: Date.now(),
                            $inc: {totalTrees: req.body.quantity},
                            $addToSet: { trees: {
                                name: req.body.name,
                                quantity: req.body.quantity
                            }},
                        },
                        { new: true },
                        (err, docs) => {
                            if (err) console.log(err);
                            else {
                                console.log("Trees added to nursery.")
                                res.status(200).send(docs)
                            }
                        }
                    );
                }
            }
        );
    }
}