export default function Footer() {
  return (
    <footer className="bg-panel rounded-t-[3.5rem] pt-24 pb-12 px-8 md:px-20 mt-12 border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-secondary/5 blur-[150px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24">
        
        {/* Brand */}
        <div className="md:col-span-5">
          <h2 className="font-sans font-bold text-3xl text-primary mb-4 tracking-wider">CHAINPULSE</h2>
          <p className="font-mono text-sm text-foreground/60 max-w-xs leading-relaxed mb-8">
            The omniscience engine for active crypto traders. Track every wallet, across every chain, in real-time.
          </p>
          
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-background/50 border border-secondary/20 rounded-full">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_#00FF87]"></span>
            <span className="font-mono text-xs text-secondary tracking-widest uppercase">System Operational</span>
          </div>
        </div>

        {/* Links */}
        <div className="md:col-span-2 md:col-start-8">
          <h4 className="font-sans font-bold text-foreground mb-6 uppercase tracking-widest text-xs">Platform</h4>
          <ul className="space-y-4 font-mono text-sm text-foreground/60">
            <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-sans font-bold text-foreground mb-6 uppercase tracking-widest text-xs">Company</h4>
          <ul className="space-y-4 font-mono text-sm text-foreground/60">
            <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-sans font-bold text-foreground mb-6 uppercase tracking-widest text-xs">Legal</h4>
          <ul className="space-y-4 font-mono text-sm text-foreground/60">
            <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Cookies</a></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        <div className="font-mono text-xs text-foreground/40">
          &copy; {new Date().getFullYear()} ChainPulse. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
