import React, { useState, useEffect, useRef } from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const steps = [
  String.raw`x^2 + 5x + 6`,
  String.raw`x^2 + 2x + 3x + 6`,
  String.raw`(x^2 + 2x) + (3x + 6)`,
  String.raw`x(x + 2) + 3(x + 2)`,
  String.raw`(x + 2)(x + 3)`
];

const typingSpeed = 35; // milliseconds per character

export default function MathAnimation() {
  const [idx, setIdx] = useState(0);
  const [typedLatex, setTypedLatex] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const typingTimeout = useRef();

  // Start typing effect on step change
  useEffect(() => {
    setTypedLatex('');
    setIsTyping(true);
    const latex = steps[idx];
    let charIdx = 0;

    function typeChar() {
      setTypedLatex(latex.slice(0, charIdx + 1));
      charIdx++;
      if (charIdx < latex.length) {
        typingTimeout.current = setTimeout(typeChar, typingSpeed);
      } else {
        setIsTyping(false);
      }
    }

    typingTimeout.current = setTimeout(typeChar, typingSpeed);

    // Cleanup timeout on unmount or step change
    return () => clearTimeout(typingTimeout.current);
  }, [idx]);

  const handleNext = () => {
    if (!isTyping && idx < steps.length - 1) setIdx(i => i + 1);
  };
  const handlePrev = () => {
    if (idx > 0) setIdx(i => i - 1);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 60, minHeight: 220 }}>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, minHeight: 220
      }}>
        {/* Render all previous steps statically */}
        {steps.slice(0, idx).map((math, i) => (
          <div key={i} style={{ opacity: 0.8 }}>
            <BlockMath math={math} />
          </div>
        ))}
        {/* Typewriter effect for current step */}
        <div style={{ fontWeight: 600, minHeight: 50, borderRight: isTyping ? '2px solid #444' : 'none', display: 'inline-block' }}>
          <BlockMath math={typedLatex} />
        </div>
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
          disabled={idx === 0 || isTyping}
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
            cursor: (!isTyping && idx < steps.length - 1) ? 'pointer' : 'not-allowed',
          }}
          disabled={isTyping || idx === steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
