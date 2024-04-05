const CandidateResponse = require("../models/CandidateResponses");
const Question = require("../models/Question");

const GetInvitedCandidates = async (req, res) => {
  const { assessmentId } = req.body;
  const candidates = await CandidateResponse.find({
    assessmentId: assessmentId,
  }).select({ email: 1, isAttempted: 1 });
  res.status(200).json(candidates);
};

// const CalculateCandidateScore = async (req, res) => {
//   const { assessmentId, email } = req.body;
//   const candidate = await CandidateResponse.findOne({
//     assessmentId: assessmentId,
//     email: email,
//   });
//   if (!candidate) {
//     return res.status(404).json({ error: "Candidate not found" });
//   }
//   let totalScore = 0;
//   candidate.responses.forEach((response) => {
//     const question = await Question.findOne({ _id: response.questionId });
//     const option = question.options.find(
//       (option) => option._id === response.optionId
//     );
//     totalScore += option.score;
//   });
//   candidate.totalScore = totalScore;
//    await candidate.save();
//   res.status(200).json(candidate);
// };

module.exports = { GetInvitedCandidates };
