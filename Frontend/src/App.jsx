import React, { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Analytics } from '@vercel/analytics/react'
import { Sparkles, Loader2, MessageSquareText } from "lucide-react"; // icons

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      const res = await axios.post(`https://anvika-ai-bot.onrender.com/ask-ai`, { prompt });
      setResponse(res.data.reply || "No response from Anvika.");
    } catch (err) {
      console.error("Error:", err);
      setResponse("Anvika is currently unavailable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-purple-100 via-indigo-100 to-blue-100">
      <Navbar />
    
      <main className="flex-grow flex items-center justify-center p-4 mt-20">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 animate-fade-in transition-all">
          <h1 className="text-4xl font-bold text-center text-indigo-700 mb-4 tracking-wide flex items-center justify-center gap-2">
            <Sparkles className="w-7 h-7 text-purple-600 animate-bounce" />
            Meet <span className="text-purple-600">Anvika</span>
          </h1>
          <p className="text-center text-gray-600 mb-8 italic">
            Your thoughtful AI big sister is here to help 💬
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <textarea
              className="w-full p-4 border border-indigo-200 rounded-xl shadow-sm resize-none focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              placeholder="What's on your mind? Ask Anvika..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
            />
            <button
              type="submit"
              className={`py-3 px-6 font-semibold rounded-xl text-white text-lg transition duration-300 flex items-center justify-center gap-2 ${
                loading
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 shadow-md"
              }`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" /> Anvika is thinking...
                </>
              ) : (
                <>
                  <MessageSquareText className="w-5 h-5" /> Ask Anvika
                </>
              )}
            </button>
          </form>
               <Analytics />
          <div className="mt-8 bg-indigo-50 p-6 rounded-xl border border-indigo-200 shadow-inner transition-all">
            <h2 className="text-xl font-semibold text-indigo-800 mb-2">
              Anvika says:
            </h2>
            <p className="text-gray-800 whitespace-pre-line">
              {response || "Waiting for your first question..."}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
