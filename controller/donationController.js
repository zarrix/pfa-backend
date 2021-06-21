// Models
const Donation = require('../models/donation');
const Project = require('../models/project');
const Donor = require('../models/donor');

//get donations
module.exports.getDonations = (req, res) => {
    Donation
        .find((err, docs) => {
            if (err) console.log('Error while reading data : ' + err);
            else res.send(docs)
        })
        .sort( {donatedAt: -1} )
}

// get donation by id
module.exports.getDonationById = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).send("Unkown Id : " + req.params.id);
    } else {
        Donation
            .findById(req.params.id, (err, docs) => {
                if (err) console.log('Error while reading data : ' + err);
                else res.send(docs);
            })  
    }
}

//Add a Donation to mongoDB
module.exports.addDonation = (req, res) => {
    const donation = new Donation({
        projectId: req.body.projectId,
        donorId: req.body.donorId,
        amount: req.body.amount
    });
    donation.save()
       .then(() => {
            console.log('Donation added successfully ...');
            res.status(201).json(donation);
            Project.findByIdAndUpdate(
                req.body.projectId,
                {   
                    updatedAt: Date.now(),
                    $inc: {totalDons: req.body.amount},
                    $addToSet: { donations: {
                        donorId: req.body.donorId,
                        amount: req.body.amount
                    } },
                },
                { new: true },
                (err, docs) => {
                if (err) console.log(err);
                else console.log("Donation added to project information.");
                }
            )
            Donor.findByIdAndUpdate(
                req.body.donorId,
                {   
                    $addToSet: { donations: {
                        projectId: req.body.projectId,
                        amount: req.body.amount
                    } },
                },
                { new: true },
                (err, docs) => {
                if (err) console.log(err);
                else console.log("Donation added to Donor information.");
                }
            );
        })
       .catch(err => console.log(err));
}

//delete a donation
module.exports.deleteDonation = (req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id :');
    } 
    else {
        Donation.findOneAndDelete(
            req.params.id, 
            (err, docs) => {
                if (err) res.status(500).send(err.message);
                else {
                    console.log("Donation deleted.");
                    res.status(200).send(docs)
                }
            }
        );  
    }  
}