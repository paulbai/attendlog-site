import { MapPin, CloudOff, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Smart Geofencing',
    description: 'Define exact boundaries for your office. Our ultra-precise GPS logic prevents clock-ins from outside the workspace.',
    bgColor: 'bg-primary-container/15',
    iconColor: 'text-primary',
  },
  {
    icon: CloudOff,
    title: 'Offline-first Sync',
    description: 'No data? No problem. Attendance data is stored securely on device and syncs automatically when connection returns.',
    bgColor: 'bg-secondary-container/20',
    iconColor: 'text-secondary',
  },
  {
    icon: ShieldCheck,
    title: 'HMAC Tamper-Proof',
    description: 'Cryptographic validation ensures local device time cannot be spoofed. Secure records you can actually trust for payroll.',
    bgColor: 'bg-tertiary-container/20',
    iconColor: 'text-tertiary',
  },
];

function FeatureCard({ feature }) {
  return (
    <div className="group bg-surface-container-lowest p-8 md:p-10 rounded-[2rem] cyber-shadow border border-outline-variant/10 hover:-translate-y-2 hover:cyber-shadow-lg transition-all duration-500 cursor-default">
      <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-7 group-hover:scale-110 transition-transform duration-500`}>
        <feature.icon size={26} className={feature.iconColor} strokeWidth={1.8} />
      </div>
      <h3 className="font-headline font-bold text-xl md:text-2xl mb-3 text-on-background tracking-tight">
        {feature.title}
      </h3>
      <p className="text-on-surface-variant leading-relaxed text-[15px]">
        {feature.description}
      </p>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20 space-y-4">
          <h2 className="font-headline font-bold text-4xl md:text-5xl tracking-tight text-on-background">
            Precision Tracking, Anywhere.
          </h2>
          <p className="text-on-surface-variant text-lg max-w-2xl">
            We built AttendLog for the unique challenges of the Sierra Leonean market: unstable connectivity and high-trust requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
