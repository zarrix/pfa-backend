const ObjectId = require("mongoose").Types.ObjectId;

// Models
const Nursery = require('../models/nursery');
const Tree = require('../models/tree');

// helpers functions
const functions  = require('../functions/Functions');

//Read Nurseries from mongoDB
module.exports.getNurseries = (req, res) => {
    let filter = {};
    const sort = req.query.orderby || "updatedAt";
    const asc = (req.query.asc === 'true') ? 1 : -1;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    if (req.query.search) filter.name = new RegExp(req.query.search, "i");
    Nursery
        .find(filter, (err, docs) => {
            if (err) console.log('Error while reading data : ' + err);
            else res.send(docs)
        })
        .sort( {[sort]: asc} )
        .limit(limit)
        .skip((page - 1) * limit);
}

//get trees in every nursery
module.exports.getTrees = (req, res) => {
    let rs = {
        almond: {
            nurseries: [],
            total: 0
        },
        pomegranate: {
            nurseries: [],
            total: 0
        },
        carob: {
            nurseries: [],
            total: 0
        },
        walnut: {
            nurseries: [],
            total: 0
        },
        cherry: {
            nurseries: [],
            total: 0
        },
        fig: {
            nurseries: [],
            total: 0
        },
        argan: {
            nurseries: [],
            total: 0
        },
        olive: {
            nurseries: [],
            total: 0
        },
    };
    
    let filter = {};
    const sort = req.query.orderby || "updatedAt";
    const asc = (req.query.asc === 'true') ? 1 : -1;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    if (req.query.search) filter.name = new RegExp(req.query.search, "i");

    Nursery
        .find({}, (err, docs) => {
            if (err) console.log('Error while reading data : ' + err);
            else {
                docs.forEach(nursery => {
                    rs.almond.nurseries.push({
                        name: nursery.name,
                        quantity: nursery.almond
                    });
                    rs.almond.total += nursery.almond;

                    rs.pomegranate.nurseries.push({
                        name: nursery.name,
                        quantity: nursery.pomegranate
                    });
                    rs.pomegranate.total += nursery.pomegranate;

                    rs.carob.nurseries.push({
                        name: nursery.name,
                        quantity: nursery.carob
                    });
                    rs.carob.total += nursery.carob;

                    rs.walnut.nurseries.push({
                        name: nursery.name,
                        quantity: nursery.walnut
                    });
                    rs.walnut.total += nursery.walnut;

                    rs.cherry.nurseries.push({
                        name: nursery.name,
                        quantity: nursery.cherry
                    });
                    rs.cherry.total += nursery.cherry;

                    rs.fig.nurseries.push({
                        name: nursery.name,
                        quantity: nursery.fig
                    });
                    rs.fig.total += nursery.fig;

                    rs.argan.nurseries.push({
                        name: nursery.name,
                        quantity: nursery.argan
                    });
                    rs.argan.total += nursery.argan;

                    rs.olive.nurseries.push({
                        name: nursery.name,
                        quantity: nursery.olive
                    });
                    rs.olive.total += nursery.olive;
                })
            res.status(200).send(rs);
            }
        });
}

//get materials in every nursery
module.exports.getMaterials = (req, res) => {
    let rs = {
        soil: {
            nurseries: [],
            total: 0
        },
        workers: {
            nurseries: [],
            total: 0
        },
        transport: {
            nurseries: [],
            total: 0
        },
        seeds: {
            nurseries: [],
            total: 0
        },
        fertilizers: {
            nurseries: [],
            total: 0
        },
        takersSalaries: {
            nurseries: [],
            total: 0
        },
        totalMoney: {
            nurseries: [],
            total: 0
        },
    };
    
    let filter = {};
    const sort = req.query.orderby || "updatedAt";
    const asc = (req.query.asc === 'true') ? 1 : -1;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    if (req.query.search) filter.name = new RegExp(req.query.search, "i");

    Nursery
        .find({}, (err, docs) => {
            if (err) console.log('Error while reading data : ' + err);
            else {
                docs.forEach(nursery => {
                    rs.soil.nurseries.push({
                        name: nursery.name,
                        quantity: nursery.soil
                    });
                    rs.soil.total += nursery.soil;

                    rs.workers.nurseries.push({
                        name: nursery.name,
                        quantity: nursery.workers
                    });
                    rs.workers.total += nursery.workers;

                    rs.transport.nurseries.push({
                        name: nursery.name,
                        quantity: nursery.transport
                    });
                    rs.transport.total += nursery.transport;

                    rs.seeds.nurseries.push({
                        name: nursery.name,
                        quantity: nursery.seeds
                    });
                    rs.seeds.total += nursery.seeds;

                    rs.fertilizers.nurseries.push({
                        name: nursery.name,
                        quantity: nursery.fertilizers
                    });
                    rs.fertilizers.total += nursery.fertilizers;

                    rs.takersSalaries.nurseries.push({
                        name: nursery.name,
                        quantity: nursery.takersSalaries
                    });
                    rs.takersSalaries.total += nursery.takersSalaries;

                    rs.totalMoney.nurseries.push({
                        name: nursery.name,
                        quantity: nursery.totalMoney
                    });
                    rs.totalMoney.total += nursery.totalMoney;
                })
            res.status(200).send(rs);
            }
        });
}

//get nurseries statistics
module.exports.getStatistics = async (req, res) => {

    await Nursery.aggregate([{
        $group : {
            _id : null,
            nurseries: {
                $sum: 1
            },
            trees : {
                $sum : "$totalTrees"
            },
            money : {
                $sum: "$totalMoney"
            }, 
            workers: {
                $sum: "$workers"
            }
        }
    }],function(err, docs) {
        if (err) {
            console.log(err);
            res.status(400).send(err.message)
        } else {
            console.log("Nurseries statistics sent.")
            res.send({
                nurseries: docs[0].nurseries,
                trees: docs[0].trees,
                money: docs[0].money,
                workers: docs[0].workers
            });
        }
    });
}

//Read Nursery by id
module.exports.getNurseryById = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).send("Unkown Id : " + req.params.id);
    } else {
        Nursery
            .findById(req.params.id, (err, docs) => {
                if (err) {
                    console.log(err)
                    res.status(500).send("something goes wrong !!!");
                }
                else if (!docs) res.status(400).send("Id doesn't exist");
                else res.send(docs);
            })       
    }
}

//create a Nursery
module.exports.addNursery = (req, res) => {
    const nursery = new Nursery({
        name: req.body.name,
        partner: req.body.partner,
        region: req.body.region,
        province: req.body.province,
        commune: req.body.commune,
        createdAt: req.body.createdAt
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
                ...req.body,
                updatedAt: Date.now()
            },
            { new: true },
            (err, docs) => {
                if (err) res.status(500).send(err.message);
                else if (!docs) res.status(400).send("Id doesn't exist");
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

//add or remove trees/materials in a nursery
module.exports.editNursery = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : '+req.params.id);
    } 
    else {
        Nursery.findByIdAndUpdate(
            req.params.id,
            {   
                $inc: {
                    ...req.body,
                    totalTrees: functions.objSum(req.body)
                },
                updatedAt: Date.now(),
            },
            { new: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("something goes wrong !!!")
                }
                else if (!docs) res.status(400).send("Id doesn't exist");
                else {
                    console.log("Nursery editted.")
                    res.status(200).send(docs)
                }
            }
        );
    }
}
