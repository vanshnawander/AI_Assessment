const mongoose = require("mongoose");


const AssessmentSchema = new mongoose.Schema({
    assessmentName : {type:String,required:true},
    assessmentDescription : {type:String,required:true},
    questions : [{type:mongoose.Schema.Types.ObjectId,ref:'Question'}],
    duration:{type:Number,required:true},
    assessmentstatus:{type:String,required:true},
    assessmentType:{type:String,required:true},
    assessmentTimeSlotStart : {type:Date},
    assessmentTimeSlotEnd : {type:Date},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
},{timestamps:true});

const AssessmentModel =mongoose.model('Assessment',AssessmentSchema);

module.exports = AssessmentModel;
