import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  
  const genAI = new GoogleGenerativeAI("AIzaSyDXpeE-cheNVGRdQR7H9U8cN9wF7lUzxtA"); // ⚠ API Key is exposed

  const handleGenerate = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(input);
      setResponse(result.response.text());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <label>Enter Text Here:</label>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleGenerate}>Generate</button>
      <div>
        <strong>AI Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
