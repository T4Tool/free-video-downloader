import React from 'react';
import { X, Trash2, ExternalLink, Download, Clock, Film } from 'lucide-react';
import { DownloadHistoryItem } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: DownloadHistoryItem[];
  onClearHistory: () => void;
  darkMode: boolean;
  onRedownload: (url: string) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onClearHistory,
  darkMode,
  onRedownload,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
      <div
        className={`w-full max-w-md h-full p-6 border-l shadow-2xl flex flex-col justify-between overflow-y-auto transition-all ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/20">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-lg">Recent Downloads</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* History List */}
          <div className="mt-6 space-y-4">
            {history.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                No recent downloads yet. Paste a video link to get started!
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                    darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-12 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs truncate">{item.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {item.platform.toUpperCase()} • {item.formatSelected}
                    </p>
                    <p className="text-[10px] text-slate-500">{item.downloadedAt}</p>
                  </div>

                  <button
                    onClick={() => {
                      onRedownload(item.originalUrl);
                      onClose();
                    }}
                    className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all flex-shrink-0"
                    title="Re-extract link"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Actions */}
        {history.length > 0 && (
          <div className="pt-4 border-t border-slate-800/20">
            <button
              onClick={onClearHistory}
              className="w-full py-2.5 rounded-xl border border-rose-500/30 text-rose-400 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-rose-500/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
