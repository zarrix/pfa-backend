const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = require('../config/keys').TOKEN_SECRET;

// Models
const Donor = require('../models/donor');
const Image = require('../models/image');

//Read donors from mongoDB
module.exports.getDonors = (req, res) => {
    Donor
        .find((err, docs) => {
            if (err) console.log('Error while reading data : ' + err);
            else res.send(docs)
        })
        .sort( {createdAt: -1} )
        .select('-password');
}

// read donor by id
module.exports.getDonorById = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).send("Unkown Id : " + req.params.id);
    } else {
        Donor
            .findById(req.params.id, (err, docs) => {
                if (err) console.log('Error while reading data : ' + err);
                else res.send(docs);
            })
            .select('-password');  
    }
}

//create a Donor
module.exports.addDonor = (req, res) => {
    if (req.file) {
        console.log(req.file.mimetype);
        
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
                        console.log('Image added successfully ...');
                        const donor = new Donor({
                            picture: img._id,
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password,
                            phone: req.body.phone,
                            address: req.body.address,
                            type: req.body.type || 'individual'
                        });
                        donor.save()
                           .then(() => {
                                console.log('Donor added successfully ...');
                                res.status(201).json(donor);
                           })
                           .catch(err => console.log(err));
                });
    } else  {
        const image = new Image({
            img: {
                data: fs.readFileSync('./uploads/user.png'),
                contentType: 'image/png'
            }
        })

        image.save()
            .then((img) => {
                    console.log('Default Image added successfully ...');
                    const donor = new Donor({
                        picture: img._id,
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        phone: req.body.phone,
                        address: req.body.address
                    });
                    donor.save()
                        .then(() => {
                            console.log('Donor added successfully ...');
                            res.status(201).json(donor);
                        })
                        .catch(err => console.log(err));
            });
    }
        
}

//update a Donor 
module.exports.updateDonor = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : '+req.params.id);
    } 
    else {
        Donor.findByIdAndUpdate(
            req.params.id,
            {   
                name : req.body.name,
                address: req.body.address,
                phone : req.body.phone
            },
            { new: true },
            (err, docs) => {
                if (err) res.status(500).send(err.message);
                else {
                    console.log("Donor updated.");
                    res.status(200).send(docs)
                }
            }
        )
        .select('-password');
    }
}

//delete a donor
module.exports.deleteDonor = (req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id :');
    } 
    else {
        Donor.findByIdAndDelete(
            req.params.id, 
            (err, docs) => {
                if (err) res.status(500).send(err.message);
                else {
                    console.log("Donor deleted.");
                    res.status(200).send(docs)
                }
            }
        );  
    }  
}

//add to cart 
module.exports.addToCart = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : '+req.params.id);
    } 
    else {
        Donor.findByIdAndUpdate(
            req.params.id,
            {   
                $addToSet: { cart: {treeId: req.body.treeId, quantity: req.body.quantity} },
            },
            { new: true },
            (err, docs) => {
                if (err) res.status(500).send(err.message);
                else {
                    console.log("Tree added to donor's cart.");
                    res.status(200).send(docs)
                }
            }
        )
        .select('-password');
    }
}

//remove from cart
module.exports.removeFromCart = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : '+req.params.id);
    } 
    else {
        Donor.findByIdAndUpdate(
            req.params.id,
            {   
                $pull: { cart: {treeId : req.body.treeId } },
            },
            { new: true },
            (err, docs) => {
                if (err) res.status(500).send(err.message);
                else {
                    console.log("Tree removed to donor's cart.");
                    res.status(200).send(docs)
                }
            }
        )
        .select('-password');
    }
}

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken =(id)=>{
    return jwt.sign({id},TOKEN_SECRET , {
        expiresIn: maxAge
    })
};

module.exports.login = async (req,res)=>{
    Donor.findOne(
        {"email": req.body.email},
        (err, docs) => {
            if (err) res.status(500).send(err.message);
            else if (docs) {
                if (req.body.password === docs.password) {
                    console.log("Donor logged successfully ...");
                    const token = createToken(docs._id);
                    res.cookie('jwt',token,{httpOnly:true , maxAge:maxAge });
                    res.status(200).json({
                        _id: docs._id,
                        picture: docs.picture,
                        type: docs.type,
                        name: docs.name,
                        email: docs.email,
                        phone: docs.phone,
                        address: docs.address,
                        donations: docs.donations,
                        cart: docs.cart
                        createdAt: docs.createdAt
                    })
                } else {
                    console.log("Incorrect Password.");
                    res.status(400).send({"error": "Incorrect Password"});
                }
            }
            else {
                console.log("Unknown Email.");
                res.status(400).send({"error": "Unknown Email"});
            }
        }
    );
}

module.exports.logout = (req,res)=>{
    console.log("method invocked")
    res.clearCookie('jwt', '', { maxAge: 1});
    res.send('Donor logged out successfully ...');
}