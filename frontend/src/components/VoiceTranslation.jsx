import React, { useState } from "react";
const API_URL = "https://your-backend-url.vercel.app"; // Vercel backend URL

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
      const res = await fetch(`${API_URL}/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setTranslatedText(data.translatedText);
      await getSpeechAudio(data.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  // Get English speech from text
  const getSpeechAudio = async (text) => {
    try {
      const res = await fetch(`${API_URL}/tts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const audioBlob = await res.blob(); // Get the audio as a blob
      const audioUrl = URL.createObjectURL(audioBlob); // Create a URL for the blob
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
      {audioUrl && (
        <button onClick={playAudio} className="btn btn-success mt-3">
          🔊 শোনো
        </button>
      )}
    </div>
  );
}

export default VoiceTranslation;
