const ObjectId = require("mongoose").Types.ObjectId;

// Models
const School = require('../models/school');

//Read Schools from mongoDB
module.exports.getSchools = (req, res) => {
    let filter = {};
    const sort = req.query.orderby || "updatedAt";
    const asc = (req.query.asc === 'true') ? 1 : -1;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    School
        .find((err, docs) => {
            if (err) console.log('Error while reading data : ' + err);
            else res.send(docs)
        })
        .sort( {[sort]: asc} )
        .limit(limit)
        .skip((page - 1) * limit);
}

//Read School by id
module.exports.getSchoolById = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).send("Unkown Id : " + req.params.id);
    } else {
        School
            .findById(req.params.id, (err, docs) => {
                if (err) console.log('Error while reading data : ' + err);
                else res.send(docs);
            })       
    }
}

//create a School
module.exports.addSchool = async (req, res) => {
    let totalTrees = 0;
    let totalPrice = 0;
    await req.body.trees.forEach(tree => {
        totalTrees += tree.quantity;
        totalPrice += tree.quantity*tree.pricePerUnity;
    });
    const school = new School({
        responsible: req.body.responsible,
        school: req.body.school,
        boys: req.body.boys,
        girls: req.body.girls,
        location: req.body.location,
        trees: req.body.trees,
        totalTrees,
        totalPrice,
        commentary: req.body.commentary
    })
    school.save()
        .then(() => {
            console.log('School added successfully.');
            res.status(201).json(school);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Something went wrong");
        });
}

//update a School
module.exports.updateSchool = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : '+req.params.id);
    } 
    else {
        School.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err, docs) => {
                if (err) res.status(500).send(err.message);
                else {
                    console.log("School updated.");
                    res.status(200).send(docs)
                }
            }
        );
    }
}

//delete a School
module.exports.deleteSchool = (req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : ' + req.params.id);
    } 
    else {
        School.findByIdAndDelete(
            req.params.id, 
            (err, docs) => {
                if (err) res.status(500).send(err.message);
                else {
                    console.log("School deleted.");
                    res.status(200).send(docs)
                }
            }
        );  
    }  
}
