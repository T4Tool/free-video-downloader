import React, { useState, useEffect } from 'react';
import {
  Cookie,
  Key,
  X,
  CheckCircle2,
  AlertCircle,
  Upload,
  ExternalLink,
  RefreshCw,
  FileText,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface YouTubeCookieModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export const YouTubeCookieModal: React.FC<YouTubeCookieModalProps> = ({
  isOpen,
  onClose,
  darkMode,
}) => {
  const [cookieStatus, setCookieStatus] = useState<{ active: boolean; source: string; length: number } | null>(null);
  const [cookiesText, setCookiesText] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [testResult, setTestResult] = useState<{ title?: string; channel?: string; error?: string } | null>(null);

  const fetchStatus = async () => {
    setLoadingStatus(true);
    try {
      const res = await fetch('/api/cookies/status');
      const data = await res.json();
      setCookieStatus(data);
    } catch (e) {
      console.error('Failed to fetch cookie status', e);
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
      setMessage(null);
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setCookiesText(content);
        setMessage({ type: 'info', text: `Loaded ${file.name} (${content.length} characters). Click "Save Cookies" below.` });
      }
    };
    reader.readAsText(file);
  };

  const handleSaveCookies = async () => {
    setSaving(true);
    setMessage(null);
    setTestResult(null);
    try {
      const res = await fetch('/api/cookies/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cookiesText }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        setCookiesText('');
        await fetchStatus();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save cookies' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err?.message || 'Error communicating with server' });
    } finally {
      setSaving(false);
    }
  };

  const handleTestCookies = async () => {
    setTesting(true);
    setMessage(null);
    setTestResult(null);
    try {
      const res = await fetch('/api/cookies/test', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setTestResult({ title: data.title, channel: data.channel });
        setMessage({ type: 'success', text: data.message });
      } else {
        setTestResult({ error: data.error });
        setMessage({ type: 'error', text: data.error });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err?.message || 'Test request failed' });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className={`relative w-full max-w-2xl rounded-2xl p-6 sm:p-8 shadow-2xl border transition-all my-8 ${
          darkMode
            ? 'bg-slate-900 border-slate-800 text-white shadow-cyan-500/10'
            : 'bg-white border-slate-200 text-slate-900 shadow-slate-300'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-xl transition-colors ${
            darkMode
              ? 'text-slate-400 hover:text-white hover:bg-slate-800'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Cookie className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight">YouTube Cookies Authentication</h2>
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                Option 1
              </span>
            </div>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Bypass YouTube bot checks on Render/Cloud hosting by providing valid cookies
            </p>
          </div>
        </div>

        {/* Current Status Box */}
        <div
          className={`p-4 rounded-xl border mb-6 flex items-center justify-between gap-4 ${
            cookieStatus?.active
              ? darkMode
                ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : darkMode
              ? 'bg-amber-950/30 border-amber-500/30 text-amber-300'
              : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}
        >
          <div className="flex items-center gap-3">
            {cookieStatus?.active ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            )}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">
                {cookieStatus?.active ? 'Cookies Active' : 'No Cookies Configured'}
              </p>
              <p className="text-xs opacity-90">
                {cookieStatus?.active
                  ? `Active source: ${cookieStatus.source} (${cookieStatus.length} bytes)`
                  : 'YouTube yt-dlp might fail on cloud servers without Netscape cookies'}
              </p>
            </div>
          </div>

          <button
            onClick={handleTestCookies}
            disabled={testing || !cookieStatus?.active}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
              cookieStatus?.active
                ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
          >
            {testing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
            Test Cookies
          </button>
        </div>

        {/* Feedback Messages */}
        {message && (
          <div
            className={`p-3.5 rounded-xl text-xs font-medium border mb-5 flex items-start gap-2.5 ${
              message.type === 'success'
                ? darkMode
                  ? 'bg-emerald-900/20 border-emerald-800 text-emerald-300'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : message.type === 'error'
                ? darkMode
                  ? 'bg-red-900/20 border-red-800 text-red-300'
                  : 'bg-red-50 border-red-200 text-red-800'
                : darkMode
                ? 'bg-cyan-900/20 border-cyan-800 text-cyan-300'
                : 'bg-cyan-50 border-cyan-200 text-cyan-800'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : message.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            )}
            <div>
              <p>{message.text}</p>
              {testResult?.title && (
                <p className="mt-1 font-bold text-emerald-400">
                  Successfully extracted: "{testResult.title}" ({testResult.channel})
                </p>
              )}
            </div>
          </div>
        )}

        {/* Option 1 Instructions */}
        <div className={`p-4 rounded-xl text-xs mb-6 ${darkMode ? 'bg-slate-800/60 border border-slate-700/60' : 'bg-slate-100 border border-slate-200'}`}>
          <h4 className="font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5 text-cyan-400">
            <FileText className="w-4 h-4" /> How to get YouTube cookies in 30 seconds:
          </h4>
          <ol className="list-decimal list-inside space-y-1 text-slate-300 dark:text-slate-300 font-normal">
            <li>
              Install the free Chrome/Firefox extension{' '}
              <a
                href="https://chromewebstore.google.com/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 underline font-semibold inline-flex items-center gap-0.5"
              >
                Get cookies.txt LOCALLY <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>Open YouTube.com while logged into any YouTube account</li>
            <li>Click the extension icon and click <strong>"Export Netscape format"</strong> or copy the text</li>
            <li>Paste the exported text below or upload the <code className="bg-slate-900 text-cyan-300 px-1 py-0.5 rounded">cookies.txt</code> file</li>
          </ol>
        </div>

        {/* Upload or Paste Form */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Paste or Upload Netscape cookies.txt Content:
            </label>
            <label className="cursor-pointer text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
              <Upload className="w-3.5 h-3.5" /> Upload File
              <input type="file" accept=".txt" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <textarea
            value={cookiesText}
            onChange={(e) => setCookiesText(e.target.value)}
            placeholder={`# Netscape HTTP Cookie File\n# http://curl.haxx.se/rfc/cookie_spec.html\n.youtube.com\tTRUE\t/\tTRUE\t1785000000\tSID\t...`}
            rows={6}
            className={`w-full font-mono text-xs p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
              darkMode
                ? 'bg-slate-950 border-slate-800 text-slate-200 placeholder-slate-600'
                : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400'
            }`}
          />

          <div className="flex items-center justify-between gap-3 pt-2">
            {cookieStatus?.active ? (
              <button
                onClick={async () => {
                  setCookiesText('');
                  setSaving(true);
                  try {
                    await fetch('/api/cookies/save', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ cookiesText: '' }),
                    });
                    await fetchStatus();
                    setMessage({ type: 'info', text: 'Cookies cleared.' });
                  } catch (e) {}
                  setSaving(false);
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors"
              >
                Clear Existing Cookies
              </button>
            ) : <div />}

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
                  darkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                }`}
              >
                Close
              </button>
              <button
                onClick={handleSaveCookies}
                disabled={saving || !cookiesText.trim()}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  saving || !cookiesText.trim()
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:opacity-90 text-white shadow-lg shadow-cyan-500/25'
                }`}
              >
                {saving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                Save & Apply Cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
