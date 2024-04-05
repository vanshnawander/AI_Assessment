const Assessment = require("../models/Assessment");

const CreateAssessment = async (req, res) => {
  try {
    const {
      assessmentName,
      assessmentDescription,
      questions,
      assessmentDuration,
      assessmentType,
      assessmentTimeSlotStart,
      assessmentTimeSlotEnd,
      createdBy,
    } = req.body;

    const createdassessment = await Assessment.create({
      assessmentName,
      assessmentDescription,
      questions,
      duration: assessmentDuration,
      assessmentstatus: "draft",
      assessmentType,
      assessmentTimeSlotStart,
      assessmentTimeSlotEnd,
      createdBy,
    });

    res.status(201).json(createdassessment);
  } catch (error) {
    //console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const AddQuestionsToAssessment = async (req, res) => {
  try {
    const { questionid, assessmentid } = req.body;
    // console.log(req.params);
    // console.log(questionid);
    const addquestion = await Assessment.findOneAndUpdate(
      { _id: assessmentid },
      { $push: { questions: questionid } },
      { new: true }
    );
    //console.log(addquestion);
    res.status(200).json(addquestion);
  } catch (error) {
    //console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const EditAssessment = async (req, res) => {
  try {
    const { assessmentid } = req.params;
    const foundassessment = await Assessment.findOne({ _id: assessmentid });
    if (!foundassessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }
    res.status(200).json(foundassessment);
  } catch (error) {
    //console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getLiveAssessments = async (req, res) => {
  try {
    const { assessmentId } = req.body;
    const activateassessment = await Assessment.findOneAndUpdate(
      { _id: assessmentId },
      { assessmentstatus: "live" },
      { new: true }
    );
    if (!activateassessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }
    res.status(200).json(activateassessment);
  } catch (error) {
    //console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDraftAssessments = async (req, res) => {
  try {
    const { assessmentId } = req.body;
    if (!assessmentId) {
      return res.status(400).json({ error: "Assessment ID is required" });
    }

    const activateassessment = await Assessment.findOneAndUpdate(
      { _id: assessmentId },
      { assessmentstatus: "draft" },
      { new: true }
    );

    if (!activateassessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }

    res.status(200).json(activateassessment);
  } catch (error) {
    //console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAssessmentsData = async (req, res) => {
  try {
    //console.log(req);
    const { assessmentStatus } = req.body;
    //    console.log(assessmentStatus);
    const assessments = await Assessment.find({assessmentstatus: assessmentStatus,}).select({ assessmentName: 1, assessmentDescription: 1 }).sort({ createdAt: -1 });
    res.status(200).json(assessments);
  } catch (error) {
    //console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAssessmentById = async (req, res) => {
  try {
    const { assessmentid } = req.params;
    const assessment = await Assessment.findOne({ _id: assessmentid });
    res.status(200).json(assessment);
  } catch (error) {
   // console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  CreateAssessment,
  AddQuestionsToAssessment,
  EditAssessment,
  getLiveAssessments,
  getDraftAssessments,
  getAssessmentsData,
  getAssessmentById,
};
