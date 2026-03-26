import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Background3D from './components/Background3D';

export default function App() {
  return (
    <div className="min-h-screen bg-surface relative">
      <Background3D />
      <Navbar />
      <main className="relative pt-20 z-[1]">
        <Hero />
        <Features />
        <HowItWorks />
        <About />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
