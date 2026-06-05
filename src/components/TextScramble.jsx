import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CHARS = '!<>-_\\\\/[]{}—=+*^?#________';

export default function TextScramble({ text, className, as: Component = 'span' }) {
  const [displayText, setDisplayText] = useState('');
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    let frameRequest;
    let frame = 0;
    const queue = [];
    
    // Create the queue
    for (let i = 0; i < text.length; i++) {
      const from = text[i] === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
      const to = text[i];
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queue.push({ from, to, start, end, char: from });
    }

    const update = () => {
      let output = '';
      let complete = 0;
      
      for (let i = 0, n = queue.length; i < n; i++) {
        let { from, to, start, end, char } = queue[i];
        
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = CHARS[Math.floor(Math.random() * CHARS.length)];
            queue[i].char = char;
          }
          output += `<span style="opacity: 0.5">${char}</span>`;
        } else {
          output += `<span style="opacity: 0.3">${from}</span>`;
        }
      }
      
      setDisplayText(output);
      
      if (complete === queue.length) {
        setDisplayText(text); // reset to clean string
      } else {
        frameRequest = requestAnimationFrame(update);
        frame++;
      }
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: () => {
          frame = 0;
          update();
        },
        onLeaveBack: () => {
          setDisplayText(text.replace(/./g, (c) => c === ' ' ? ' ' : `<span style="opacity: 0.3">${CHARS[Math.floor(Math.random() * CHARS.length)]}</span>`));
        }
      });
    }, textRef);

    // Initial state
    setDisplayText(text.replace(/./g, (c) => c === ' ' ? ' ' : `<span style="opacity: 0.3">${CHARS[Math.floor(Math.random() * CHARS.length)]}</span>`));

    return () => {
      cancelAnimationFrame(frameRequest);
      ctx.revert();
    };
  }, [text]);

  return (
    <Component 
      ref={textRef} 
      className={className} 
      dangerouslySetInnerHTML={{ __html: displayText }}
    />
  );
}
