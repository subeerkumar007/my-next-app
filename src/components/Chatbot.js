import { useState } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userInput.trim()) { 
      return; 
    }

    setMessages([...messages, { role: 'user', content: userInput }]);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();

      setMessages([...messages, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error(error);
      // Handle errors appropriately (e.g., display an error message to the user)
      setMessages([...messages, { role: 'assistant', content: 'An error occurred.' }]); 
    }

    setUserInput('');
  };

  return (
    <div>
      <div className="chat-history">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={userInput} 
          onChange={(e) => setUserInput(e.target.value)} 
          placeholder="Type your message..." 
        />
        <button type="submit">Send</button>
      </form>
      <style jsx>{`
        .chat-history {
          max-height: 400px; 
          overflow-y: auto; 
          margin-bottom: 10px; 
        }
        .chat-message {
          padding: 10px; 
          border-radius: 5px; 
          margin-bottom: 5px; 
        }
        .chat-message.user {
          background-color: #e6e6e6; 
        }
        .chat-message.assistant {
          background-color: #cfe2ff; 
        }
      `}</style>
    </div>
  );
}

export default Chatbot;