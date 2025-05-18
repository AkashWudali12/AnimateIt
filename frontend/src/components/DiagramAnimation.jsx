import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Example of how to structure the elements prop
const defaultElements = [
  { type: 'node', x: 50, y: 30, value: 1 },
  { type: 'arrow', x1: 90, y1: 50, x2: 150, y2: 50 },
  { type: 'node', x: 150, y: 30, value: 2 },
  // ... more elements
];

export default function DiagramAnimation({ 
  elements = defaultElements,
  svgWidth = 500,
  svgHeight = 100,
  viewBox = "0 0 500 100",
  animationDuration = 0.5,
  animationDelay = 0.05,
  nodeStyle = {
    width: 40,
    height: 40,
    fill: "#3b82f6",
    textColor: "white",
    fontSize: 20
  },
  arrowStyle = {
    stroke: "#222",
    strokeWidth: 2
  }
}) {
  const [idx, setIdx] = useState(0);

  const handleNext = () => {
    if (idx < elements.length) setIdx(i => i + 1);
  };
  const handlePrev = () => {
    if (idx > 0) setIdx(i => i - 1);
  };

  const renderElement = (element, i) => {
    switch (element.type) {
      case 'node':
        return (
          <>
            <rect
              x={element.x}
              y={element.y}
              width={nodeStyle.width}
              height={nodeStyle.height}
              fill={nodeStyle.fill}
            />
            <text
              x={element.x + nodeStyle.width/2}
              y={element.y + nodeStyle.height/2 + 5}
              textAnchor="middle"
              fill={nodeStyle.textColor}
              fontSize={nodeStyle.fontSize}
            >
              {element.value}
            </text>
          </>
        );
      case 'arrow':
        return (
          <line
            x1={element.x1}
            y1={element.y1}
            x2={element.x2}
            y2={element.y2}
            stroke={arrowStyle.stroke}
            strokeWidth={arrowStyle.strokeWidth}
          />
        );
      case 'custom':
        // Allow custom SVG elements
        return element.render();
      default:
        return null;
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 60, minHeight: 220 }}>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, minHeight: 220
      }}>
        <svg width={svgWidth} height={svgHeight} viewBox={viewBox}>
          {elements.map((element, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: i < idx ? 1 : 0,
                x: i < idx ? 0 : 20
              }}
              transition={{ 
                duration: animationDuration,
                delay: i * animationDelay
              }}
            >
              {renderElement(element, i)}
            </motion.g>
          ))}
        </svg>
      </div>
      <div style={{ marginTop: 40 }}>
        <button
          onClick={handlePrev}
          style={{
            padding: '10px 22px',
            fontSize: '16px',
            borderRadius: '8px',
            background: '#e5e7eb',
            color: '#222',
            border: 'none',
            cursor: idx > 0 ? 'pointer' : 'not-allowed',
            marginRight: 16,
          }}
          disabled={idx === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          style={{
            padding: '10px 22px',
            fontSize: '16px',
            borderRadius: '8px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            cursor: (idx < elements.length) ? 'pointer' : 'not-allowed',
          }}
          disabled={idx === elements.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}
