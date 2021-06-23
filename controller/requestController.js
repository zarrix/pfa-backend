const ObjectId = require("mongoose").Types.ObjectId;

// Models
const Request = require('../models/request');

//Read Requests from mongoDB
module.exports.getRequests = (req, res) => {
    Request
        .find((err, docs) => {
            if (err) console.log('Error while reading data : ' + err);
            else res.send(docs)
        })
        .sort( {requestedAt: -1} )
}

//Read Request by id
module.exports.getRequestById = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).send("Unkown Id : " + req.params.id);
    } else {
        Request
            .findById(req.params.id, (err, docs) => {
                if (err) console.log('Error while reading data : ' + err);
                else res.send(docs);
            })       
    }
}

//create a Request
module.exports.addRequest = async (req, res) => {
    let totalTrees = 0;
    await req.body.trees.forEach(tree => totalTrees += tree.quantity);
    const pricePerTree = req.body.pricePerTree || 3;
    const totalPrice = totalTrees * pricePerTree;
    console.log(req.body.beneficiary);
    const request = new Request({
        beneficiary: req.body.beneficiary,
        nurseryId: req.body.nurseryId,
        location: req.body.location,
        trees: req.body.trees,
        totalTrees,
        pricePerTree,
        totalPrice
    })
    request.save()
        .then(() => {
            console.log('Request added successfully.');
            res.status(201).json(request);
        })
        .catch(err => console.log(err));
}

//update a Request
module.exports.updateRequest = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : '+req.params.id);
    } 
    else {
        Request.findByIdAndUpdate(
            req.params.id,
            {   
                beneficiary: req.body.beneficiary,
                location: req.body.location
            },
            { new: true },
            (err, docs) => {
                if (err) res.status(500).send(err.message);
                else {
                    console.log("Request updated.");
                    res.status(200).send(docs)
                }
            }
        );
    }
}

//delete a Request
module.exports.deleteRequest = (req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : ' + req.params.id);
    } 
    else {
        Request.findByIdAndDelete(
            req.params.id, 
            (err, docs) => {
                if (err) res.status(500).send(err.message);
                else {
                    console.log("Request deleted.");
                    res.status(200).send(docs)
                }
            }
        );  
    }  
}

//add trees to a Request
module.exports.statusRequest = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : '+req.params.id);
    } 
    else {
        Request.findByIdAndUpdate(
            req.params.id,
            {   
                status: req.body.status,
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
                else {
                    console.log("Status updated.")
                }
            }
        );
    }
}