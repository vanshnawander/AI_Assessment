const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema({
    option:{type:String,required:true},
    isCorrect:{type:Boolean},
});

const QuestionSchema = new mongoose.Schema({
question : {type:String,required:true},
imageurl : {type:String},
options : [OptionSchema],
difficulty:{type:String,required:true},
category:{type:String,required:true},
createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
},{timestamps:true});

const QuestionModel =mongoose.model('Question',QuestionSchema);

module.exports = QuestionModel;