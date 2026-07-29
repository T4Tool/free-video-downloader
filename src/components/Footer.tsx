import React from 'react';
import { Zap, ShieldCheck, Heart, Globe, ArrowUpRight } from 'lucide-react';
import { ALL_TOOLS } from '../data/toolsData';

interface FooterProps {
  darkMode: boolean;
  onSelectTool: (slug: string | null) => void;
  onOpenLegal: (page: 'about' | 'privacy' | 'terms' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({
  darkMode,
  onSelectTool,
  onOpenLegal,
}) => {
  const popularTools = ALL_TOOLS.slice(0, 8);

  return (
    <footer className={`border-t transition-colors ${
      darkMode ? 'bg-slate-950 border-slate-800/80 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onSelectTool(null)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[2px] shadow-md">
                <div className={`w-full h-full rounded-[10px] ${darkMode ? 'bg-slate-950' : 'bg-white'} flex items-center justify-center`}>
                  <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
                </div>
              </div>
              <span className={`font-black text-xl tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Free <span className="text-cyan-400">Video Downloader</span>
              </span>
            </div>

            <p className="text-xs leading-relaxed max-w-sm">
              The premier free video downloader and media extraction suite. Download 4K YouTube videos, Instagram Reels, TikTok without watermark, and high quality 320kbps MP3 audio tracks instantly.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All 24 Global Media Servers Operational</span>
            </div>
          </div>

          {/* Quick Downloader Tools */}
          <div>
            <h4 className={`font-bold text-sm mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Popular Tools
            </h4>
            <ul className="space-y-2.5 text-xs">
              {popularTools.map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => onSelectTool(t.slug)}
                    className="hover:text-cyan-400 transition-colors text-left"
                  >
                    {t.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className={`font-bold text-sm mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Platforms
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => onSelectTool('youtube-video-downloader')} className="hover:text-cyan-400">YouTube Downloader</button></li>
              <li><button onClick={() => onSelectTool('youtube-to-mp3')} className="hover:text-cyan-400">YouTube to MP3</button></li>
              <li><button onClick={() => onSelectTool('instagram-reels-downloader')} className="hover:text-cyan-400">Instagram Reels</button></li>
              <li><button onClick={() => onSelectTool('tiktok-video-downloader')} className="hover:text-cyan-400">TikTok No Watermark</button></li>
              <li><button onClick={() => onSelectTool('facebook-video-downloader')} className="hover:text-cyan-400">Facebook Video HD</button></li>
              <li><button onClick={() => onSelectTool('twitter-video-downloader')} className="hover:text-cyan-400">Twitter / X Downloader</button></li>
            </ul>
          </div>

          {/* Legal & Company */}
          <div>
            <h4 className={`font-bold text-sm mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Company & Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => onOpenLegal('about')} className="hover:text-cyan-400">About Us</button></li>
              <li><button onClick={() => onOpenLegal('privacy')} className="hover:text-cyan-400">Privacy Policy</button></li>
              <li><button onClick={() => onOpenLegal('terms')} className="hover:text-cyan-400">Terms of Service</button></li>
              <li><button onClick={() => onOpenLegal('contact')} className="hover:text-cyan-400">Contact Support</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-slate-800/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Free Video Downloader. All rights reserved.</p>
          <p className="text-[11px] text-slate-500 text-center sm:text-right">
            Disclaimer: Free Video Downloader does not host pirated content on its servers. Users are responsible for respecting copyright terms.
          </p>
        </div>
      </div>
    </footer>
  );
};
