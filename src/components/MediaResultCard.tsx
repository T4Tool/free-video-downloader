import React, { useState } from 'react';
import { 
  Download, 
  Film, 
  Music, 
  Image as ImageIcon, 
  Sparkles, 
  Check, 
  ExternalLink, 
  Clock, 
  Eye, 
  User, 
  Zap, 
  ShieldCheck,
  Share2
} from 'lucide-react';
import { MediaInfoResult, MediaFormat } from '../types';

interface MediaResultCardProps {
  media: MediaInfoResult;
  darkMode: boolean;
  onDownload: (format: MediaFormat) => void;
  downloadingId: string | null;
}

export const MediaResultCard: React.FC<MediaResultCardProps> = ({
  media,
  darkMode,
  onDownload,
  downloadingId,
}) => {
  const [activeTab, setActiveTab] = useState<'video' | 'audio' | 'thumbnail'>('video');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showAiSummary, setShowAiSummary] = useState(false);

  const videoFormats = media.formats.filter((f) => f.type === 'video');
  const audioFormats = media.formats.filter((f) => f.type === 'audio');
  const thumbnailFormats = media.formats.filter((f) => f.type === 'thumbnail');

  const currentFormats =
    activeTab === 'video'
      ? videoFormats
      : activeTab === 'audio'
      ? audioFormats
      : thumbnailFormats;

  const handleShare = () => {
    navigator.clipboard.writeText(media.originalUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section id="media-result-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-6">
      <div
        className={`rounded-3xl border p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden transition-all duration-300 ${
          darkMode
            ? 'bg-slate-900/90 border-slate-800 text-white shadow-cyan-950/20'
            : 'bg-white border-slate-200 text-slate-900 shadow-slate-200'
        }`}
      >
        {/* Glow Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Media Preview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-video group bg-slate-950 border border-slate-800 shadow-lg">
              <img
                src={media.thumbnail}
                alt={media.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-xs font-bold text-cyan-400 uppercase tracking-wider">
                {media.platformName}
              </div>

              {media.duration && (
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-xs font-mono font-semibold text-white flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  {media.duration}
                </div>
              )}
            </div>

            {/* Author & Stats */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                  {media.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-bold flex items-center gap-1">
                    {media.author}
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  </div>
                  {media.views && (
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Eye className="w-3 h-3 text-slate-500" />
                      {media.views}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleShare}
                className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  copiedLink
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : darkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedLink ? 'Copied' : 'Share'}</span>
              </button>
            </div>

            {/* AI Summary Banner Trigger */}
            {media.aiSummary && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10 border border-cyan-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                    AI Video Insight
                  </div>
                  <button
                    onClick={() => setShowAiSummary(!showAiSummary)}
                    className="text-xs font-semibold text-cyan-400 hover:underline"
                  >
                    {showAiSummary ? 'Hide Analysis' : 'Read Summary'}
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {media.aiSummary}
                </p>

                {showAiSummary && media.aiHighlights && (
                  <div className="mt-3 pt-3 border-t border-cyan-500/20 space-y-1.5 text-xs text-slate-300">
                    <div className="font-semibold text-cyan-400">Key Takeaways:</div>
                    {media.aiHighlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Download Formats & Options */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black leading-snug mb-2">
                {media.title}
              </h2>
              <p className="text-xs text-slate-400 break-all">
                Original URL: {media.originalUrl}
              </p>
            </div>

            {/* Tab Selector */}
            <div className={`p-1.5 rounded-2xl border flex items-center gap-1 ${
              darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                onClick={() => setActiveTab('video')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'video'
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Film className="w-4 h-4" />
                <span>Video MP4 ({videoFormats.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('audio')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'audio'
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Music className="w-4 h-4" />
                <span>Audio MP3 ({audioFormats.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('thumbnail')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'thumbnail'
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Thumbnail</span>
              </button>
            </div>

            {/* Format List Items */}
            <div className="space-y-3">
              {currentFormats.map((fmt) => {
                const isDownloading = downloadingId === fmt.id;
                return (
                  <div
                    key={fmt.id}
                    className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 ${
                      darkMode
                        ? 'bg-slate-950/40 border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-800/30'
                        : 'bg-slate-50 border-slate-200 hover:border-cyan-500 hover:bg-cyan-50/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-xs flex-shrink-0">
                        {fmt.format.toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-sm sm:text-base flex items-center gap-2">
                          {fmt.quality}
                          {fmt.fps && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              {fmt.fps}fps
                            </span>
                          )}
                          {fmt.bitrate && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              {fmt.bitrate}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          Size: <span className="font-semibold text-slate-300">{fmt.size}</span> • High-Speed Proxy Stream
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onDownload(fmt)}
                      disabled={isDownloading}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                    >
                      {isDownloading ? (
                        <>
                          <Zap className="w-4 h-4 animate-bounce text-amber-300" />
                          <span>Preparing File...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Download {fmt.format.toUpperCase()}</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
