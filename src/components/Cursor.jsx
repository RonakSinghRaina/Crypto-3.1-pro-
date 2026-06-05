import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    // Particle Trail Logic
    let particles = [];
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.life = 1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.03;
      }
      draw() {
        ctx.fillStyle = `rgba(200, 244, 0, ${this.life})`; // matches primary color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let animationFrameId;
    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
      animationFrameId = requestAnimationFrame(animateParticles);
    };
    animateParticles();

    // GSAP Cursor Tracking
    const xDot = gsap.quickTo(dot, "x", { duration: 0, ease: "none" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0, ease: "none" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.08, ease: "power2.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.08, ease: "power2.out" });

    const onMouseMove = (e) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);

      // Spawn particles
      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
      }
    };

    const onMouseDown = () => gsap.to(dot, { scale: 0.6, duration: 0.15 });
    const onMouseUp = () => gsap.to(dot, { scale: 1, duration: 0.15 });

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
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', handleHover);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
      />
      <div 
        ref={dotRef}
        id="custom-cursor-dot"
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#00FF87]"
      />
      <div 
        ref={ringRef}
        id="custom-cursor-ring"
        className="fixed top-0 left-0 w-8 h-8 border border-primary bg-primary/30 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 backdrop-blur-[1px]"
      />
    </>
  );
}
