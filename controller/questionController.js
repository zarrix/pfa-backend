const ObjectId = require("mongoose").Types.ObjectId;

// Models
const Question = require('../models/question');

//get Questions
module.exports.getQuestions = (req, res) => {
    const filter = (req.query.onlyWithAnswers === 'true') ? { answer: { $ne: null } } : {};
    Question
        .find(filter, (err, docs) => {
            if (err) console.log('Error while reading data : ' + err);
            else res.send(docs)
        })
        .sort( {askedAt: -1} )
}

// get Question by id
module.exports.getQuestionById = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).send("Unkown Id : " + req.params.id);
    } else {
        Question
            .findById(req.params.id, (err, docs) => {
                if (err) console.log('Error while reading data : ' + err);
                else res.send(docs);
            })  
    }
}

//Add a Question to mongoDB
module.exports.addQuestion = (req, res) => {
    const question = new Question({
        question: req.body.question,
    });
    question.save()
       .then(() => {
            console.log('Question added successfully ...');
            res.status(201).json(question);
        })
       .catch(err => console.log(err));
}

//add or update a Q
module.exports.updateQuestion = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : '+req.params.id);
    }
    else {
        Question.findByIdAndUpdate(
            req.params.id,
            {   
                answer: req.body.answer,
            },
            { new: true },
            (err, docs) => {
                if (err) res.status(500).send(err.message);
                else {
                    console.log("Question updated.");
                    res.status(200).send(docs)
                }
            }
        );
    }
}

//delete a Question
module.exports.deleteQuestion = (req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id :');
    } 
    else {
        Question.findByIdAndDelete(
            req.params.id, 
            (err, docs) => {
                if (err) res.status(500).send(err.message);
                else {
                    console.log("Question deleted.");
                    res.status(200).send(docs)
                }
            }
        );  
    }  
}