const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {TOKEN_SECRET, TOKEN_ADMIN} = require('../config/keys');

 module.exports.checkUser = (req,res,next) => {
    const token = req.cookies.jwt;
    console.log(token);
    if(token){
        jwt.verify(token, TOKEN_SECRET,async (err,decodedToken)=>{
            if(err){
                res.locals.user = null;
                res.cookie('jwt','',{maxAge: 1});
                
                next();
            }
            else{
                
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                console.log(user);
                next();
              
            }
        })
    }
    else{
        res.locals.user = null;
        
        next();
    }
 }

//  module.exports.requireDonorAuth = (req,res,next) => {
//     // console.log(req.cookies.jwt);
//     // console.log(req.header.Cookie);
//      const token = req.cookies.jwt;
//      if(token){
//         jwt.verify(token, TOKEN_SECRET, (err,decodedToken)=>{
//             if(err){
//                 console.log(err);
//                 res.status(400).send("Invalid token")

//             }
//             else    {
//             Donor.findById(
//                 decodedToken.id,
//                 (err, docs) => {
//                     if (err) res.status(500).send(err.message);
//                     else {
//                         console.log("logged user information retrieved");
//                         delete docs.password;
//                         res.status(200).send(docs);
//                     }
//                 }).select('-password');
//                 // console.log(decodedToken.id);
//                 // next();
//             }
//         })
//     } else {
//         console.log('No token');
//         res.status(400).send({"error": "No token"})
//     }
//  }

module.exports.requireUserAuth = (req,res,next) => {
    // console.log(req.cookies.jwt);
    // console.log(req.header.Cookie);
     const token = req.cookies.jwt;
     if(token){
        jwt.verify(token, TOKEN_SECRET, (err,decodedToken)=>{
            if(err){
                console.log(err);
                res.status(400).send("Invalid token")
            }
            else    {
            User.findById(
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