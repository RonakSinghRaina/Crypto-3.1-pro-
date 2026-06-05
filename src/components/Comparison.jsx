import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Comparison() {
  const sectionRef = useRef(null);

  const rows = [
    { feature: "Data Latency", pulse: "Real-time (<15ms)", other: "Delayed (30s+)" },
    { feature: "Multi-Chain Sync", pulse: "15+ Chains instantly", other: "Manual RPC additions" },
    { feature: "Gas Analysis", pulse: "Live breakdown per tx", other: "Hidden or estimated" },
    { feature: "Whale Alerts", pulse: "Proactive AI Signals", other: "None / Third-party" },
    { feature: "UI/UX", pulse: "Pro-Trader God View", other: "Cluttered Retail UI" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".comp-row", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        x: -40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="comparison" ref={sectionRef} className="py-32 px-6 md:px-20 max-w-6xl mx-auto">
      <div className="mb-20 text-center">
        <h2 className="font-drama italic text-5xl md:text-7xl mb-6">Why Switch?</h2>
        <p className="font-mono text-foreground/70 max-w-xl mx-auto text-lg">
          Standard tools are built for retail tourists. ChainPulse is built for the top 1%.
        </p>
      </div>

      <div className="bg-panel rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="grid grid-cols-3 p-6 md:p-8 border-b border-white/5 bg-background/50">
          <div className="font-sans font-bold text-foreground/50 uppercase tracking-widest text-xs md:text-sm">Feature</div>
          <div className="font-sans font-bold text-primary text-lg md:text-xl flex items-center md:justify-center">ChainPulse</div>
          <div className="font-sans font-bold text-foreground/40 text-lg md:text-xl flex items-center justify-end md:justify-center text-right md:text-left">Legacy</div>
        </div>
        
        {/* Rows */}
        <div className="divide-y divide-white/5">
          {rows.map((row, i) => (
            <div key={i} className="comp-row grid grid-cols-3 p-6 md:p-8 items-center hover:bg-white/[0.02] transition-colors">
              <div className="font-mono text-xs md:text-base text-foreground/80 pr-4">{row.feature}</div>
              <div className="font-sans font-semibold text-secondary flex items-center md:justify-center gap-3">
                <Check size={20} className="shrink-0" /> <span className="hidden md:inline">{row.pulse}</span>
              </div>
              <div className="font-sans text-foreground/40 flex items-center justify-end md:justify-center gap-3">
                <span className="hidden md:inline">{row.other}</span> <X size={20} className="shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
