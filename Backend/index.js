require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const axios = require("axios");
const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

// ✅ Middleware should be at the top
app.use(cors());
app.use(express.json()); // ✅ IMPORTANT to parse JSON

// Simple GET test route
app.get("/", (req, res) => res.send("MCP AI Server running"));

// ✅ AI Route for Postman
app.post("/ask-ai", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const aiReply = await getAIResponse(prompt);
    res.json({ reply: aiReply });
  } catch (err) {
  console.error("OpenAI Error:", err.response?.data || err.message || err);
  return "AI is currently unavailable.";
}
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("sendMessage", async (msg) => {
    io.emit("receiveMessage", `🧑: ${msg}`);
    if (msg.toLowerCase().includes("@bot")) {
      const aiReply = await getAIResponse(msg);
      io.emit("receiveMessage", `🤖: ${aiReply}`);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// AI Response Function
async function getAIResponse(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
   const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const response = await axios.post(url, {
    contents: [{ parts: [{ text: prompt }] }],
  });

  return response.data.candidates[0].content.parts[0].text;
}


server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
