import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DiagramAnimation from './components/DiagramAnimation.jsx'

// Define different types of diagrams
const linkedListElements = [
  { type: 'node', x: 50, y: 30, value: 1 },
  { type: 'arrow', x1: 90, y1: 50, x2: 150, y2: 50 },
  { type: 'node', x: 150, y: 30, value: 2 },
  { type: 'arrow', x1: 190, y1: 50, x2: 250, y2: 50 },
  { type: 'node', x: 250, y: 30, value: 3 },
  { type: 'arrow', x1: 290, y1: 50, x2: 350, y2: 50 },
  { type: 'node', x: 350, y: 30, value: 4 }
];

const binaryTreeElements = [
  // Root node
  { type: 'node', x: 250, y: 30, value: 1 },
  // Left subtree
  { type: 'arrow', x1: 270, y1: 70, x2: 200, y2: 100 },
  { type: 'node', x: 180, y: 120, value: 2 },
  { type: 'arrow', x1: 200, y1: 160, x2: 150, y2: 190 },
  { type: 'node', x: 130, y: 210, value: 4 },
  { type: 'arrow', x1: 200, y1: 160, x2: 250, y2: 190 },
  { type: 'node', x: 230, y: 210, value: 5 },
  // Right subtree
  { type: 'arrow', x1: 270, y1: 70, x2: 340, y2: 100 },
  { type: 'node', x: 320, y: 120, value: 3 },
  { type: 'arrow', x1: 340, y1: 160, x2: 290, y2: 190 },
  { type: 'node', x: 270, y: 210, value: 6 },
  { type: 'arrow', x1: 340, y1: 160, x2: 390, y2: 190 },
  { type: 'node', x: 370, y: 210, value: 7 }
];

// Custom diagram with different styling
const customElements = [
  { type: 'node', x: 50, y: 30, value: 'A' },
  { type: 'arrow', x1: 90, y1: 50, x2: 150, y2: 50 },
  { type: 'node', x: 150, y: 30, value: 'B' },
  { type: 'custom', render: () => (
    <circle cx="250" cy="50" r="20" fill="red" />
  )}
];

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Linked List Animation</h2>
      <DiagramAnimation 
        elements={linkedListElements}
        svgWidth={500}
        svgHeight={100}
        viewBox="0 0 500 100"
        animationDuration={0.5}
        animationDelay={0.2}
      />

      <h2>Binary Tree Animation</h2>
      <DiagramAnimation 
        elements={binaryTreeElements}
        svgWidth={500}
        svgHeight={250}
        viewBox="0 0 500 250"
        animationDuration={0.8}
        animationDelay={0.3}
        nodeStyle={{
          width: 40,
          height: 40,
          fill: "#4CAF50",
          textColor: "white",
          fontSize: 20
        }}
        arrowStyle={{
          stroke: "#666",
          strokeWidth: 2
        }}
      />

      <h2>Custom Diagram</h2>
      <DiagramAnimation 
        elements={customElements}
        svgWidth={300}
        svgHeight={100}
        viewBox="0 0 300 100"
        animationDuration={0.6}
        animationDelay={0.4}
        nodeStyle={{
          width: 40,
          height: 40,
          fill: "#9C27B0",
          textColor: "white",
          fontSize: 24
        }}
      />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
