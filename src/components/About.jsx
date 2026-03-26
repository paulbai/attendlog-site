import { Check } from 'lucide-react';
import DashboardMockup from './DashboardMockup';

const checkpoints = [
  {
    title: 'One-Tap Deployment',
    description: 'Setup your entire organization\'s hierarchy in under 15 minutes with our intelligent CSV engine.',
  },
  {
    title: 'Real-time Dashboard',
    description: 'Live heatmaps of employee presence across multiple city branches on a single pane of glass.',
  },
  {
    title: 'Payroll Integration',
    description: 'Auto-export verified attendance data directly into your existing payroll workflow. Zero manual entry.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Visual */}
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden cyber-shadow-lg">
              <DashboardMockup />
            </div>
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary-container/30 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-secondary-container/40 rounded-full blur-[80px] pointer-events-none" />
          </div>

          {/* Content */}
          <div className="lg:w-1/2 space-y-8">
            <h2 className="font-headline font-bold text-4xl md:text-5xl leading-tight tracking-tight">
              Designed for the{' '}
              <span className="text-primary italic">Modern Horizon.</span>
            </h2>

            <div className="space-y-6">
              {checkpoints.map((item) => (
                <div key={item.title} className="flex gap-4 group">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Check size={16} className="text-primary" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-1 text-on-background">{item.title}</p>
                    <p className="text-on-surface-variant leading-relaxed text-[15px]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
