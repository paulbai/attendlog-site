import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar({ onJoinWaitlist }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#cta' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-card border-b border-outline-variant/10 cyber-shadow'
          : 'bg-transparent'
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-8 h-20 w-full">
        <a href="#" className="text-2xl font-black tracking-[-0.06em] text-on-background font-headline">
          Attend<span className="gradient-text">Log</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors tracking-wide uppercase"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onJoinWaitlist}
            className="px-6 py-2.5 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold text-sm btn-glow transition-all hover:scale-105"
          >
            Join Waitlist
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-xl hover:bg-surface-container-low transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-t border-outline-variant/10 overflow-hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-low font-semibold text-sm tracking-wide uppercase transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setMobileOpen(false); onJoinWaitlist(); }}
                className="mt-2 px-6 py-3 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold text-sm text-center"
              >
                Join Waitlist
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
