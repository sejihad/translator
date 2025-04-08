const express = require("express");
const bodyParser = require("body-parser");
const { TextToSpeechClient } = require("@google-cloud/text-to-speech");
const fs = require("fs");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const textToSpeechClient = new TextToSpeechClient();

app.post("/translate", async (req, res) => {
  try {
    const { voiceInput } = req.body;

    // Step 1: Translate the voiceInput (dummy translation for now)
    const translatedText = `Translated to English: ${voiceInput}`;

    // Step 2: Convert translated text to speech (Google Text-to-Speech API)
    const [ttsResponse] = await textToSpeechClient.synthesizeSpeech({
      input: { text: translatedText },
      voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
      audioConfig: { audioEncoding: "MP3" },
    });

    const audioUrl = `data:audio/mp3;base64,${ttsResponse.audioContent.toString(
      "base64"
    )}`;

    res.json({ translatedText, audioUrl });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error in translation process");
  }
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
