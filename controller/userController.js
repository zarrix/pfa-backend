const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = require('../config/keys').TOKEN_SECRET;

// Models
const User = require('../models/user');
const Image = require('../models/image');

//Read Users from mongoDB
module.exports.getUsers = (req, res) => {
    User
        .find((err, docs) => {
            if (err) console.log('Error while reading data : ' + err);
            else res.send(docs)
        })
        .sort( {createdAt: -1} )
}

// read User by id
module.exports.getUserById = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).send("Unkown Id : " + req.params.id);
    } else {
        User
            .findById(req.params.id, (err, docs) => {
                if (err) console.log('Error while reading data : ' + err);
                else res.send(docs);
            })  
    }
}

//create a User
module.exports.addUser = (req, res) => {
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
                        console.log('Image added successfully ...');
                        const user = new User({
                            picture: img._id,
                            name: req.body.name,
                            username: req.body.username,
                            email: req.body.email,
                            password: req.body.password,
                            role: req.body.role,
                            access: req.body.access
                        });
                        user.save()
                           .then((docs) => {
                                console.log('User added successfully ...');
                                res.status(201).send(docs);
                           })
                           .catch(err => res.status(400).send(err.message));
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
                    const user = new User({
                        picture: img._id,
                        name: req.body.name,
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password,
                        role: req.body.role,
                        access: req.body.access
                    });
                    user.save()
                        .then((docs) => {
                            console.log('User added successfully ...');
                            res.status(201).send(docs);
                        })
                        .catch(err => res.status(400).send(err.message));
            });
    }
        
}

//update a User 
module.exports.updateUser = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : '+req.params.id);
    } 
    else {
        User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
            (err, docs) => {
                if (err) res.status(500).send(err.message);
                else {
                    console.log("User updated.");
                    res.status(200).send(docs)
                }
            }
        );
    }
}

//delete a User
module.exports.deleteUser = (req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : ' + req.params.id);
    } 
    else {
        User.findByIdAndDelete(
            req.params.id, 
            (err, docs) => {
                if (err) res.status(500).send(err.message);
                else {
                    console.log("User deleted...");
                    res.status(200).send(docs)
                }
            }
        );  
    }  
}

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken =(id)=>{
    return jwt.sign({id},TOKEN_SECRET , {
        expiresIn: maxAge
    })
};

module.exports.login = async (req,res)=>{
    User.findOne(
        {"username": req.body.username},
        (err, docs) => {
            if (err) res.status(500).send(err.message);
            else if (docs) {
                if (req.body.password === docs.password) {
                    console.log("User logged successfully ...");
                    const token = createToken(docs._id);
                    res.cookie('jwt',token,{httpOnly:true , maxAge:maxAge });
                    res.status(200).json({
                        _id: docs._id,
                        picture: docs.picture,
                        createdAt: docs.createdAt,
                        name: docs.name,
                        username: docs.username,
                        email: docs.email,
                        role: docs.role,
                        access: docs.access
                    })
                } else {
                    console.log("Incorrect Password.");
                    res.status(400).send({"error": "Incorrect Password"});
                }
            }
            else {
                console.log("Unknown Username.");
                res.status(400).send({"error": "Unknown Username"});
            }
        }
    );
}

module.exports.logout = (req,res)=>{
    res.clearCookie('jwt', '', { maxAge: 1});
    res.send('User logged out successfully');
    console.log("User logged out successfully")
}