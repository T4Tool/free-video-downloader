import React, { useState } from 'react';
import { 
  ChevronRight, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  ShieldCheck, 
  Download, 
  Zap, 
  ArrowRight,
  ChevronDown,
  Layers
} from 'lucide-react';
import { ToolItem, MediaInfoResult, MediaFormat } from '../types';
import { ALL_TOOLS, PLATFORMS_CONFIG } from '../data/toolsData';
import { MediaResultCard } from './MediaResultCard';

interface SeoToolPageTemplateProps {
  tool: ToolItem;
  darkMode: boolean;
  onFetchMedia: (url: string) => void;
  loading: boolean;
  error: string | null;
  onSelectTool: (slug: string | null) => void;
  extractedMedia: MediaInfoResult | null;
  onDownload: (format: MediaFormat) => void;
  downloadingId: string | null;
}

export const SeoToolPageTemplate: React.FC<SeoToolPageTemplateProps> = ({
  tool,
  darkMode,
  onFetchMedia,
  loading,
  error,
  onSelectTool,
  extractedMedia,
  onDownload,
  downloadingId,
}) => {
  const [inputUrl, setInputUrl] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const platformCfg = PLATFORMS_CONFIG[tool.platform];

  // Find 4 related tools for internal SEO cross-linking
  const relatedTools = ALL_TOOLS.filter(
    (t) => (t.platform === tool.platform || t.category === tool.category) && t.id !== tool.id
  ).slice(0, 4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onFetchMedia(inputUrl.trim());
    }
  };

  return (
    <article className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-400 overflow-x-auto pb-2">
        <button onClick={() => onSelectTool(null)} className="hover:text-cyan-400 transition-colors">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span style={{ color: platformCfg.color }}>{platformCfg.name}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className={darkMode ? 'text-white' : 'text-slate-900'}>{tool.title}</span>
      </nav>

      {/* Tool Hero Header */}
      <header className={`p-8 sm:p-12 rounded-3xl border shadow-2xl relative overflow-hidden text-center space-y-6 ${
        darkMode ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

        <div
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold border mx-auto"
          style={{
            backgroundColor: platformCfg.bgColor,
            borderColor: platformCfg.borderColor,
            color: platformCfg.color,
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Target Keyword: {tool.title}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          {tool.pageHeading}
        </h1>

        <p className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          {tool.pageSubheading}
        </p>

        {/* Dedicated URL Input Box */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto pt-4">
          <div className={`p-2 rounded-2xl border shadow-xl flex flex-col sm:flex-row items-center gap-2 ${
            darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <input
              type="url"
              required
              aria-label={`URL input for ${tool.title}`}
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder={`Paste ${platformCfg.name} link here...`}
              className="w-full bg-transparent px-4 py-3 text-sm sm:text-base outline-none placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={loading || !inputUrl.trim()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 whitespace-nowrap transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{loading ? 'Processing...' : 'Extract Media'}</span>
            </button>
          </div>

          {error && (
            <div className="mt-3 text-xs text-rose-400 font-semibold text-left">
              ⚠️ {error}
            </div>
          )}
        </form>

        {/* Supported Format Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
          <span className="text-slate-400 font-semibold">Formats Supported:</span>
          {tool.supportedFormats.map((fmt, idx) => (
            <span
              key={idx}
              className={`px-2.5 py-0.5 rounded-md border text-[11px] font-semibold ${
                darkMode ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              {fmt}
            </span>
          ))}
        </div>
      </header>

      {/* Extracted Media Result Card */}
      {extractedMedia && (
        <MediaResultCard
          media={extractedMedia}
          darkMode={darkMode}
          onDownload={onDownload}
          downloadingId={downloadingId}
        />
      )}

      {/* How To Use Section */}
      <section className="space-y-6">
        <h2 className={`text-2xl font-black text-center ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          How to Use {tool.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tool.howToUseSteps.map((step) => (
            <div
              key={step.step}
              className={`p-6 rounded-3xl border relative ${
                darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-black text-lg flex items-center justify-center mb-4">
                0{step.step}
              </div>
              <h3 className="font-bold text-base mb-2">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits & Key Features Section */}
      <section className={`p-8 rounded-3xl border space-y-6 ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <span>Benefits & Features of {tool.title}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tool.keyFeatures.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="space-y-6">
        <h2 className={`text-2xl font-black text-center ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Frequently Asked Questions ({tool.title})
        </h2>

        <div className="space-y-3">
          {tool.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all ${
                  darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-bold text-sm sm:text-base flex items-center justify-between gap-4"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/20">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Internal Linking & Related Tools Section */}
      {relatedTools.length > 0 && (
        <section className="pt-8 border-t border-slate-800/20 space-y-6">
          <h3 className="text-lg font-bold">Explore Related Downloader Tools</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectTool(rel.slug)}
                className={`p-4 rounded-2xl border cursor-pointer hover:border-cyan-500 transition-all ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="font-bold text-sm text-cyan-400 mb-1">{rel.title}</div>
                <p className="text-xs text-slate-400 line-clamp-2">{rel.shortDescription}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
