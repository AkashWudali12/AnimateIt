import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function DiagramAnimation({ svgs = [], height = 100 }) {
  const [idx, setIdx] = useState(0);

  const handleNext = () => {
    if (idx < svgs.length - 1) setIdx(i => i + 1);
  };
  const handlePrev = () => {
    if (idx > 0) setIdx(i => i - 1);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 60, minHeight: height }}>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, minHeight: height
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            style={{ display: 'inline-block' }}
          >
            {svgs[idx]}
          </motion.div>
        </AnimatePresence>
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
            cursor: (idx < svgs.length - 1) ? 'pointer' : 'not-allowed',
          }}
          disabled={idx === svgs.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
