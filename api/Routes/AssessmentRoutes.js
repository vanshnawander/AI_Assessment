const express = require("express");
const router = express.Router();

const {
    CreateAssessment,
    AddQuestionsToAssessment,
    EditAssessment,
    getLiveAssessments,
    getDraftAssessments,
    getAssessmentsData,
    getAssessmentById,
  } = require('../controllers/AssessmentsController')


router.post("/createassessment", CreateAssessment);

router.post("/addquestiontoassessment", AddQuestionsToAssessment);

router.get('/editassessment/:assessmentid', EditAssessment);

router.post('/liveassessment', getLiveAssessments);

router.post('/draftassessment', getDraftAssessments);

router.get('/getassessment/:assessmentid', getAssessmentById);

router.post('/getassessmentsdata', getAssessmentsData);


module.exports = router;