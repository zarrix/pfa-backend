 const jwt = require('jsonwebtoken');
 const Donor = require('../models/donor');
 const TOKEN_SECRET = require('../config/keys').TOKEN_SECRET;

 module.exports.checkUser = (req,res,next) => {
    const token = req.cookies.jwt;
    console.log(token);
    if(token){
        jwt.verify(token, TOKEN_SECRET,async (err,decodedToken)=>{
            if(err){
                res.locals.donor = null;
                res.cookie('jwt','',{maxAge: 1});
                
                next();
            }
            else{
                
                let donor = await Donor.findById(decodedToken.id);
                res.locals.donor = donor;
                console.log(donor);
                next();
              
            }
        })
    }
    else{
        res.locals.donor = null;
        
        next();
    }
 }

 module.exports.requireAuth = (req,res,next) => {
    // console.log(req.cookies.jwt);
    // console.log(req.header.Cookie);
     const token = req.cookies.jwt;
     if(token){
        jwt.verify(token, TOKEN_SECRET, (err,decodedToken)=>{
            if(err){
                console.log(err);
            }
            else    {
            Donor.findById(
                decodedToken.id,
                (err, docs) => {
                    if (err) res.status(500).send(err.message);
                    else {
                        console.log("logged user information retrieved");
                        delete docs.password;
                        res.status(200).send(docs);
                    }
                }).select('-password');
                // console.log(decodedToken.id);
                // next();
            }
        })
    } else {
        console.log('No token');
        res.status(400).send({"error": "No token"})
    }
 }