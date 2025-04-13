import { useState } from "react";

function App() {
  const [banglaText, setBanglaText] = useState("");
  const [englishText, setEnglishText] = useState("");

  const startListening = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "bn-BD";
    recognition.interimResults = false;
    recognition.start();

    recognition.onresult = async (event) => {
      const spokenText = event.results[0][0].transcript;
      setBanglaText(spokenText);

      try {
        const res = await fetch(
          `https://translator-api-nine.vercel.app/translate`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: spokenText }),
          }
        );
        const data = await res.json();
        setEnglishText(data.translatedText);
      } catch (err) {
        console.error("Translation error:", err);
      }
    };
  };

  const playVoice = () => {
    if (!englishText) return;
    const utterance = new SpeechSynthesisUtterance(englishText);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>বাংলা ➝ ইংরেজি ভয়েস ট্রান্সলেটর</h2>
      <button onClick={startListening}>🎤 কথা বলুন</button>
      <button onClick={playVoice} disabled={!englishText}>
        ▶️ ইংরেজি শুনুন
      </button>

      <p>বাংলা টেক্সট: {banglaText}</p>
      <p>ইংরেজি অনুবাদ: {englishText}</p>
    </div>
  );
}

export default App;
