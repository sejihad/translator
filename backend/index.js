// server.js
import cors from "cors";
import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/translate", async (req, res) => {
  const { text } = req.body;

  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=bn|en`
    );
    const data = await response.json();
    const translatedText = data?.responseData?.translatedText || "";
    res.json({ translatedText });
  } catch (err) {
    res.status(500).json({ error: "Translation failed" });
  }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
