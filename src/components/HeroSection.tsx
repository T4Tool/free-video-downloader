import React, { useState } from 'react';
import { 
  ArrowRight, 
  Clipboard, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Loader2,
  ShieldCheck,
  Zap,
  Globe,
  Film
} from 'lucide-react';
import { PLATFORMS_CONFIG } from '../data/toolsData';
import { PlatformId } from '../types';

interface HeroSectionProps {
  darkMode: boolean;
  onFetchMedia: (url: string) => void;
  loading: boolean;
  error: string | null;
  selectedPlatform: PlatformId | 'all';
  onSelectPlatform: (platform: PlatformId | 'all') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  darkMode,
  onFetchMedia,
  loading,
  error,
  selectedPlatform,
  onSelectPlatform,
}) => {
  const [inputUrl, setInputUrl] = useState('');

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputUrl(text);
      }
    } catch (err) {
      console.warn('Clipboard read error or denied permission', err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onFetchMedia(inputUrl.trim());
    }
  };

  const sampleLinks = [
    { label: 'YouTube 4K Video', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { label: 'Instagram Reel', url: 'https://www.instagram.com/reel/C3x9Z1qL123/' },
    { label: 'TikTok No Watermark', url: 'https://www.tiktok.com/@creator/video/7123456789' },
    { label: 'Facebook HD Reel', url: 'https://www.facebook.com/watch?v=123456789' },
  ];

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Background Glow Meshes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10 border border-cyan-500/30 mb-8 backdrop-blur-md shadow-inner">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide text-cyan-300">
            Next-Gen Multi-Platform Video Extractor & AI Analyzer
          </span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500 text-slate-950 uppercase">
            v3.0
          </span>
        </div>

        {/* Main Title */}
        <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Download Videos From Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500">
            Favorite Platforms
          </span>{' '}
          Instantly
        </h1>

        {/* Subtitle */}
        <p className={`text-lg sm:text-xl font-normal max-w-3xl mx-auto mb-10 leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          Paste any video or audio link from YouTube, Instagram, TikTok, Facebook, Twitter, and 20+ social media networks. Get 4K MP4, 320kbps MP3, and clean watermarks with zero ads.
        </p>

        {/* URL Input Form Container */}
        <div className="max-w-3xl mx-auto mb-8">
          <form onSubmit={handleSubmit} className="relative group">
            <div className={`p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl border shadow-2xl backdrop-blur-xl transition-all duration-300 ${
              darkMode
                ? 'bg-slate-900/90 border-slate-800 focus-within:border-cyan-500/80 focus-within:ring-4 focus-within:ring-cyan-500/20'
                : 'bg-white border-slate-200 focus-within:border-cyan-500 focus-within:ring-4 focus-within:ring-cyan-500/15'
            }`}>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative flex-1 w-full flex items-center px-3">
                  <Film className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                  <input
                    type="url"
                    required
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="Paste link here (e.g. youtube.com/watch?v=... or tiktok.com/...)"
                    className={`w-full bg-transparent py-3 text-base sm:text-lg font-medium outline-none placeholder:text-slate-500 ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  />
                  {inputUrl ? (
                    <button
                      type="button"
                      onClick={() => setInputUrl('')}
                      className="text-xs font-semibold px-2 py-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      Clear
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handlePasteClipboard}
                      className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        darkMode
                          ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                          : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                      }`}
                      title="Paste link from clipboard"
                    >
                      <Clipboard className="w-3.5 h-3.5 text-cyan-400" />
                      Paste
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || !inputUrl.trim()}
                  className="w-full sm:w-auto px-8 py-4 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:via-indigo-400 hover:to-purple-500 text-white font-bold text-base shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex-shrink-0"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Analyzing Link...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      <span>Download Now</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Quick Sample Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
            <span className={`font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Try Sample Links:
            </span>
            {sampleLinks.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setInputUrl(s.url)}
                className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${
                  darkMode
                    ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:border-cyan-500 hover:text-cyan-600'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center gap-3 text-sm text-left">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Supported Platforms Chips */}
        <div className="mt-12 pt-8 border-t border-slate-800/20">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
            Supported High-Speed Platforms
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {Object.values(PLATFORMS_CONFIG).map((platform) => (
              <button
                key={platform.id}
                onClick={() => onSelectPlatform(selectedPlatform === platform.id ? 'all' : platform.id)}
                className={`px-4 py-2 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                  selectedPlatform === platform.id
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
                    : darkMode
                    ? 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: platform.color }}
                />
                {platform.name}
              </button>
            ))}
          </div>
        </div>

        {/* Trust Stats Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl border backdrop-blur-md bg-slate-900/30 border-slate-800/50 max-w-4xl mx-auto text-center">
          <div>
            <div className="text-2xl font-black text-cyan-400">100% Free</div>
            <div className="text-xs text-slate-400">No Account Required</div>
          </div>
          <div>
            <div className="text-2xl font-black text-indigo-400">4K Ultra HD</div>
            <div className="text-xs text-slate-400">Up to 60fps Output</div>
          </div>
          <div>
            <div className="text-2xl font-black text-purple-400">320 kbps</div>
            <div className="text-xs text-slate-400">High-Fidelity MP3s</div>
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-400">Zero Watermark</div>
            <div className="text-xs text-slate-400">TikTok & Reels Ready</div>
          </div>
        </div>
      </div>
    </section>
  );
};
