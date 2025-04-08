import axios from "axios";
import React, { useState } from "react";

// API URL
const API_URL = "https://translator-api-eight.vercel.app"; // আপনার সার্ভারের URL এখানে ব্যবহার করুন

function VoiceTranslation() {
  const [transcribedText, setTranscribedText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  // Start voice recognition
  const startListening = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "bn-BD";
    recognition.start();

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;
      setTranscribedText(text);
      await translateText(text);
    };
  };

  // Translate Bengali to English
  const translateText = async (text) => {
    try {
      const response = await axios.post(`${API_URL}/translate`, { text });
      setTranslatedText(response.data.translatedText);
      await getSpeechAudio(response.data.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  // Get English speech from text
  const getSpeechAudio = async (text) => {
    try {
      const response = await axios.post(
        `${API_URL}/tts`,
        { text },
        {
          responseType: "arraybuffer",
        }
      );
      const audioBlob = new Blob([response.data], { type: "audio/mp3" });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error("TTS error:", error);
    }
  };

  // Play audio
  const playAudio = () => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div className="container text-center mt-5">
      <h2>বাংলা থেকে ইংরেজি ভয়েস ট্রান্সলেশন</h2>
      <button onClick={startListening} className="btn btn-primary mt-3">
        🎤 বলুন
      </button>
      {transcribedText && <p>বাংলা: {transcribedText}</p>}
      {translatedText && <p>ইংরেজি: {translatedText}</p>}
      {translatedText && (
        <button onClick={playAudio} className="btn btn-success mt-3">
          🔊 শোনো
        </button>
      )}
    </div>
  );
}

export default VoiceTranslation;
