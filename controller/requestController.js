const ObjectId = require("mongoose").Types.ObjectId;

// Models
const Request = require('../models/request');
const Farmer = require('../models/farmer');
const Association = require('../models/association');
const School = require('../models/school');

//Read requests from mongoDB

module.exports.getRequests = (req, res) => {
    let filter = {};
    const sort = req.query.orderby || "updatedAt";
    const asc = (req.query.asc === 'true') ? -1 : 1;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const type = req.query.type === 'farmer' || req.query.type === 'association' || req.query.type === 'school' ? {type: req.query.type} : {};
    
    Request
        .find(type, (err, docs) => {
            if (err) console.log('Error while reading data : ' + err);
            else res.send(docs)
        })
        .sort( {[sort]: asc} )
        .limit(limit)
        .skip((page - 1) * limit);
}

//Read request by id
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

//add a request
module.exports.addRequest = async (req, res) => {
    let totalTrees = 0;
    let totalPrice = 0;
    await req.body.trees.forEach(tree => {
        totalTrees += tree.quantity;
        totalPrice += tree.quantity*tree.pricePerUnity;
    });

    if (req.body.type === "farmer") {
        const request = new Request({
            type: req.body.type,
            responsible: req.body.responsible,
            beneficiary: req.body.beneficiary,
            region: req.body.region || "",
            province: req.body.province || "",
            commune: req.body.commune || "",
            village: req.body.village,
            trees: req.body.trees,
            totalTrees,
            totalPrice,
            commentary: req.body.commentary,
            association: req.body.association || ""
        });

        request.save()
        .then(() => {
            console.log('Request added successfully.');
            res.status(201).json(request);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Something went wrong");
        });
    }
    else if (req.body.type === "association") {
        const request = new Request({
            type: req.body.type,
            responsible: req.body.responsible,
            beneficiary: req.body.beneficiary,
            region: req.body.region || "",
            province: req.body.province || "",
            commune: req.body.commune || "",
            village: req.body.village,
            trees: req.body.trees,
            totalTrees,
            totalPrice,
            commentary: req.body.commentary,
        });

        request.save()
        .then(() => {
            console.log('Request added successfully.');
            res.status(201).json(request);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Something went wrong");
        });
    }
    else if(req.body.type === "school") {
        const request = new Request({
            type: req.body.type,
            responsible: req.body.responsible,
            beneficiary: req.body.beneficiary,
            region: req.body.region || "",
            province: req.body.province || "",
            commune: req.body.commune || "",
            village: req.body.village,
            trees: req.body.trees,
            totalTrees,
            totalPrice,
            commentary: req.body.commentary,
            boys: req.body.boys,
            girls: req.body.girls
        });

        request.save()
        .then(() => {
            console.log('Request added successfully.');
            res.status(201).json(request);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Something went wrong");
        });
    }
    else {
        res.status(400).send("Unkonwn request type. please select one of farmer/association/school");
    }
}

//update a request
module.exports.updateRequest = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : '+req.params.id);
    } 
    else {
        Request.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                updatedAt: Date.now()
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

//delete a farmer
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
                    console.log("Farmer deleted.");
                    res.status(200).send(docs)
                }
            }
        );  
    }  
}


//get nurseries statistics
module.exports.getStatistics = async (req, res) => {

    let info = {
        total: 0
    };

    await Request.aggregate([{
        $unwind: "$type"
    },{
        $group : {
            _id : '$type',
            count: {
                $sum: 1
            }
        }
    },],function(err, docs) {
        if (err) {
            console.log(err);
            res.status(400).send(err.message)
        } else {
            console.log("Requests statistics sent.")
            docs.forEach(stat => {
                info[stat._id]=stat.count;
                info.total+=stat.count;
            })
            res.send(info);
        }
    });

    // await Farmer.countDocuments({}, function(err, c) {
    //     if (err) {
    //         console.log(err);
    //         res.status(400).send(err.message)
    //     } else {
    //         info["requests"] = c
    //         info["farmers"] = c;
    //     }
    // });

    // await Association.countDocuments({}, function(err, c) {
    //     if (err) {
    //         console.log(err);
    //         res.status(400).send(err.message)
    //     } else {
    //         info["requests"] += c
    //         info["associations"] = c;
    //     }
    // });

    // await School.countDocuments({}, function(err, c) {
    //     if (err) {
    //         console.log(err);
    //         res.status(400).send(err.message)
    //     } else {
    //         info["requests"] += c
    //         info["school"] = c;
    //         res.status(200).send(info);
    //     }
    // });

    

}

//get nurseries statistics with status
module.exports.getStatisticsStatus = async (req, res) => {

    let info = {
        confirmed: 0,
        cancelled: 0,
        ongoing: 0
    };

    await Farmer.aggregate([{
        $group : {
            _id: "$status" ,
            total: {
                $sum: 1
            }
        }
    }],async function(err, docs) {
        if (err) {
            console.log(err);
            res.status(400).send(err.message)
        } else {
            info.confirmed += await docs.filter(doc => doc._id === "confirmed")[0].total;
            info.cancelled += await docs.filter(doc => doc._id === "cancelled")[0].total || 0;
            info.ongoing += await docs.filter(doc => doc._id === "ongoing")[0].total;
            console.log(info);
        }
    });

    res.send(info);


    // await Farmer.countDocuments({}, function(err, c) {
    //     if (err) {
    //         console.log(err);
    //         res.status(400).send(err.message)
    //     } else {
    //         info["requests"] = c
    //         info["farmers"] = c;
    //     }
    // });

    // await Association.countDocuments({}, function(err, c) {
    //     if (err) {
    //         console.log(err);
    //         res.status(400).send(err.message)
    //     } else {
    //         info["requests"] += c
    //         info["associations"] = c;
    //     }
    // });

    // await School.countDocuments({}, function(err, c) {
    //     if (err) {
    //         console.log(err);
    //         res.status(400).send(err.message)
    //     } else {
    //         info["requests"] += c
    //         info["school"] = c;
    //         res.status(200).send(info);
    //     }
    // });

    

}