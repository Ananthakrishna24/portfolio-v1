import React, { useEffect, useRef } from 'react';

const CursorLight = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    const updateMousePosition = (ev) => {
      if (cursor) {
        cursor.style.setProperty('--mouse-x', `${ev.clientX}px`);
        cursor.style.setProperty('--mouse-y', `${ev.clientY}px`);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="cursor-light fixed inset-0 pointer-events-none z-50"
      style={{
        background: `radial-gradient(600px at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(29, 78, 216, 0.15), transparent 80%)`,
      }}
    />
  );
};

export default CursorLight;