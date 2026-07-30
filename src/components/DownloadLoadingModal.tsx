import React, { useEffect, useState } from 'react';
import { 
  Download, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Film,
  Music,
  ArrowDownCircle,
  Clock
} from 'lucide-react';
import { MediaFormat, MediaInfoResult } from '../types';

interface DownloadLoadingModalProps {
  isOpen: boolean;
  media: MediaInfoResult | null;
  format: MediaFormat | null;
  darkMode: boolean;
  onClose: () => void;
  downloadProgress: number; // 0 to 100
  downloadStage: 'connecting' | 'processing' | 'downloading' | 'completed' | 'error';
  errorMessage?: string | null;
  onRetry?: () => void;
}

export const DownloadLoadingModal: React.FC<DownloadLoadingModalProps> = ({
  isOpen,
  media,
  format,
  darkMode,
  onClose,
  downloadProgress,
  downloadStage,
  errorMessage,
  onRetry,
}) => {
  if (!isOpen || !media || !format) return null;

  const isVideo = format.type === 'video';
  const isAudio = format.type === 'audio';

  const getStageMessage = () => {
    switch (downloadStage) {
      case 'connecting':
        return 'Connecting to High-Speed Proxy Cloud...';
      case 'processing':
        return 'Bypassing Bot Check & Extractor Processing...';
      case 'downloading':
        return downloadProgress > 0
          ? `Streaming file data... (${downloadProgress}%)`
          : 'Preparing media stream payload...';
      case 'completed':
        return 'Download Started! Saving file to your device...';
      case 'error':
        return 'Download encountered a temporary server error.';
      default:
        return 'Processing download request...';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className={`w-full max-w-lg rounded-3xl border p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all duration-300 ${
          darkMode
            ? 'bg-slate-900 border-slate-800 text-white shadow-cyan-950/40'
            : 'bg-white border-slate-200 text-slate-900 shadow-slate-300'
        }`}
      >
        {/* Glow Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 animate-pulse" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full border transition-colors ${
            darkMode
              ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700'
              : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-200'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 flex-shrink-0">
            {downloadStage === 'completed' ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-300 animate-bounce" />
            ) : downloadStage === 'error' ? (
              <AlertCircle className="w-6 h-6 text-rose-300" />
            ) : (
              <ArrowDownCircle className="w-6 h-6 animate-pulse" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-black tracking-tight">
              {downloadStage === 'completed'
                ? 'Download Initiated!'
                : downloadStage === 'error'
                ? 'Download Failed'
                : 'Processing High-Speed Download'}
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Target: <span className="text-cyan-400 font-bold">{format.quality}</span> ({format.format.toUpperCase()})
            </p>
          </div>
        </div>

        {/* Media Preview Card */}
        <div className={`p-4 rounded-2xl border mb-6 flex items-center gap-4 ${
          darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <img
            src={media.thumbnail}
            alt={media.title}
            className="w-20 h-14 object-cover rounded-xl border border-slate-700/50 shadow-sm flex-shrink-0"
          />
          <div className="overflow-hidden">
            <h4 className="text-xs sm:text-sm font-bold truncate leading-tight mb-1">
              {media.title}
            </h4>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="font-semibold text-cyan-400 uppercase">{media.platformName}</span>
              <span>•</span>
              <span>{format.size || 'Auto Quality'}</span>
            </div>
          </div>
        </div>

        {/* Animated Loading Visualizer */}
        {downloadStage !== 'error' ? (
          <div className="space-y-6">
            {/* Stage Rings / Pulsing Circle */}
            <div className="relative py-4 flex flex-col items-center justify-center">
              {downloadStage === 'completed' ? (
                <div className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 animate-pulse">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
              ) : (
                <div className="relative w-28 h-28 flex items-center justify-center">
                  {/* Outer Pulsing Ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 animate-ping opacity-20" />
                  {/* Rotating Gradient Spinner */}
                  <div className="absolute inset-0 rounded-full border-4 border-t-cyan-400 border-r-indigo-500 border-b-purple-600 border-l-transparent animate-spin" />
                  
                  {/* Center Content */}
                  <div className="flex flex-col items-center justify-center">
                    {downloadProgress > 0 ? (
                      <span className="text-xl font-black font-mono text-cyan-400">
                        {downloadProgress}%
                      </span>
                    ) : (
                      <Zap className="w-8 h-8 text-cyan-400 animate-bounce" />
                    )}
                  </div>
                </div>
              )}

              {/* Live Status Message */}
              <div className="mt-4 text-center">
                <p className="text-sm font-bold text-slate-200 flex items-center justify-center gap-2">
                  {downloadStage !== 'completed' && <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />}
                  <span>{getStageMessage()}</span>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Please hold on while the cloud server extracts and streams your video payload.
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-400">
                <span>Cloud Extraction Progress</span>
                <span className="text-cyan-400 font-mono">
                  {downloadStage === 'completed' ? '100%' : downloadProgress > 0 ? `${downloadProgress}%` : 'Buffering...'}
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden relative border border-slate-700/50">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 transition-all duration-300 relative rounded-full"
                  style={{
                    width: downloadStage === 'completed' ? '100%' : downloadProgress > 0 ? `${downloadProgress}%` : '40%',
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Tips / Info Banner */}
            <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>
                Protected Cloud Stream: Downloads are piped securely directly to your browser without quality compression or popups.
              </span>
            </div>
          </div>
        ) : (
          /* Error State */
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 leading-relaxed">
              <p className="font-bold mb-1 flex items-center gap-1.5 text-rose-400">
                <AlertCircle className="w-4 h-4" />
                Extraction Error
              </p>
              {errorMessage || 'The requested stream was blocked or temporarily unavailable. You can retry or choose an alternative quality option.'}
            </div>

            <div className="flex items-center gap-3">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <Zap className="w-4 h-4" />
                  <span>Retry Download</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="py-3 px-4 rounded-xl border border-slate-700 text-slate-300 hover:text-white font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
