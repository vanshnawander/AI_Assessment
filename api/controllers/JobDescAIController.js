const fs = require("fs");
const pdfParser = require("pdf-parse");
const { Question } = require("../models/Question");
const OpenAI = require("openai");
const { generateEmbedding } = require("./EmbeddingGeneratorController");

const openai = new OpenAI((apiKey = process.env.OPENAI_API_KEY));

function AIresponseGPT(text) {
  return new Promise(async (resolve, reject) => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are an Assistant who creates tests. Based on the given job description, generate a prompt to select the most relevant concepts on which questions can be asked. Return only concept names.",
          },
          { role: "user", content: text },
        ],
        model: "gpt-3.5-turbo",
      });

      // console.log(completion.choices[0]);
      const response = completion.choices[0];
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

const JobDescriptionGenerator = async (req, res) => {
  try {
    const filePath = req.file.path;
    const numques = req.body.numques;
    const numquesInt = parseInt(numques);
    const fileContent = fs.readFileSync(filePath);
    const pdfData = await pdfParser(fileContent);
    // Process the PDF file content (example: using pdf-parse library)
    const response = await AIresponseGPT(pdfData.text);
    //console.log(response.message.content);
    const embeddings = await generateEmbedding(response.message.content);

    const pipeline = [
      {
        $vectorSearch: {
          queryVector: embeddings,
          path: "embedding",
          numCandidates: 100,
          limit: numquesInt,
          index: "default",
        },
      },
      {
        $project: {
          question: 1,
          options: 1,
          difficulty: 1,
          category: 1,
          embeddings: 1,
        },
      },
    ];
    const results = await Question.aggregate(pipeline);
    res.status(200).json(results);

    fs.unlinkSync(filePath);
  } catch (error) {
    console.error("Error processing file:", error.message);
    res.status(500).send("Error processing file");
  }
};

module.exports = { JobDescriptionGenerator };
