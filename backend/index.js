// server.js
const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "https://translator-ui-ten.vercel.app",
  })
);
app.use(express.json());

// Translation Route (Free MyMemory API)
app.post("/translate", async (req, res) => {
  const { text } = req.body;
  const response = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=bn|en`
  );
  const data = await response.json();
  res.json({ translatedText: data.responseData.translatedText });
});
app.post("/", (req, res) => {
  res.send("server is running");
});
const PORT = 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
