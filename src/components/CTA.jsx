import { Rocket } from 'lucide-react';

export default function CTA() {
  return (
    <section id="cta" className="py-32 md:py-40 relative px-6 md:px-8 overflow-hidden">
      {/* Background orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary-container/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-10 relative z-10">
        <h2 className="font-headline font-bold text-5xl sm:text-6xl md:text-7xl tracking-[-0.03em] leading-[0.95]">
          Ready to scale with confidence?
        </h2>

        <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto">
          Join hundreds of forward-thinking Sierra Leonean businesses already on the waitlist.
        </p>

        <div className="inline-block">
          <div className="p-[2px] bg-gradient-to-r from-primary/30 via-primary-container/50 to-primary/30 rounded-full">
            <div className="bg-surface-container-lowest px-10 md:px-14 py-8 md:py-10 rounded-full cyber-shadow-lg">
              <button className="group px-10 md:px-14 py-5 md:py-6 rounded-full bg-on-background text-surface font-headline font-bold text-lg md:text-xl hover:scale-105 transition-all duration-300 flex items-center gap-4 mx-auto shadow-[0_8px_40px_rgba(25,28,29,0.2)]">
                Join the waitlist
                <Rocket size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
