import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DiagramAnimation from './components/DiagramAnimation.jsx'
import ChatBox from './components/ChatBox.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChatBox />
  </StrictMode>
);
