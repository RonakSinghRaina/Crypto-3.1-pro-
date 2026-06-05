export default function SocialProofBar() {
  const partners = ['Ethereum', 'Solana', 'Base', 'Arbitrum', 'Binance', 'Coinbase', 'Kraken'];
  const stats = ['15+ Chains Supported', '$1.2B Volume Tracked', '12ms Average Latency', '99.99% Uptime', '0 Data Breaches'];

  return (
    <section className="py-24 border-y border-white/5 bg-background relative overflow-hidden">
      {/* Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Top Row: Partners */}
      <div className="flex gap-24 whitespace-nowrap mb-16 animate-scroll-fast w-max">
        {[...partners, ...partners, ...partners, ...partners].map((name, i) => (
          <div key={i} className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
              {name[0]}
            </div>
            <span className="font-sans font-bold text-2xl tracking-wider">{name}</span>
          </div>
        ))}
      </div>

      {/* Bottom Row: Stats */}
      <div className="flex gap-20 whitespace-nowrap animate-scroll-slow w-max">
        {[...stats, ...stats, ...stats, ...stats].map((stat, i) => (
          <div key={i} className="flex items-center gap-4 text-secondary/60">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            <span className="font-mono text-xs tracking-widest uppercase">{stat}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
