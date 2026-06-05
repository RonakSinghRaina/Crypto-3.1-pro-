import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = gsap.utils.toArray('.stat-counter');
      
      counters.forEach((counter) => {
        const endValue = parseFloat(counter.getAttribute('data-value'));
        const isDecimal = endValue % 1 !== 0;
        
        gsap.to(counter, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
          innerHTML: endValue,
          duration: 2,
          ease: "power2.out",
          snap: { innerHTML: isDecimal ? 0.1 : 1 },
          onUpdate: function() {
            if (isDecimal) {
              counter.innerHTML = Number(this.targets()[0].innerHTML).toFixed(1);
            }
          }
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
      <div className="bg-panel rounded-3xl p-12 border border-primary/10 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[100px] pointer-events-none"></div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
          
          <div>
            <div className="font-drama italic text-5xl md:text-7xl text-primary mb-2 flex justify-center">
              $<span className="stat-counter" data-value="1.2">0</span>B
            </div>
            <div className="font-mono text-sm text-foreground/50 uppercase tracking-widest">Volume Tracked</div>
          </div>

          <div>
            <div className="font-drama italic text-5xl md:text-7xl text-primary mb-2 flex justify-center">
              <span className="stat-counter" data-value="15">0</span>+
            </div>
            <div className="font-mono text-sm text-foreground/50 uppercase tracking-widest">Chains Supported</div>
          </div>

          <div>
            <div className="font-drama italic text-5xl md:text-7xl text-primary mb-2 flex justify-center">
              <span className="stat-counter" data-value="12">0</span>ms
            </div>
            <div className="font-mono text-sm text-foreground/50 uppercase tracking-widest">Avg Latency</div>
          </div>

          <div>
            <div className="font-drama italic text-5xl md:text-7xl text-primary mb-2 flex justify-center">
              <span className="stat-counter" data-value="99.9">0</span>%
            </div>
            <div className="font-mono text-sm text-foreground/50 uppercase tracking-widest">System Uptime</div>
          </div>

        </div>
      </div>
    </section>
  );
}
