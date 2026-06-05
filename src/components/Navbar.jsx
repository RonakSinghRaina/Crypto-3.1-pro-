import MagneticWrapper from './MagneticWrapper';

export default function Navbar({ visible }) {
  return (
    <nav 
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-out ${
        visible 
          ? 'opacity-100 translate-y-0 backdrop-blur-xl bg-background/80 border border-primary/20' 
          : 'opacity-0 -translate-y-4 pointer-events-none'
      } rounded-full px-6 py-3 flex items-center gap-8`}
    >
      <span className="font-sans font-bold text-primary tracking-wide text-sm uppercase">ChainPulse</span>
      <div className="hidden md:flex items-center gap-6 font-mono text-xs text-foreground/80">
        <a href="#features" className="hover:text-primary transition-colors uppercase tracking-wider">Features</a>
        <a href="#comparison" className="hover:text-primary transition-colors uppercase tracking-wider">Edge</a>
        <a href="#testimonials" className="hover:text-primary transition-colors uppercase tracking-wider">Traders</a>
      </div>
      <MagneticWrapper>
        <button data-interactive className="bg-panel border border-primary/30 text-primary px-4 py-2 rounded-full font-sans text-xs font-bold hover:bg-primary hover:text-background transition-colors shadow-[0_0_15px_rgba(200,244,0,0.2)]">
          Go Live
        </button>
      </MagneticWrapper>
    </nav>
  );
}
