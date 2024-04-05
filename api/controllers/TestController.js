const CandidateResponse = require('../models/CandidateResponses');
const Assessment = require('../models/Assessment');
const Question = require('../models/Question');

const submitTest = async (req, res) => {
    try {
        const { assessmentId, email, selectedOptions } = req.body;
        const createdResponse = await CandidateResponse.create({
            email,
            isAttempted: true,
            assessmentId: assessmentId,
            responses: selectedOptions,
        });
        res.status(201).json(createdResponse);
    } catch (error) {
        res.status(500).json({ error: 'Test didnot submit successfully' });
    }
};

const getTestQuestions = async (req, res) => {
    try {
        const { assessmentid, email } = req.body;
        const candidates = await CandidateResponse.findOne({
            email: email,
            assessmentId: assessmentid,
        });
        if (candidates.isAttempted === true) {
            res.status(200).json('already attempted');
        } else {
            const questions_ids = await Assessment.findOne({
                _id: assessmentid,
                assessmentstatus: 'live',
            });
            const questions = await Question.find({
                _id: { $in: questions_ids.questions },
            }).select({ question: 1, 'options.option': 1, 'options._id': 1 }).limit(0);
            res.status(200).json(questions);
        }
    } catch (error) {
        console.log(error); 
        res.status(500).json({ error: 'error in retreving questions for test' });
    }
};

module.exports = { submitTest, getTestQuestions };

