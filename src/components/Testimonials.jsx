import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const quotes = [
    {
      text: "ChainPulse gave us the god-view we didn't know we needed. We reduced our slippage by 14% simply because we could see gas spikes across L2s in real-time.",
      author: "Elena R.",
      role: "Head of Trading, Vertex Capital"
    },
    {
      text: "Standard portfolio trackers are built for tourists. ChainPulse is the first instrument that actually matches the speed of the market. Absolute necessity.",
      author: "Marcus T.",
      role: "Independent Whale"
    },
    {
      text: "The multi-chain sync works flawlessly. We dumped three different dashboards the day we integrated ChainPulse. It's just you and the data.",
      author: "David K.",
      role: "DeFi Analyst"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const textRef = useRef(null);
  const authorRef = useRef(null);
  const containerRef = useRef(null);

  const nextQuote = () => {
    gsap.to([textRef.current, authorRef.current], {
      x: -60,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % quotes.length);
        gsap.fromTo([textRef.current, authorRef.current], 
          { x: 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.1 }
        );
      }
    });
  };

  const prevQuote = () => {
    gsap.to([textRef.current, authorRef.current], {
      x: 60,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
        gsap.fromTo([textRef.current, authorRef.current], 
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.1 }
        );
      }
    });
  };

  return (
    <section id="testimonials" className="py-32 px-6 md:px-20 max-w-5xl mx-auto min-h-[600px] flex flex-col justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-[15rem] md:text-[25rem] font-drama text-primary/[0.03] pointer-events-none z-0 leading-none">
        "
      </div>
      
      <div ref={containerRef} className="relative z-10 mt-12">
        <div ref={textRef} className="text-2xl md:text-4xl font-sans font-light leading-relaxed max-w-4xl mx-auto text-center mb-12">
          {quotes[currentIndex].text}
        </div>
        
        <div ref={authorRef} className="text-center">
          <div className="font-sans font-bold text-primary text-xl mb-1">{quotes[currentIndex].author}</div>
          <div className="font-mono text-sm text-foreground/50">{quotes[currentIndex].role}</div>
        </div>
      </div>

      <div className="flex justify-center gap-6 mt-16 relative z-20">
        <button onClick={prevQuote} data-interactive className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-primary/30 transition-all text-foreground/60 hover:text-primary">
          <ChevronLeft />
        </button>
        <button onClick={nextQuote} data-interactive className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-primary/30 transition-all text-foreground/60 hover:text-primary">
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}
