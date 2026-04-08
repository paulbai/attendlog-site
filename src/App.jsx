import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Background3D from './components/Background3D';
import WaitlistModal from './components/WaitlistModal';

export default function App() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);

  return (
    <div className="min-h-screen bg-surface relative">
      <Background3D />
      <Navbar onJoinWaitlist={openWaitlist} />
      <main className="relative pt-20 z-[1]">
        <Hero onJoinWaitlist={openWaitlist} />
        <Features />
        <HowItWorks />
        <About />
        <CTA onJoinWaitlist={openWaitlist} />
      </main>
      <Footer />
      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
