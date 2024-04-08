const CandidateResponse = require("../models/CandidateResponses");
const Question = require("../models/Question");

const GetInvitedCandidates = async (req, res) => {
  const { assessmentId } = req.body;
  const candidates = await CandidateResponse.find({
    assessmentId: assessmentId,
  }).select({ email: 1, isAttempted: 1 });
  res.status(200).json(candidates);
};


const getCandidatesReport = async (req, res) => {
  const { candidateId } = req.body;
  const candidate = await CandidateResponse.findOne({ _id: candidateId });
  if (!candidate) {
    return res.status(404).json({ error: "Candidate not found" });
  }
  totalScore = 0;
  const responses = [];
  for (let i = 0; i < candidate.responses.length; i++) {
    const response = candidate.responses[i];
    //console.log("response", response.optionId);
    const question = await Question.findOne({ _id: response.questionId });
   //console.log("question",JSON.stringify(question.options[0]._id));
   const optionselected= question.options.find((option) => JSON.stringify(option._id)===JSON.stringify(response.optionId)).option
   const correctoption= question.options.find((option) => option.isCorrect).option 
   if (optionselected === correctoption) {
    totalScore += question.score;
  }
    responses.push({
      question: question.question,
      selectedOption: optionselected,
      correctOption: correctoption,
    });
  }
  candidate.totalScore = totalScore;
  await candidate.save();
  const finalresponse = {
    candidate: candidate.email,
    responses: responses,
    totalScore: candidate.totalScore,
  };
  res.status(200).json(finalresponse);

}


module.exports = { GetInvitedCandidates, getCandidatesReport};
