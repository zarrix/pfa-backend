
// Models
const Farmer = require('../models/farmer');
const Association = require('../models/association');
const School = require('../models/school')

//get nurseries statistics
module.exports.getStatistics = async (req, res) => {

    let info = {};

    await Farmer.countDocuments({}, function(err, c) {
        if (err) {
            console.log(err);
            res.status(400).send(err.message)
        } else {
            info["requests"] = c
            info["farmers"] = c;
        }
    });

    await Association.countDocuments({}, function(err, c) {
        if (err) {
            console.log(err);
            res.status(400).send(err.message)
        } else {
            info["requests"] += c
            info["associations"] = c;
        }
    });

    await School.countDocuments({}, function(err, c) {
        if (err) {
            console.log(err);
            res.status(400).send(err.message)
        } else {
            info["requests"] += c
            info["school"] = c;
            res.status(200).send(info);
        }
    });

    

}