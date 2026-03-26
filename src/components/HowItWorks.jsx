import { MapPinCheck, Fingerprint, CloudUpload } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Automatic Geofence Check',
    description: 'The app detects when an employee enters a designated job site zone automatically.',
    icon: MapPinCheck,
    side: 'left',
  },
  {
    number: '02',
    title: 'One-Tap Clock-In',
    description: 'A simple biometric-verified tap confirms presence. No passwords, no hardware kiosks.',
    icon: Fingerprint,
    side: 'right',
  },
  {
    number: '03',
    title: 'Automatic Background Sync',
    description: 'Logs are instantly encrypted and transmitted to the dashboard with zero user effort.',
    icon: CloudUpload,
    side: 'left',
  },
];

function StepCard({ step, index }) {
  const isLeft = step.side === 'left';

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-10 items-center">
      {/* Left card or spacer */}
      {isLeft ? (
        <div className="bg-surface-container-lowest rounded-2xl p-7 md:p-8 cyber-shadow border-l-[3px] border-primary md:text-right order-2 md:order-1">
          <h3 className="font-headline font-bold text-xl mb-2 text-on-background tracking-tight">{step.title}</h3>
          <p className="text-on-surface-variant text-[15px] leading-relaxed">{step.description}</p>
        </div>
      ) : (
        <div className="hidden md:block order-1" />
      )}

      {/* Center: number badge + icon */}
      <div className="flex md:flex-col items-center gap-3 order-1 md:order-2">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold text-lg flex items-center justify-center cyber-shadow flex-shrink-0">
          {step.number}
        </div>
        <div className="w-10 h-10 rounded-lg bg-surface-container-high/60 flex items-center justify-center">
          <step.icon size={20} className="text-outline" strokeWidth={1.5} />
        </div>
      </div>

      {/* Right card or spacer */}
      {!isLeft ? (
        <div className="bg-surface-container-lowest rounded-2xl p-7 md:p-8 cyber-shadow border-r-[3px] border-primary order-3">
          <h3 className="font-headline font-bold text-xl mb-2 text-on-background tracking-tight">{step.title}</h3>
          <p className="text-on-surface-variant text-[15px] leading-relaxed">{step.description}</p>
        </div>
      ) : (
        <div className="hidden md:block order-3" />
      )}
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="workflow" className="py-24 md:py-32 px-6 md:px-8 bg-surface-container-low">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 space-y-3">
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">The Workflow</p>
          <h2 className="font-headline font-bold text-4xl md:text-5xl tracking-tight text-on-background">
            How It Works
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connector line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-10 bottom-10 w-[2px] bg-outline-variant/30" />

          <div className="space-y-10 md:space-y-16">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
