import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Cursor from './components/Cursor';
import Hero from './components/Hero';
import SocialProofBar from './components/SocialProofBar';
import Features from './components/Features';
import Comparison from './components/Comparison';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef(null);
  const wipeRef = useRef(null);
  const brandNameRef = useRef(null);

  useEffect(() => {
    // Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Initial Load Sequence
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.to(brandNameRef.current.children, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
      })
      .to({}, { duration: 0.3 })
      .to(wipeRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
        onComplete: () => {
          gsap.set(wipeRef.current, { display: 'none' });
          window.dispatchEvent(new CustomEvent('app-loaded'));
        }
      }, "+=0.1");
    }, containerRef);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-background overflow-hidden">
      {/* Wipe Loader */}
      <div 
        ref={wipeRef} 
        className="fixed inset-0 z-[99999] bg-background flex items-center justify-center"
      >
        <div ref={brandNameRef} className="flex font-sans font-bold text-4xl text-primary overflow-hidden">
          {'CHAINPULSE'.split('').map((char, i) => (
            <span key={i} className="inline-block translate-y-[30px] opacity-0">{char}</span>
          ))}
        </div>
      </div>

      <Cursor />
      
      {/* 
        <!-- BRAND BRAIN -->
        Business Model: Crypto SaaS tool (freemium/subscription)
        Customer Archetype: Active crypto trader managing multiple wallets/chains
        Core Lever: Data Advantage (ROI/Efficiency) - Latency is loss.
        Tone Rules: Short, aggressive, precise. Second-person. "Track, Snipe, Monitor"
        Animations: Moderate-to-Dramatic. Data-feel. Type-on effects, spring physics.
      */}

      <Hero />
      <SocialProofBar />
      <Features />
      <Comparison />
      <Stats />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
}

export default App;
