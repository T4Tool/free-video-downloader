import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MediaResultCard } from './components/MediaResultCard';
import { DashboardView } from './components/DashboardView';
import { SeoToolPageTemplate } from './components/SeoToolPageTemplate';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorks } from './components/HowItWorks';
import { FaqSection } from './components/FaqSection';
import { HistoryDrawer } from './components/HistoryDrawer';
import { YouTubeCookieModal } from './components/YouTubeCookieModal';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { ALL_TOOLS } from './data/toolsData';
import { MediaInfoResult, MediaFormat, DownloadHistoryItem, PlatformId } from './types';
import { updateHeadMetadata } from './utils/seoHelper';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  const [extractedMedia, setExtractedMedia] = useState<MediaInfoResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [cookiesModalOpen, setCookiesModalOpen] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [legalPage, setLegalPage] = useState<'about' | 'privacy' | 'terms' | 'contact' | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId | 'all'>('all');

  const currentToolObj = ALL_TOOLS.find((t) => t.slug === currentSlug);

  // Load download history from local storage
  const [history, setHistory] = useState<DownloadHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('omnigrab_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Handle HTML dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle URL hash changes for client routing / SEO simulated pages
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash) {
        const found = ALL_TOOLS.find((t) => t.slug === hash);
        if (found) {
          setCurrentSlug(found.slug);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }
      setCurrentSlug(null);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // check on load

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update head metadata & JSON-LD schema on route change
  useEffect(() => {
    updateHeadMetadata(currentToolObj);
  }, [currentSlug, currentToolObj]);

  const handleSelectTool = (slug: string | null) => {
    if (slug) {
      window.location.hash = `#/${slug}`;
      setCurrentSlug(slug);
    } else {
      window.location.hash = '';
      setCurrentSlug(null);
    }
    setExtractedMedia(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFetchMedia = async (url: string) => {
    setLoading(true);
    setError(null);
    setExtractedMedia(null);

    try {
      const res = await fetch('/api/fetch-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch media details.');
      }

      setExtractedMedia(data);

      // Scroll smoothly to extracted media card
      setTimeout(() => {
        const el = document.getElementById('media-result-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 380, behavior: 'smooth' });
        }
      }, 100);
    } catch (err: any) {
      setError(err?.message || 'Failed to parse video link. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadFormat = (fmt: MediaFormat) => {
    if (!extractedMedia) return;
    setDownloadingId(fmt.id);

    // Save item to history
    const newItem: DownloadHistoryItem = {
      id: Date.now().toString(),
      title: extractedMedia.title,
      thumbnail: extractedMedia.thumbnail,
      platform: extractedMedia.platform,
      formatSelected: `${fmt.quality} (${fmt.format.toUpperCase()})`,
      downloadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      originalUrl: extractedMedia.originalUrl,
    };

    const updated = [newItem, ...history.filter((h) => h.originalUrl !== newItem.originalUrl)].slice(0, 15);
    setHistory(updated);
    try {
      localStorage.setItem('omnigrab_history', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }

    // Trigger browser file download via proxy link
    const link = document.createElement('a');
    link.href = fmt.downloadUrl;
    link.download = `${extractedMedia.title}_${fmt.quality}.${fmt.format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadingId(null);
    }, 1500);
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('omnigrab_history');
    } catch (e) {
      console.warn('LocalStorage clear error', e);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Header */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenHistory={() => setHistoryOpen(true)}
        onOpenCookies={() => setCookiesModalOpen(true)}
        onSelectTool={handleSelectTool}
        currentSlug={currentSlug}
        onOpenLegal={setLegalPage}
      />

      {/* Main Content Area */}
      <main className="pb-16">
        {currentToolObj ? (
          /* Dedicated SEO Tool Page View */
          <SeoToolPageTemplate
            tool={currentToolObj}
            darkMode={darkMode}
            onFetchMedia={handleFetchMedia}
            loading={loading}
            error={error}
            onSelectTool={handleSelectTool}
            extractedMedia={extractedMedia}
            onDownload={handleDownloadFormat}
            downloadingId={downloadingId}
          />
        ) : (
          /* Main Homepage View */
          <>
            <HeroSection
              darkMode={darkMode}
              onFetchMedia={handleFetchMedia}
              loading={loading}
              error={error}
              selectedPlatform={selectedPlatform}
              onSelectPlatform={setSelectedPlatform}
            />

            {/* Extracted Media Result Panel */}
            {extractedMedia && (
              <MediaResultCard
                media={extractedMedia}
                darkMode={darkMode}
                onDownload={handleDownloadFormat}
                downloadingId={downloadingId}
              />
            )}

            {/* SaaS Dashboard View */}
            <DashboardView
              darkMode={darkMode}
              onSelectTool={handleSelectTool}
            />

            {/* Features Section */}
            <FeaturesSection darkMode={darkMode} />

            {/* How It Works Section */}
            <HowItWorks darkMode={darkMode} />

            {/* Global FAQ Section */}
            <FaqSection darkMode={darkMode} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        darkMode={darkMode}
        onSelectTool={handleSelectTool}
        onOpenLegal={setLegalPage}
      />

      {/* Slide-over Recent Downloads History Drawer */}
      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={history}
        onClearHistory={handleClearHistory}
        darkMode={darkMode}
        onRedownload={(url) => {
          handleFetchMedia(url);
          setHistoryOpen(false);
        }}
      />

      {/* Legal & Support Modal */}
      <LegalModal
        page={legalPage}
        onClose={() => setLegalPage(null)}
        darkMode={darkMode}
      />

      {/* YouTube Cookies Authentication Modal (Option 1) */}
      <YouTubeCookieModal
        isOpen={cookiesModalOpen}
        onClose={() => setCookiesModalOpen(false)}
        darkMode={darkMode}
      />
    </div>
  );
}
