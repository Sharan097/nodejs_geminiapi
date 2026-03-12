
// import "dotenv/config";
// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY
// });

// async function generate() {
//   try {

//     const response = await ai.models.generateContent({
//       model: "gemini-flash-latest",
//       contents: "Explain the value of pi in mathematics"
//     });

//     console.log(response.text);

//   } catch (err) {
//     console.error("Error:", err.message);
//   }
// }

// generate();






import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

/* Middleware */

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Gemini AI Setup */

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

/* Test Route */

app.get("/", (req, res) => {
  res.send("Gemini AI API is running 🚀");
});

/* Generate AI Response */

app.post("/generate", async (req, res) => {
  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: message
    });
    res.json({
      success: true,
      reply: response.text
    });
    console.log("AI Response:", response.text);

  } 
  catch (error) {
     console.error(error);

    res.status(500).json({
      success: false,
      error: "AI generation failed"
    });

  }
});

/* Start Server */

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});