import SpotlightCard from './SpotlightCard';

export default function Testimonials() {
  const quotes = [
    {
      text: "ChainPulse gave us the god-view we didn't know we needed. We reduced our slippage by 14% simply because we could see gas spikes across L2s in real-time.",
      author: "Elena R.",
      role: "Head of Trading, Vertex Capital",
      size: "md:col-span-2 md:row-span-2 text-2xl md:text-4xl"
    },
    {
      text: "Standard portfolio trackers are built for tourists. ChainPulse is the first instrument that actually matches the speed of the market.",
      author: "Marcus T.",
      role: "Independent Whale",
      size: "md:col-span-1 md:row-span-1 text-lg md:text-xl"
    },
    {
      text: "The multi-chain sync works flawlessly. We dumped three different dashboards the day we integrated ChainPulse.",
      author: "David K.",
      role: "DeFi Analyst",
      size: "md:col-span-1 md:row-span-1 text-lg md:text-xl"
    },
    {
      text: "Latency is loss. Since deploying ChainPulse, our execution time dropped by 400ms. It's an absolute necessity for our automated strategies.",
      author: "Sarah J.",
      role: "Quant Developer",
      size: "md:col-span-2 md:row-span-1 text-xl md:text-2xl"
    },
    {
      text: "Zero downtime during the last three major chain halts. Impeccable infrastructure.",
      author: "Alex M.",
      role: "Node Operator",
      size: "md:col-span-1 md:row-span-1 text-lg md:text-xl"
    }
  ];

  return (
    <section id="testimonials" className="py-32 px-6 md:px-20 max-w-7xl mx-auto">
      <div className="mb-20 max-w-3xl">
        <h2 className="font-drama italic text-5xl md:text-7xl mb-6">Built For Killers.</h2>
        <p className="font-mono text-foreground/70 text-lg">
          The top 1% of traders don't use the same tools as retail. Here is what they say after switching to ChainPulse.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(220px,auto)] gap-6">
        {quotes.map((quote, i) => (
          <SpotlightCard 
            key={i} 
            className={`bg-panel border border-primary/10 p-8 flex flex-col justify-between ${quote.size.split(' ').slice(0,2).join(' ')} group`}
          >
            <div className={`font-sans font-light leading-relaxed mb-8 group-hover:text-white transition-colors ${quote.size.split(' ').slice(2).join(' ')}`}>
              "{quote.text}"
            </div>
            <div className="mt-auto">
              <div className="font-sans font-bold text-primary text-lg mb-1">{quote.author}</div>
              <div className="font-mono text-xs text-foreground/50 uppercase tracking-widest">{quote.role}</div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
