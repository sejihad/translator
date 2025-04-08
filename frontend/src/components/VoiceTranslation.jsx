import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [isListening, setIsListening] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [audioOutput, setAudioOutput] = useState(null);

  const startListening = () => {
    setIsListening(true);

    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "bn-BD"; // বাংলা ভাষা
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log("Listening...");
    };

    recognition.onresult = async (event) => {
      const voiceInput = event.results[0][0].transcript;
      console.log("Recognized voice input:", voiceInput);

      try {
        const response = await axios.post(
          `https://translator-api-eight.vercel.app/translate`,
          {
            voiceInput,
          }
        );
        setTranslatedText(response.data.translatedText);
        setAudioOutput(response.data.audioUrl);

        // Play the translated voice
        const audio = new Audio(response.data.audioUrl);
        audio.play();
      } catch (error) {
        console.error("Error in translation:", error);
      }
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.stop();
  };

  useEffect(() => {
    if (!isListening) return;

    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "bn-BD"; // বাংলা ভাষা
    recognition.start();
  }, [isListening]);

  return (
    <div>
      <h1>Voice Translator</h1>
      {!isListening ? (
        <button onClick={startListening}>Start Listening</button>
      ) : (
        <button onClick={stopListening}>Stop Listening</button>
      )}
      <p>Recognized Text: {translatedText}</p>
      {audioOutput && <audio controls src={audioOutput} />}
    </div>
  );
}

export default App;
