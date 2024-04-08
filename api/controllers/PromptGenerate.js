const  Question  = require("../models/Question");
const { generateEmbedding } = require("./EmbeddingGeneratorController");


const PromptGenerate = async (req,res)=>{
    const {text,numques} = req.body;
    const numquesInt = parseInt(numques);
    const embeddings = await generateEmbedding(text);
    const pipeline = [
        {
            $vectorSearch:{
                queryVector:embeddings,
                path: "embedding",
        numCandidates: 100,
        limit: numquesInt,
     index: "default",
            }
        },
        {
            $project:{
                question:1,
                options:1,
                difficulty:1,
                category:1,
                embeddings:1
            }
        }
    ];
      const results = await Question.aggregate(pipeline);
    res.status(200).json(results);
};

module.exports = {PromptGenerate};