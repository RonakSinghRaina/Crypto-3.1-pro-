import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ctaRef.current,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%"
          }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div 
        ref={ctaRef}
        className="bg-primary text-background rounded-[3rem] p-16 md:p-32 flex flex-col items-center text-center shadow-[0_0_50px_rgba(200,244,0,0.3)] relative overflow-hidden"
      >
        <h2 className="font-drama italic text-6xl md:text-[8rem] leading-[0.85] mb-6">
          Stop guessing.
        </h2>
        <p className="font-sans font-bold text-xl md:text-2xl mb-12 max-w-2xl text-background/80">
          Connect your wallet and go live in 60 seconds. Join the top 1% of traders who execute with omniscience.
        </p>
        <button 
          data-interactive 
          className="px-10 py-5 bg-background text-primary font-sans font-bold text-lg rounded-full hover:bg-panel transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95"
        >
          Initialize ChainPulse
        </button>
      </div>
    </section>
  );
}
