import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Grid, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Download, 
  ArrowRight,
  Layers
} from 'lucide-react';
import { ALL_TOOLS, CATEGORIES_LIST, PLATFORMS_CONFIG } from '../data/toolsData';
import { CategoryId, ToolItem } from '../types';

interface DashboardViewProps {
  darkMode: boolean;
  onSelectTool: (slug: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  darkMode,
  onSelectTool,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = ALL_TOOLS.filter((tool) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      tool.category === selectedCategory ||
      tool.platform === selectedCategory;
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.platform.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredTools = ALL_TOOLS.filter((t) => t.featured);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Dashboard Section Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          Downloader Directory & Tools Engine
        </div>
        <h2 className={`text-3xl sm:text-5xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          Explore All Supported Media Tools
        </h2>
        <p className={`text-base sm:text-lg max-w-2xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Select from over 25+ dedicated tools built for crystal clear video extractions, 320kbps MP3 audio conversions, and clean watermark removals.
        </p>
      </div>

      {/* Featured / Popular Tools Horizontal Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-base font-bold">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <span>Popular Downloader Tools</span>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {featuredTools.length} High Demand Tools
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map((tool) => {
            const platformCfg = PLATFORMS_CONFIG[tool.platform];
            return (
              <div
                key={tool.id}
                onClick={() => onSelectTool(tool.slug)}
                className={`group p-6 rounded-3xl border transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  darkMode
                    ? 'bg-slate-900/60 border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-800/60 hover:shadow-xl hover:shadow-cyan-950/30'
                    : 'bg-white border-slate-200/80 hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="px-3 py-1 rounded-xl text-xs font-bold border flex items-center gap-2"
                      style={{
                        backgroundColor: platformCfg.bgColor,
                        borderColor: platformCfg.borderColor,
                        color: platformCfg.color,
                      }}
                    >
                      <span>{platformCfg.name}</span>
                    </div>

                    {tool.badge && (
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <h3 className={`text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6 line-clamp-2">
                    {tool.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/20 flex items-center justify-between text-xs font-bold text-cyan-400">
                  <span>Launch Tool</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter Tabs & Search Header */}
      <div className="space-y-6 pt-6 border-t border-slate-800/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES_LIST.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as CategoryId)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-md'
                    : darkMode
                    ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                    : 'bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {/* Inline Filter Input */}
          <div className={`relative min-w-[260px] p-1.5 rounded-2xl border flex items-center ${
            darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <Search className="w-4 h-4 text-cyan-400 ml-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword..."
              className="w-full bg-transparent px-2 text-xs font-medium outline-none placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const platformCfg = PLATFORMS_CONFIG[tool.platform];
            return (
              <div
                key={tool.id}
                onClick={() => onSelectTool(tool.slug)}
                className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                  darkMode
                    ? 'bg-slate-900/40 border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-800/40'
                    : 'bg-slate-50 border-slate-200/80 hover:border-cyan-500 hover:bg-cyan-50/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg border"
                      style={{
                        backgroundColor: platformCfg.bgColor,
                        borderColor: platformCfg.borderColor,
                        color: platformCfg.color,
                      }}
                    >
                      {platformCfg.name}
                    </span>

                    {tool.badge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <h4 className={`text-base font-bold mb-2 group-hover:text-cyan-400 transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {tool.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    {tool.shortDescription}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 pt-3 border-t border-slate-800/20">
                  <span>Fast Cloud Proxy</span>
                  <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">Use →</span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">
            No downloader tool matches your current filter query. Try searching for "YouTube", "Reels", or "MP3".
          </div>
        )}
      </div>
    </section>
  );
};
