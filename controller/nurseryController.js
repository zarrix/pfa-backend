const ObjectId = require("mongoose").Types.ObjectId;

// Models
const Nursery = require('../models/nursery');

//Read Nurseries from mongoDB
module.exports.getNurseries = (req, res) => {
    Nursery
        .find((err, docs) => {
            if (err) console.log('Error while reading data : ' + err);
            else res.send(docs)
        })
        .sort( {updatedAt: -1} )
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