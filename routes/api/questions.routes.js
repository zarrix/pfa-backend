const router = require('express').Router();

//include Controller 
const questionController = require('../../controller/questionController');

//get questions
router.get('/', questionController.getQuestions);

//get question by id
router.get('/:id', questionController.getQuestionById);

//create a question
router.post('/', questionController.addQuestion);

//add or update an answer
router.put('/:id', questionController.updateQuestion)

//delete a question
router.delete("/:id", questionController.deleteQuestion);




module.exports = router;