import React from 'react';
import { Link, Sliders, Download, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  darkMode: boolean;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ darkMode }) => {
  const steps = [
    {
      num: '01',
      title: '1. Paste Video URL',
      desc: 'Copy the video link from YouTube, Instagram, TikTok, Facebook, or Twitter and paste it into our search bar.',
      icon: Link,
    },
    {
      num: '02',
      title: '2. Select Format & Quality',
      desc: 'Choose your desired output quality: 4K UHD, 1080p MP4, or 320kbps MP3 audio.',
      icon: Sliders,
    },
    {
      num: '03',
      title: '3. Instant File Download',
      desc: 'Click Download to save the media file directly to your device gallery or local storage.',
      icon: Download,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          Simple 3-Step Process
        </div>
        <h2 className={`text-3xl sm:text-5xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          How Free Video Downloader Works
        </h2>
        <p className={`text-base sm:text-lg max-w-2xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Extracting media from your favorite social platforms takes less than 5 seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((s, idx) => {
          const IconComponent = s.icon;
          return (
            <div
              key={idx}
              className={`p-8 rounded-3xl border relative flex flex-col justify-between ${
                darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-4xl font-black text-slate-700/40">{s.num}</span>
                </div>

                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-cyan-400">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
