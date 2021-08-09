const ObjectId = require("mongoose").Types.ObjectId;

// Models
const Association = require('../models/association');

//Read Associations from mongoDB
module.exports.getAssociations = (req, res) => {
    let filter = {};
    const sort = req.query.orderby || "updatedAt";
    const asc = (req.query.asc === 'true') ? 1 : -1;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    Association
        .find((err, docs) => {
            if (err) console.log('Error while reading data : ' + err);
            else res.send(docs)
        })
        .sort( {[sort]: asc} )
        .limit(limit)
        .skip((page - 1) * limit);
}

//Read Association by id
module.exports.getAssociationById = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).send("Unkown Id : " + req.params.id);
    } else {
        Association
            .findById(req.params.id, (err, docs) => {
                if (err) console.log('Error while reading data : ' + err);
                else res.send(docs);
            })       
    }
}

//create a Association
module.exports.addAssociation = async (req, res) => {
    let totalTrees = 0;
    let totalPrice = 0;
    await req.body.trees.forEach(tree => {
        totalTrees += tree.quantity;
        totalPrice += tree.quantity*tree.pricePerUnity;
    });
    const association = new Association({
        responsible: req.body.responsible,
        association: req.body.association,
        farmers: req.body.farmers,
        location: req.body.location,
        trees: req.body.trees,
        totalTrees,
        totalPrice,
        commentary: req.body.commentary
    })
    association.save()
        .then(() => {
            console.log('Association Association added successfully.');
            res.status(201).json(association);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Something went wrong");
        });
}

//update a Association
module.exports.updateAssociation = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : '+req.params.id);
    } 
    else {
        Association.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err, docs) => {
                if (err) res.status(500).send(err.message);
                else {
                    console.log("Association updated.");
                    res.status(200).send(docs)
                }
            }
        );
    }
}

//delete a Association
module.exports.deleteAssociation = (req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : ' + req.params.id);
    } 
    else {
        Association.findByIdAndDelete(
            req.params.id, 
            (err, docs) => {
                if (err) res.status(500).send(err.message);
                else {
                    console.log("Association deleted.");
                    res.status(200).send(docs)
                }
            }
        );  
    }  
}
