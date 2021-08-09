const ObjectId = require("mongoose").Types.ObjectId;

// Models
const Farmer = require('../models/farmer');

//Read farmers from mongoDB
module.exports.getFarmers = (req, res) => {
    let filter = {};
    const sort = req.query.orderby || "updatedAt";
    const asc = (req.query.asc === 'true') ? 1 : -1;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    Farmer
        .find((err, docs) => {
            if (err) console.log('Error while reading data : ' + err);
            else res.send(docs)
        })
        .sort( {[sort]: asc} )
        .limit(limit)
        .skip((page - 1) * limit);
}

//Read farmer by id
module.exports.getFarmerById = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).send("Unkown Id : " + req.params.id);
    } else {
        Farmer
            .findById(req.params.id, (err, docs) => {
                if (err) console.log('Error while reading data : ' + err);
                else res.send(docs);
            })       
    }
}

//create a farmer
module.exports.addFarmer = async (req, res) => {
    let totalTrees = 0;
    let totalPrice = 0;
    await req.body.trees.forEach(tree => {
        totalTrees += tree.quantity;
        totalPrice += tree.quantity*tree.pricePerUnity;
    });
    const farmer = new Farmer({
        responsible: req.body.responsible,
        beneficiary: req.body.beneficiary,
        location: req.body.location,
        trees: req.body.trees,
        totalTrees,
        totalPrice,
        commentary: req.body.commentary
    })
    farmer.save()
        .then(() => {
            console.log('Farmer farmer added successfully.');
            res.status(201).json(farmer);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Something went wrong");
        });
}

//update a farmer
module.exports.updateFarmer = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : '+req.params.id);
    } 
    else {
        Farmer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err, docs) => {
                if (err) res.status(500).send(err.message);
                else {
                    console.log("Farmer updated.");
                    res.status(200).send(docs)
                }
            }
        );
    }
}

//delete a farmer
module.exports.deleteFarmer = (req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : ' + req.params.id);
    } 
    else {
        Farmer.findByIdAndDelete(
            req.params.id, 
            (err, docs) => {
                if (err) res.status(500).send(err.message);
                else {
                    console.log("Farmer deleted.");
                    res.status(200).send(docs)
                }
            }
        );  
    }  
}
