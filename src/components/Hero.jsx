import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { UserPlus, Play } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import DecoderText from './DecoderText';

export default function Hero({ onJoinWaitlist }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      '.hero-orb-1',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 0.4, duration: 2, ease: 'power2.out' }
    );
    gsap.fromTo(
      '.hero-orb-2',
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 0.3, duration: 2.5, ease: 'power2.out', delay: 0.3 }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative flex items-center overflow-hidden px-6 md:px-8 pt-32 pb-24 md:pt-40 md:pb-32"
    >
      {/* Atmospheric orbs */}
      <div className="hero-orb-1 absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary-container/20 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />
      <div className="hero-orb-2 absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-secondary-container/25 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-outline-variant) 1px, transparent 1px), linear-gradient(90deg, var(--color-outline-variant) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left content */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-surface-container-low/80 backdrop-blur border border-outline-variant/15 text-primary text-xs font-bold tracking-[0.15em] uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            Next-Gen Attendance
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-[-0.03em] leading-[0.92] text-on-background"
          >
            The Next Era of{' '}
            <br />
            <DecoderText className="gradient-text" />{' '}
            <br />
            Attendance.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg md:text-xl text-on-surface-variant max-w-xl font-light leading-relaxed"
          >
            Offline-first, location-verified attendance built for Sierra Leone's
            modern businesses. Secure, tamper-proof, and lightning-fast.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <button onClick={onJoinWaitlist} className="group px-8 md:px-10 py-4 md:py-5 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold text-base md:text-lg cyber-shadow btn-glow hover:scale-[1.03] transition-all duration-300 flex items-center gap-3">
              Join the waitlist
              <UserPlus size={20} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button className="group px-8 md:px-10 py-4 md:py-5 rounded-full glass-card border border-outline-variant/20 text-on-surface font-bold text-base md:text-lg hover:bg-surface-container-lowest hover:border-outline-variant/30 transition-all duration-300 flex items-center gap-3">
              <Play size={18} className="text-primary" />
              View Demo
            </button>
          </motion.div>
        </div>

        {/* Right - Phone mockup */}
        <motion.div
          initial={{ opacity: 0, x: 60, rotate: 0 }}
          animate={{ opacity: 1, x: 0, rotate: -5 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative hidden lg:block"
        >
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  );
}
