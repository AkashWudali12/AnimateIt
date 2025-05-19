import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatBox.module.css';
import DiagramAnimation from './DiagramAnimation.jsx';

// Chemistry animation SVGs: H2O formation
const chemistrySvgs = [
  // Step 1: Show two H atoms and one O atom
  <svg width="300" height="120" viewBox="0 0 300 120">
    <circle cx="60" cy="60" r="28" fill="#60a5fa" />
    <text x="60" y="67" textAnchor="middle" fontSize="24" fill="#fff">H</text>
    <circle cx="240" cy="60" r="28" fill="#f87171" />
    <text x="240" y="67" textAnchor="middle" fontSize="24" fill="#fff">O</text>
    <circle cx="150" cy="100" r="28" fill="#60a5fa" />
    <text x="150" y="107" textAnchor="middle" fontSize="24" fill="#fff">H</text>
  </svg>,
  // Step 2: Show bonds forming
  <svg width="300" height="120" viewBox="0 0 300 120">
    <circle cx="60" cy="60" r="28" fill="#60a5fa" />
    <text x="60" y="67" textAnchor="middle" fontSize="24" fill="#fff">H</text>
    <circle cx="240" cy="60" r="28" fill="#f87171" />
    <text x="240" y="67" textAnchor="middle" fontSize="24" fill="#fff">O</text>
    <circle cx="150" cy="100" r="28" fill="#60a5fa" />
    <text x="150" y="107" textAnchor="middle" fontSize="24" fill="#fff">H</text>
    <line x1="80" y1="70" x2="220" y2="70" stroke="#222" strokeWidth="4" />
    <line x1="75" y1="75" x2="150" y2="100" stroke="#222" strokeWidth="4" />
    <line x1="225" y1="75" x2="150" y2="100" stroke="#222" strokeWidth="4" />
  </svg>,
  // Step 3: Show the H2O molecule
  <svg width="300" height="120" viewBox="0 0 300 120">
    <circle cx="120" cy="80" r="28" fill="#60a5fa" />
    <text x="120" y="87" textAnchor="middle" fontSize="24" fill="#fff">H</text>
    <circle cx="180" cy="80" r="28" fill="#60a5fa" />
    <text x="180" y="87" textAnchor="middle" fontSize="24" fill="#fff">H</text>
    <circle cx="150" cy="40" r="32" fill="#f87171" />
    <text x="150" y="50" textAnchor="middle" fontSize="28" fill="#fff">O</text>
    <line x1="150" y1="72" x2="120" y2="80" stroke="#222" strokeWidth="4" />
    <line x1="150" y1="72" x2="180" y2="80" stroke="#222" strokeWidth="4" />
  </svg>
];

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I'm your assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [displayDiagram, setDisplayDiagram] = useState(null);
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
      diagramKeyRef.current += 1;
      setDisplayDiagram({ svgs: chemistrySvgs, key: diagramKeyRef.current });
      setMessages((msgs) => [
        ...msgs,
        { sender: 'bot', text: 'Chemistry animation rendered.' }
      ]);
    }, 600);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        {displayDiagram && displayDiagram.svgs && (
          <DiagramAnimation
            key={displayDiagram.key}
            svgs={displayDiagram.svgs}
            width={300}
            height={140}
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