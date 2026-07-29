import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  Smartphone, 
  Layers, 
  CheckCircle2, 
  Lock,
  Cpu
} from 'lucide-react';

interface FeaturesSectionProps {
  darkMode: boolean;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ darkMode }) => {
  const features = [
    {
      icon: Zap,
      title: 'Ultra Fast Downloads',
      description: 'Multi-threaded cloud proxy nodes stream media directly from CDN edge servers with zero throttling.',
      color: 'text-amber-400',
      bgColor: 'bg-amber-400/10',
    },
    {
      icon: Sparkles,
      title: 'High Quality Output',
      description: 'Preserve original video resolution up to 4K 2160p 60fps and extract studio-grade 320kbps MP3 audio tracks.',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-400/10',
    },
    {
      icon: Layers,
      title: 'Multiple Formats',
      description: 'Download in MP4, WEBM, MP3, M4A, AAC, and HD cover image graphics with single-click conversion.',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-400/10',
    },
    {
      icon: Smartphone,
      title: 'Mobile & Tablet Ready',
      description: 'Optimized touch interface works seamlessly on iPhone Safari, Android Chrome, iPad, and desktop.',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10',
    },
    {
      icon: CheckCircle2,
      title: 'No Watermark & Clean',
      description: 'Remove annoying TikTok, Shorts, and Reels logo overlays for crisp presentation and offline viewing.',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: '100% browser-based security with SSL encryption. No registration, no tracking, and no software install required.',
      color: 'text-rose-400',
      bgColor: 'bg-rose-400/10',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5" />
          Enterprise Performance
        </div>
        <h2 className={`text-3xl sm:text-5xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Engineered for Speed, Quality & Security
        </h2>
        <p className={`text-base sm:text-lg max-w-2xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Why millions of users rely on Free Video Downloader for fast, high-definition video extractions across all major social networks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => {
          const IconComp = feat.icon;
          return (
            <div
              key={idx}
              className={`p-8 rounded-3xl border transition-all duration-300 relative group ${
                darkMode
                  ? 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/60 shadow-lg'
                  : 'bg-white border-slate-200 hover:border-cyan-500 shadow-md'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl ${feat.bgColor} flex items-center justify-center mb-6`}>
                <IconComp className={`w-6 h-6 ${feat.color}`} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {feat.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {feat.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
