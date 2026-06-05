import { useRef, useState } from 'react';

export default function SpotlightCard({ children, className = "" }) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative rounded-2xl ${className}`}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 rounded-2xl overflow-hidden z-50"
        style={{ opacity }}
      >
        {/* Soft background glow */}
        <div 
          className="absolute inset-0 mix-blend-screen"
          style={{
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(200,244,0,0.06), transparent 40%)`,
          }}
        />
        {/* Glowing border effect */}
        <div 
          className="absolute inset-0 rounded-2xl ring-1 ring-primary/40"
          style={{
            maskImage: `radial-gradient(300px circle at ${position.x}px ${position.y}px, black, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(300px circle at ${position.x}px ${position.y}px, black, transparent 100%)`,
          }}
        />
      </div>
    </div>
  );
}
