import React, { useState } from 'react';
import './App.css';

function App() {
  const [chatResponse, setChatResponse] = useState(""); // State for chat response

  return (
    <div className="container">
      
      <div className="logo-row">
        <h1>SOC DIGITAL BUDDY</h1>
        <h2>Learn from someone who has already walked the path.</h2>
      </div>

      <div className="response-box">
        <span>{chatResponse}</span> {/* Display chat response */}
      </div>

      <div className="input-row">
        <input type="text" placeholder="Ask a question..." className="user-input" />
        <button className="send-btn">SEND</button>
      </div>
    </div>
  );
}

export default App;
