import speech from "@google-cloud/speech";
import translate from "@vitalets/google-translate-api";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import gTTS from "gtts";
import { Readable } from "stream";

const app = express();
const port = process.env.PORT || 5000;

// Middleware for CORS and JSON Parsing
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Google Cloud Speech-to-Text client setup
const client = new speech.SpeechClient();

// Health check route
app.get("/", (req, res) => {
  res.json("Server is running!");
});

// Speech-to-Text endpoint (Converts Audio to Text)
app.post("/stt", async (req, res) => {
  try {
    const audio = req.body.audio; // Audio in Base64
    if (!audio) {
      return res
        .status(400)
        .json({ success: false, message: "Audio data is required" });
    }

    // Configure the Speech-to-Text request
    const request = {
      audio: { content: audio },
      config: {
        encoding: "LINEAR16",
        sampleRateHertz: 16000,
        languageCode: "bn-BD", // Bengali (Bangladesh)
      },
    };

    // Call the Google Cloud Speech API to transcribe the audio
    const [response] = await client.recognize(request);
    const transcript = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");

    res.json({ success: true, text: transcript });
  } catch (error) {
    console.error("Error occurred in /stt:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Translate Bengali Text to English
app.post("/translate", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res
        .status(400)
        .json({ success: false, message: "Text is required for translation" });
    }

    // Call Google Translate API to translate text
    const translated = await translate(text, { from: "bn", to: "en" });
    res.json({ success: true, translatedText: translated.text });
  } catch (error) {
    console.error("Error occurred in /translate:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Text-to-Speech (TTS) API - Converts Text to Speech (MP3)
app.post("/tts", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res
        .status(400)
        .json({ success: false, message: "Text is required for TTS" });
    }

    const gtts = new gTTS(text, "en");

    // Convert the audio to a stream and pipe it to the response
    const stream = Readable.from(gtts.stream());

    res.setHeader("Content-Type", "audio/mp3");
    stream.pipe(res); // Pipe the audio stream to the response
  } catch (error) {
    console.error("Error occurred in /tts:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
