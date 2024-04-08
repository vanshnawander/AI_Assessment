const express = require("express");
const router = express.Router();
const {submitTest,getTestQuestions} = require('../controllers/TestController')

router.post("/submitTest",submitTest);
router.post("/getquestionsfortest",getTestQuestions);

module.exports = router;
