import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function DiagnosticShuffler() {
  const items = [
    { label: 'Ethereum Wallet', status: 'SYNCED', color: 'text-secondary' },
    { label: 'Solana Staking', status: 'ACTIVE', color: 'text-secondary' },
    { label: 'Arbitrum Bridge', status: 'PENDING', color: 'text-primary' },
    { label: 'Base Liquidity', status: 'SYNCED', color: 'text-secondary' }
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      gsap.fromTo(containerRef.current, 
        { rotateX: 20, opacity: 0.5 },
        { rotateX: 0, opacity: 1, duration: 0.6, ease: "back.out(1.5)" }
      );
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="bg-panel rounded-2xl p-8 border border-primary/10 shadow-xl flex flex-col h-full min-h-[320px] hover:border-primary/30 transition-colors">
      <h3 className="font-sans font-bold text-xl mb-2 text-foreground">Omnichain Sync</h3>
      <p className="font-mono text-sm text-foreground/50 mb-8">Track every wallet across every chain simultaneously.</p>
      
      <div className="flex-grow flex items-center justify-center relative" style={{ perspective: '800px' }}>
        <div ref={containerRef} className="w-full bg-background rounded-xl p-4 border border-white/5 flex justify-between items-center transform-gpu">
          <span className="font-mono text-sm text-foreground/80">{items[currentIndex].label}</span>
          <span className={`font-mono text-xs font-bold tracking-wider flex items-center gap-2 ${items[currentIndex].color}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
            {items[currentIndex].status}
          </span>
        </div>
      </div>
    </div>
  );
}

function TelemetryTypewriter() {
  const messages = [
    "Whale detected: 15,000 ETH",
    "Gas spike: 120 gwei.",
    "Liquidation risk: 5% Aave.",
    "Profit: +$4,200 SOL long."
  ];
  const [text, setText] = useState("");
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    let currentText = "";
    const target = messages[msgIndex];
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
      currentText += target[charIndex];
      setText(currentText);
      charIndex++;
      
      if (charIndex === target.length) {
        clearInterval(typeInterval);
        
        setTimeout(() => {
          let scrambleCount = 0;
          const scrambleInterval = setInterval(() => {
            setText(Math.random().toString(36).substring(2, 12).toUpperCase());
            scrambleCount++;
            if (scrambleCount > 8) {
              clearInterval(scrambleInterval);
              setMsgIndex((prev) => (prev + 1) % messages.length);
            }
          }, 50);
        }, 2000);
      }
    }, 50);
    
    return () => clearInterval(typeInterval);
  }, [msgIndex]);

  return (
    <div className="bg-panel rounded-2xl p-8 border border-primary/10 shadow-xl flex flex-col h-full min-h-[320px] hover:border-primary/30 transition-colors">
      <h3 className="font-sans font-bold text-xl mb-2 text-foreground">Smart Alerts</h3>
      <p className="font-mono text-sm text-foreground/50 mb-8">Whale movements, thresholds, and liquidations.</p>
      
      <div className="flex-grow bg-background rounded-xl p-6 border border-white/5 font-mono text-sm text-primary flex flex-col">
        <div className="flex items-center gap-2 mb-4 text-xs opacity-70">
          <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span> LIVE FEED
        </div>
        <div className="min-h-[2.5rem]">
          {text}<span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  );
}

function SignalGraph() {
  const pathRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(pathRef.current,
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        { 
          strokeDashoffset: 0, 
          duration: 2, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: pathRef.current,
            start: "top 90%"
          }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-panel rounded-2xl p-8 border border-primary/10 shadow-xl flex flex-col h-full min-h-[320px] hover:border-primary/30 transition-colors">
      <h3 className="font-sans font-bold text-xl mb-2 text-foreground">Real-Time PnL</h3>
      <p className="font-mono text-sm text-foreground/50 mb-8">Gas fee breakdowns and live exit signals.</p>
      
      <div className="flex-grow flex flex-col justify-end relative bg-background rounded-xl p-4 border border-white/5 overflow-hidden">
        <div className="absolute top-4 left-4 font-mono text-2xl text-secondary">+$14,209.50</div>
        <div className="absolute top-12 left-4 font-mono text-xs text-foreground/40">+12.4% (24h)</div>
        
        <svg className="w-full h-32 mt-12" viewBox="0 0 200 100" preserveAspectRatio="none">
          <path 
            ref={pathRef}
            d="M0,80 Q20,60 40,70 T80,40 T120,50 T160,20 T200,10" 
            fill="none" 
            stroke="#00FF87" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M0,80 Q20,60 40,70 T80,40 T120,50 T160,20 T200,10 L200,100 L0,100 Z" 
            fill="url(#gradient)" 
            opacity="0.2"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00FF87" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

import TextScramble from './TextScramble';

import SpotlightCard from './SpotlightCard';

export default function Features() {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".feature-card", { transformOrigin: "bottom center" });
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        scaleY: 0,
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 2,
        ease: "elastic.out(1, 0.7)"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-32 px-6 md:px-20 max-w-7xl mx-auto">
      <div className="mb-20 max-w-3xl">
        <TextScramble as="h2" className="font-drama italic text-5xl md:text-7xl mb-6" text="The Edge You Need." />
        <p className="font-mono text-foreground/70 text-lg">
          We don't build generic dashboards. We build instruments for precision execution. Everything you need to snipe opportunities before the crowd.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="feature-card h-full"><SpotlightCard className="h-full"><DiagnosticShuffler /></SpotlightCard></div>
        <div className="feature-card h-full"><SpotlightCard className="h-full"><TelemetryTypewriter /></SpotlightCard></div>
        <div className="feature-card h-full"><SpotlightCard className="h-full"><SignalGraph /></SpotlightCard></div>
      </div>
    </section>
  );
}
