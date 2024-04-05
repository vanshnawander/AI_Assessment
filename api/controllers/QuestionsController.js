const Question = require("../models/Question");
const Assessment = require("../models/Assessment");

const CreateQuestion = async (req, res) => {
  try {
    const { question, options, difficulty, category, userId } = req.body;

    const createdquestion = await Question.create({
      question,
      options,
      difficulty,
      category,
      createdBy: userId,
    });

    res.status(201).json(createdquestion);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getQuestions = async (req, res) => {
  try {
    let filter = req.body.filter;
    if (filter === undefined) {
      const questions = await Question.find();
      res.status(200).json(questions);
    } else {
      const questions = await Question.find({ category: filter });
      res.status(200).json(questions);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getQuestionCategories = async (req, res) => {
  try {
    const categories = await Question.find().distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


const getQuestionsOfAssessment = async (req, res) => {
  try {
    const { assessmentid } = req.body;
    const questions_ids = await Assessment.findOne({ _id: assessmentid });
    const questions = await Question.find(
      { _id: { $in: questions_ids.questions } }
    ).select({ "question": 1, "difficulty": 1, "category": 1 }).limit(0);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

const removeQuestionFromAssesment = async (req, res) => {
  try {
    const { assessmentid, questionId } = req.body;
    const assessment = await Assessment.findOne({ _id: assessmentid });
    if (!assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }
    const questions = assessment.questions;
    const index = questions.indexOf(questionId);
    if (index > -1) {
      questions.splice(index, 1);
    } else {
      return res.status(404).json({ error: "Question not found in assessment" });
    }
    assessment.questions = questions;
    await assessment.save();
    res.status(200).json(assessment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}



module.exports = { CreateQuestion, getQuestions, getQuestionCategories,getQuestionsOfAssessment, removeQuestionFromAssesment };
