// src/components/CustomCursor/CustomCursor.jsx

import React, { useEffect, useState } from 'react';

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="custom-cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />

      <style jsx>{`
        .custom-cursor-dot {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          width: 10px;
          height: 10px;
          background: #8245ec;
          border-radius: 50%;
          transition: transform 0.1s ease;
        }

        /* Hide default cursor */
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}

export default CustomCursor;