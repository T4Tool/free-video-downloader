import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FaqSectionProps {
  darkMode: boolean;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ darkMode }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const globalFaqs = [
    {
      q: 'Is OmniGrab free to use?',
      a: 'Yes, OmniGrab is 100% free with unlimited downloads. You do not need an account, credit card, or software installation.',
    },
    {
      q: 'How do I download TikTok videos without watermark?',
      a: 'Simply paste the TikTok video URL into OmniGrab and hit Download. Our cloud proxy extracts the clean, unwatermarked original HD MP4 video feed direct from the source.',
    },
    {
      q: 'Does this downloader work on iPhone and iOS devices?',
      a: 'Yes! Open Safari on your iPhone, iPad, or Mac, paste the video URL into OmniGrab, and tap Download. The file will save directly to your Files app or Downloads folder.',
    },
    {
      q: 'Are there any limits on video resolution or length?',
      a: 'No! OmniGrab supports 4K Ultra HD (2160p), 1080p 60fps Full HD, and high-bitrate 320kbps MP3 audio conversions without length restriction.',
    },
    {
      q: 'Does OmniGrab store or keep copies of downloaded videos?',
      a: 'No. OmniGrab operates as a real-time proxy gateway. Media is streamed directly from public platform servers to your browser. We never store, host, or record user download history.',
    },
    {
      q: 'Can I extract audio tracks from YouTube videos?',
      a: 'Yes, our YouTube to MP3 converter extracts studio-grade 320kbps MP3 and M4A audio files from any music video, podcast, or stream.',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          Got Questions?
        </div>
        <h2 className={`text-3xl sm:text-5xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Frequently Asked Questions
        </h2>
        <p className={`text-base sm:text-lg max-w-xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Everything you need to know about formats, mobile downloads, and media security.
        </p>
      </div>

      <div className="space-y-4">
        {globalFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all ${
                darkMode
                  ? 'bg-slate-900/80 border-slate-800'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left font-bold text-sm sm:text-base flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/20 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
