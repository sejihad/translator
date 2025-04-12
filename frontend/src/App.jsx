// App.jsx
import { useState } from "react";
const API_URL = "";
function App() {
  const [banglaText, setBanglaText] = useState("");
  const [englishText, setEnglishText] = useState("");

  const startListening = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "bn-BD";
    recognition.start();

    recognition.onresult = async (event) => {
      const spoken = event.results[0][0].transcript;
      setBanglaText(spoken);

      // Translate
      const res = await fetch("http://localhost:5000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: spoken }),
      });
      const data = await res.json();
      setEnglishText(data.translatedText);
    };
  };

  const playVoice = () => {
    const utter = new SpeechSynthesisUtterance(englishText);
    utter.lang = "en-US";
    window.speechSynthesis.speak(utter);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>🎤 বাংলা ➝ ইংরেজি ভয়েস ট্রান্সলেটর</h2>
      <button onClick={startListening}>🎙️ কথা বলুন</button>
      <button onClick={playVoice} disabled={!englishText}>
        ▶️ ইংরেজি শুনুন
      </button>
      <p>বাংলা: {banglaText}</p>
      <p>ইংরেজি: {englishText}</p>
    </div>
  );
}

export default App;
