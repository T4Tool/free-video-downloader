import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Search, 
  History, 
  Moon, 
  Sun, 
  Sparkles, 
  Menu, 
  X,
  ShieldCheck,
  Globe,
  Cookie
} from 'lucide-react';
import { ALL_TOOLS } from '../data/toolsData';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenHistory: () => void;
  onOpenCookies: () => void;
  onSelectTool: (slug: string | null) => void;
  currentSlug: string | null;
  onOpenLegal: (page: 'about' | 'privacy' | 'terms' | 'contact') => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  onOpenHistory,
  onOpenCookies,
  onSelectTool,
  currentSlug,
  onOpenLegal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredTools = searchQuery.trim()
    ? ALL_TOOLS.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.platform.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : ALL_TOOLS.slice(0, 6);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? darkMode
            ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20'
            : 'bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => onSelectTool(null)}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[2px] shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
            <div className={`w-full h-full rounded-[10px] ${darkMode ? 'bg-slate-950' : 'bg-white'} flex items-center justify-center`}>
              <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`font-black text-xl tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500">Video Downloader</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                HD
              </span>
            </div>
            <p className={`text-[11px] font-medium hidden sm:block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Fast, Online 4K MP4 & 320kbps MP3 Extractor
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => onSelectTool(null)}
            className={`text-sm font-semibold transition-colors ${
              currentSlug === null
                ? 'text-cyan-400 font-bold'
                : darkMode
                ? 'text-slate-300 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Home & Tools
          </button>

          <button
            onClick={() => onSelectTool('youtube-video-downloader')}
            className={`text-sm font-semibold transition-colors ${
              currentSlug === 'youtube-video-downloader'
                ? 'text-cyan-400 font-bold'
                : darkMode
                ? 'text-slate-300 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            YouTube
          </button>

          <button
            onClick={() => onSelectTool('instagram-reels-downloader')}
            className={`text-sm font-semibold transition-colors ${
              currentSlug === 'instagram-reels-downloader'
                ? 'text-cyan-400 font-bold'
                : darkMode
                ? 'text-slate-300 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Instagram Reels
          </button>

          <button
            onClick={() => onSelectTool('tiktok-video-downloader')}
            className={`text-sm font-semibold transition-colors ${
              currentSlug === 'tiktok-video-downloader'
                ? 'text-cyan-400 font-bold'
                : darkMode
                ? 'text-slate-300 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            TikTok No Watermark
          </button>

          <button
            onClick={() => onSelectTool('youtube-to-mp3')}
            className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
              currentSlug === 'youtube-to-mp3'
                ? 'text-cyan-400 font-bold'
                : darkMode
                ? 'text-slate-300 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            MP3 Converter
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Search trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            className={`p-2.5 rounded-xl border transition-all ${
              darkMode
                ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            title="Search Downloader Tools"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* YouTube Cookies Auth Button */}
          <button
            onClick={onOpenCookies}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
              darkMode
                ? 'bg-slate-900/80 border-slate-800 text-cyan-400 hover:bg-slate-800 hover:border-cyan-500/30'
                : 'bg-slate-100 border-slate-200 text-cyan-600 hover:bg-slate-200'
            }`}
            title="Configure YouTube Cookies (Option 1)"
          >
            <Cookie className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">YT Cookies</span>
          </button>

          {/* Download History Toggle */}
          <button
            onClick={onOpenHistory}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
              darkMode
                ? 'bg-slate-900/80 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
            }`}
          >
            <History className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">History</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-xl border transition-all ${
              darkMode
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-indigo-600 hover:bg-slate-200'
            }`}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2.5 rounded-xl border ${
              darkMode
                ? 'bg-slate-900 border-slate-800 text-slate-300'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-6 py-6 ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => {
                onSelectTool(null);
                setMobileMenuOpen(false);
              }}
              className="text-left font-semibold text-base py-2 border-b border-slate-800/20"
            >
              All Tools & Dashboard
            </button>
            <button
              onClick={() => {
                onSelectTool('youtube-video-downloader');
                setMobileMenuOpen(false);
              }}
              className="text-left font-semibold text-base py-2 border-b border-slate-800/20"
            >
              YouTube Video Downloader
            </button>
            <button
              onClick={() => {
                onSelectTool('youtube-to-mp3');
                setMobileMenuOpen(false);
              }}
              className="text-left font-semibold text-base py-2 border-b border-slate-800/20"
            >
              YouTube to MP3 Converter
            </button>
            <button
              onClick={() => {
                onSelectTool('instagram-reels-downloader');
                setMobileMenuOpen(false);
              }}
              className="text-left font-semibold text-base py-2 border-b border-slate-800/20"
            >
              Instagram Reels Downloader
            </button>
            <button
              onClick={() => {
                onSelectTool('tiktok-video-downloader');
                setMobileMenuOpen(false);
              }}
              className="text-left font-semibold text-base py-2 border-b border-slate-800/20"
            >
              TikTok No Watermark
            </button>
            <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-400">
              <button onClick={() => { onOpenLegal('about'); setMobileMenuOpen(false); }}>About Us</button> •
              <button onClick={() => { onOpenLegal('privacy'); setMobileMenuOpen(false); }}>Privacy Policy</button> •
              <button onClick={() => { onOpenLegal('terms'); setMobileMenuOpen(false); }}>Terms of Service</button> •
              <button onClick={() => { onOpenLegal('contact'); setMobileMenuOpen(false); }}>Contact</button>
            </div>
          </div>
        </div>
      )}

      {/* Global Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-20 px-4">
          <div
            className={`w-full max-w-2xl rounded-2xl border p-6 shadow-2xl transition-all ${
              darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/30">
              <div className="flex items-center gap-3 w-full mr-4">
                <Search className="w-5 h-5 text-cyan-400" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 25+ downloader tools (e.g., MP3, TikTok, Reels, 4K)..."
                  className="w-full bg-transparent outline-none text-base font-medium placeholder:text-slate-500"
                />
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 max-h-96 overflow-y-auto space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                {searchQuery ? 'Matching Downloader Tools' : 'Popular Tools'}
              </div>
              {filteredTools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => {
                    onSelectTool(tool.slug);
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    darkMode
                      ? 'bg-slate-950/50 border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-800/50'
                      : 'bg-slate-50 border-slate-200 hover:border-cyan-500 hover:bg-cyan-50/50'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-sm flex items-center gap-2">
                      {tool.title}
                      {tool.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{tool.shortDescription}</p>
                  </div>
                  <span className="text-xs font-bold text-cyan-400 group-hover:underline">Open →</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
