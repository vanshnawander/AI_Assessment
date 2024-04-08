const mongoose = require("mongoose");

const responses = new mongoose.Schema({
    questionId:{type:String,required:true},
    optionId:{type:String,required:true}
});


const CandidateResponseSchema = new mongoose.Schema({
    email:{type:String,required:true},
    isAttempted:{type:Boolean,required:true},
    assessmentId:{type:String,required:true},
    responses:[responses],
    totalScore:{type:Number},
},{timestamps:true});

const CandidateResponseModel =mongoose.model('CandidateResponse',CandidateResponseSchema);

module.exports = CandidateResponseModel;
