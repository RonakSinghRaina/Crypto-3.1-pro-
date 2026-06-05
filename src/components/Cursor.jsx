import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    // Use quickTo for high-performance zero-lag tracking
    const xDot = gsap.quickTo(dot, "x", { duration: 0, ease: "none" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0, ease: "none" });
    
    // Tighter sync for the ring
    const xRing = gsap.quickTo(ring, "x", { duration: 0.08, ease: "power2.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.08, ease: "power2.out" });

    const onMouseMove = (e) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const onMouseDown = () => gsap.to(dot, { scale: 0.6, duration: 0.15 });
    const onMouseUp = () => gsap.to(dot, { scale: 1, duration: 0.15 });

    // Handle hovering on interactive elements
    const handleHover = (e) => {
      const target = e.target.closest('button, a, [data-interactive]');
      if (target) {
        gsap.to(ring, { width: 60, height: 60, mixBlendMode: 'exclusion', duration: 0.3 });
      } else {
        gsap.to(ring, { width: 32, height: 32, mixBlendMode: 'normal', duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  return (
    <>
      <div 
        ref={dotRef}
        id="custom-cursor-dot"
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2"
      />
      <div 
        ref={ringRef}
        id="custom-cursor-ring"
        className="fixed top-0 left-0 w-8 h-8 border border-primary bg-primary/30 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
