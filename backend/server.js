import { SpeechClient } from "@google-cloud/speech";
import translate from "@vitalets/google-translate-api";
import cors from "cors";
import express from "express";
import gTTS from "gtts";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Google Speech-to-Text API setup
const client = new SpeechClient();

// Root endpoint to check server status
app.get("/", (req, res) => {
  res.json("Server is running");
});

// Speech-to-Text endpoint
app.post("/stt", async (req, res) => {
  try {
    const audio = req.body.audio; // Base64 encoded audio
    const request = {
      audio: { content: audio },
      config: {
        encoding: "LINEAR16",
        sampleRateHertz: 16000,
        languageCode: "bn-BD",
      },
    };

    const [response] = await client.recognize(request);
    const transcript = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");

    res.json({ success: true, text: transcript });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Translate from Bengali to English
app.post("/translate", async (req, res) => {
  try {
    const { text } = req.body;
    const translated = await translate(text, { from: "bn", to: "en" });
    res.json({ success: true, translatedText: translated.text });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Text-to-Speech API (gTTS)
app.post("/tts", async (req, res) => {
  try {
    const { text } = req.body;
    const gtts = new gTTS(text, "en");
    const filePath = "output.mp3";

    gtts.save(filePath, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
      res.sendFile(__dirname + "/" + filePath);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
