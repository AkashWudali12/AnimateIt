import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatBox.module.css';
import DiagramAnimation from './DiagramAnimation.jsx';

// Dummy bot reply for demonstration
const getBotReply = (userMsg) => {
  if (!userMsg.trim()) return null;
  // Example: always return a two-node linked list diagram
  return [
    { type: 'node', x: 50, y: 30, value: 1 },
    { type: 'arrow', x1: 90, y1: 50, x2: 150, y2: 50 },
    { type: 'node', x: 150, y: 30, value: 2 }
  ];
};

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I'm your assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [displayDiagram, setDisplayDiagram] = useState({ elements: null, key: 0 });
  const chatEndRef = useRef(null);
  const diagramKeyRef = useRef(1);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input;
    setMessages((msgs) => [...msgs, { sender: 'user', text: userMsg }]);
    setInput('');
    setTimeout(() => {
      const elements = getBotReply(userMsg);
      if (elements) {
        diagramKeyRef.current += 1;
        setDisplayDiagram({ elements, key: diagramKeyRef.current });
        setMessages((msgs) => [
          ...msgs,
          { sender: 'bot', text: 'Diagram rendered.' }
        ]);
      } else {
        setMessages((msgs) => [
          ...msgs,
          { sender: 'bot', text: 'Please enter a message.' }
        ]);
      }
    }, 600);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        {displayDiagram.elements && (
          <DiagramAnimation
            key={displayDiagram.key}
            elements={displayDiagram.elements}
            svgWidth={250}
            svgHeight={100}
            viewBox="0 0 250 100"
          />
        )}
      </div>
      <div className={styles.rightPanel}>
        <div className={styles.chatHistory}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`${styles.message} ${msg.sender === 'user' ? styles.user : styles.bot}`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form className={styles.inputBar} onSubmit={handleSend}>
          <input
            className={styles.input}
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
          />
          <button className={styles.sendButton} type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}