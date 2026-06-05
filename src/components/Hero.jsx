import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import ParticleField from './ParticleField';
import Navbar from './Navbar';

export default function Hero() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const canvasRef = useRef(null);
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      const ctx = gsap.context(() => {
        gsap.to(contentRef.current.children, {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 1,
          ease: 'power3.out'
        });
        
        gsap.to(canvasRef.current, {
          opacity: 1,
          duration: 1.5,
          delay: 0.3
        });
      }, heroRef);
      return () => ctx.revert();
    };

    window.addEventListener('app-loaded', handleLoad);
    const timeout = setTimeout(handleLoad, 2000);

    return () => {
      window.removeEventListener('app-loaded', handleLoad);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setNavVisible(entry.intersectionRatio < 0.3);
      },
      { threshold: [0.3] }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={heroRef} className="relative w-full h-[100dvh] flex items-end pb-24 pl-6 md:pl-20 overflow-hidden">
      <Navbar visible={navVisible} />
      
      {/* 3D Canvas Background */}
      <div ref={canvasRef} className="absolute inset-0 z-0 opacity-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 30], fov: 60 }} dpr={[1, 2]}>
          <ParticleField />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />

      {/* Content */}
      <div ref={contentRef} className="relative z-20 max-w-5xl">
        <h1 className="font-sans font-bold text-primary uppercase tracking-wider text-[clamp(1.5rem,3vw,2.5rem)] opacity-0 translate-y-[50px] mb-2 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_#00FF87]"></span>
          System Online
        </h1>
        <h2 className="font-drama italic text-[clamp(4.5rem,10vw,11rem)] leading-[0.85] mb-8 opacity-0 translate-y-[50px]">
          Track every wallet. <br/> <span className="text-gradient">Dominate the chain.</span>
        </h2>
        <p className="font-mono text-foreground/70 max-w-[500px] text-sm md:text-base leading-relaxed opacity-0 translate-y-[50px]">
          The ultimate portfolio tracker giving you real-time visibility into holdings, PnL, gas fees, and market signals across every chain. Latency is loss.
        </p>
        <button 
          data-interactive 
          className="mt-10 px-10 py-5 bg-primary text-background font-sans font-bold text-lg rounded-full hover:bg-secondary transition-all duration-300 opacity-0 translate-y-[50px] shadow-[0_0_30px_rgba(200,244,0,0.3)] hover:shadow-[0_0_40px_rgba(0,255,135,0.4)]"
        >
          Connect Wallet — 60s Setup
        </button>
      </div>
    </section>
  );
}
