// Models
const Nursery = require('../models/nursery');
const Request = require('../models/request');

//Read donors from mongoDB
module.exports.getInfo = async (req, res) => {
    let info = {};

    await Nursery.countDocuments({}, function(err, c) {
        if (err) {
            console.log(err);
            res.status(400).send(err.message)
        } else {
            info["nurseries"]=c;
        }
    });
    await Request.countDocuments({}, function(err, c) {
        if (err) {
            console.log(err);
            res.status(400).send(err.message)
        } else {
            info["requests"]=c;
        }
    });

    await Nursery.aggregate([{
        $group : {
            _id : null,
            total : {
                $sum : "$totalTrees"
            }
        }
    }],function(err, total) {
        if (err) {
            console.log(err);
            res.status(400).send(err.message)
        } else {
            info["totalTrees"]=total[0].total;
            res.send(info);
        }
    });
}

module.exports.getDTGraph = async (req, res) => {
    let data = {};
    Donation.aggregate(
        [
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$donatedAt" } },
              donations: {
                $sum: "$amount"
              }
            }
          },
          {$sort: { "_id": 1}}
        ],
    
        function(err, result) {
          if (err) {
            console.log(err);
            res.send("Something went wrong.");
          } else {
            res.send(result);
          }
        }
      );

}