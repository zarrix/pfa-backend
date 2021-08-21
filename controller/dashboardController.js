// Models
const Nursery = require('../models/nursery');
const Farmer = require('../models/farmer');
const Data = require('../models/data');

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
    await Farmer.countDocuments({}, function(err, c) {
        if (err) {
            console.log(err);
            res.status(400).send(err.message)
        } else {
            info["farmers"]=c;
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


module.exports.getData = (req, res) => {

  Data
      .find({}, (err, docs) => {
          if (err) console.log('Error while reading data : ' + err);
          else res.send(docs)
      })
}

module.exports.addData = (req, res) => {

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  const data = new Data({
      [year]: {[month]: "hello"}
  })
  data.save()
      .then(() => {
          console.log('data added successfully.');
          res.status(201).json(data);
      })
      .catch(err => console.log(err));
}