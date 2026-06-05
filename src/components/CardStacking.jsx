import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  // ... (keep the same cards array)
  {
    id: 'SYS/01',
    title: 'AGGREGATE EVERYTHING',
    description: 'Most trackers make you connect one chain at a time. We map the entire multi-chain surface area automatically. Just provide the wallet address.',
    visual: (
      <div className="w-full h-full flex items-center justify-center relative overflow-hidden rounded-2xl bg-[#050505]">
        <svg viewBox="0 0 100 100" className="w-full h-full max-w-[80%] max-h-[80%] opacity-60">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#00FF87" strokeWidth="0.2" className="animate-[spin_20s_linear_infinite]" strokeDasharray="4 2" />
          <circle cx="55" cy="50" r="25" fill="none" stroke="#C8F400" strokeWidth="0.3" className="animate-[spin_10s_linear_infinite]" />
          <circle cx="45" cy="55" r="15" fill="none" stroke="#00FF87" strokeWidth="0.1" className="animate-[spin_15s_linear_infinite_reverse]" />
        </svg>
      </div>
    )
  },
  {
    id: 'SYS/02',
    title: 'THE LATENCY MATRIX',
    description: 'Historical data is meaningless in crypto. Our custom RPC routing ensures you see block-level state updates the millisecond they are confirmed.',
    visual: (
      <div className="w-full h-full flex items-end justify-center rounded-2xl bg-[#050505] overflow-hidden relative">
        <div className="w-full h-1/2 bg-gradient-to-t from-[#00FF87]/20 to-transparent absolute bottom-0 left-0" />
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00FF87] to-transparent shadow-[0_0_20px_#00FF87] absolute bottom-12" />
      </div>
    )
  },
  {
    id: 'SYS/03',
    title: 'EXECUTION ENGINE',
    description: 'When the signal hits, you do not have time to switch apps. Trade directly from the command center with zero slippage routing.',
    visual: (
      <div className="w-full h-full flex items-center justify-center rounded-2xl bg-[#050505] relative overflow-hidden">
        <div className="grid grid-cols-4 gap-4 opacity-40">
           {[...Array(16)].map((_, i) => (
             <div 
               key={i} 
               className="w-3 h-3 rounded-sm bg-[#C8F400]"
               style={{ animation: `pulse ${1 + Math.random() * 2}s infinite ${Math.random()}s` }} 
             />
           ))}
        </div>
      </div>
    )
  }
];

import TextScramble from './TextScramble';

export default function CardStacking() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cardElements = gsap.utils.toArray('.stack-card');
      
      cardElements.forEach((card, i) => {
        if (i === cardElements.length - 1) return;
        
        gsap.to(card, {
          scale: 0.92,
          opacity: 0.4,
          y: -15,
          scrollTrigger: {
            trigger: cardElements[i + 1],
            start: "top 80%",
            end: "top 25%",
            scrub: true,
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-20 max-w-7xl mx-auto relative z-10">
      <div className="mb-20 max-w-3xl">
        <TextScramble as="h2" className="font-drama italic text-5xl md:text-7xl mb-6" text="The System." />
        <p className="font-mono text-foreground/70 text-lg">
          A radically new architecture built for speed and precision.
        </p>
      </div>

      <div className="flex flex-col gap-24 pb-32">
        {cards.map((card, index) => (
          <div 
            key={card.id}
            className="stack-card sticky flex flex-col md:flex-row gap-12 bg-[#0d0d0d] border border-primary/10 rounded-[2rem] p-8 md:p-12 shadow-2xl min-h-[450px]"
            style={{ 
              top: `calc(15vh + ${index * 40}px)`, 
            }}
          >
            <div className="flex-1 flex flex-col justify-center py-4">
              <span className="font-mono text-secondary mb-4 tracking-widest text-sm font-bold">{card.id}</span>
              <h3 className="font-sans font-bold text-4xl md:text-5xl uppercase tracking-tighter mb-6 text-foreground leading-[1.1]">{card.title}</h3>
              <p className="font-mono text-foreground/50 text-lg leading-relaxed max-w-md">
                {card.description}
              </p>
            </div>
            <div className="flex-1 rounded-2xl border border-white/5 relative overflow-hidden bg-background">
              {card.visual}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
