import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI("AIzaSyDXpeE-cheNVGRdQR7H9U8cN9wF7lUzxtA"); // ⚠ API Key is exposed

  const handleGenerate = async () => {
    setLoading(true);
    setResponse("");
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(input);
      setResponse(result.response.text());
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-100 p-4">
      <div className="bg-gray-700 shadow-lg rounded-lg p-6 max-w-xl w-full">
        <h1 className="text-2xl font-bold text-cyan-100 mb-4 text-center">AI Text Generator</h1>
        <label className="block text-cyan-100 text-sm font-semibold mb-2">Enter Text Here:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border border-cyan-300 text-cyan-200 placeholder-cyan-100 rounded-md focus:outline-none focus:scale-102 transition-all duration-100 ease-in-out focus:ring-2 focus:ring-cyan-500"
          placeholder="Type something..."
        />
        <button
          onClick={handleGenerate}
          className="mt-4 w-full bg-cyan-500 text-gray-700 font-semibold py-2 rounded-md hover:bg-cyan-600 hover:scale-101 transition-all ease-in active:scale-101 transition-all duration-100 ease-in-out flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5"></span>
          ) : (
            "Generate"
          )}
        </button>
        <div className="mt-4 p-3 bg-gray-50 border bg-gray-600 border-cyan-200 rounded-md">
          <strong className="text-cyan-100">AI Response:</strong>
          {loading ? (
            <p className="mt-2 text-cyan-100 animate-pulse">Generating response...</p>
          ) : (
            <p className="mt-2 text-cyan-100 whitespace-pre-wrap">{response || "No response yet..."}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
