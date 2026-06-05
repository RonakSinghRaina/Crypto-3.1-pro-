import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextMaskTransition() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%", 
          scrub: 1,
          pin: true,
        }
      });

      tl.to(textRef.current, {
        scale: 60,
        ease: "power2.in",
      }, 0)
      .to(textRef.current, {
        opacity: 0,
        ease: "power2.in",
      }, 0.8); // Fades out in the last 20% of the scroll

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-background z-20">
      <div 
        ref={textRef}
        className="text-[18vw] font-drama italic font-black leading-none uppercase tracking-tighter whitespace-nowrap"
        style={{
          background: 'linear-gradient(135deg, #00FF87 0%, #C8F400 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transformOrigin: '50% 50%'
        }}
      >
        Dominate
      </div>
    </section>
  );
}
