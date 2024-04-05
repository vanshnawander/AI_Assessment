const express = require("express");
const router = express.Router();
const { CreateQuestion, getQuestions, getQuestionCategories, getQuestionsOfAssessment, removeQuestionFromAssesment } = require('../controllers/QuestionsController');


router.post("/createquestion",CreateQuestion);

router.get("/questions" ,getQuestions);

router.get('/getcategories', getQuestionCategories);

router.post('/getquestions' ,getQuestionsOfAssessment);

router.post('/removequestion' ,removeQuestionFromAssesment);


module.exports = router;