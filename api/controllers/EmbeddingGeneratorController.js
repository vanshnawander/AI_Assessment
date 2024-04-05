import axios from "axios";

const generateEmbedding = async (text) => {
  hf_token = "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";
  embedding_url =
    "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2";
  try {
    const response = await axios.post(
      embedding_url,
      {
        inputs: text,
      },
      {
        headers: {
          Authorization: `Bearer ${hf_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Request failed with status code ${error.response.status}: ${error.response.data}`
      );
    } else {
      throw new Error(`Error in generating embedding: ${error.message}`);
    }
  }
};
module.exports = { generateEmbedding };
