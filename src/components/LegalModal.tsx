import React, { useState } from 'react';
import { X, Send, ShieldCheck, FileText, Info, CheckCircle2 } from 'lucide-react';

interface LegalModalProps {
  page: 'about' | 'privacy' | 'terms' | 'contact' | null;
  onClose: () => void;
  darkMode: boolean;
}

export const LegalModal: React.FC<LegalModalProps> = ({ page, onClose, darkMode }) => {
  const [submittedContact, setSubmittedContact] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  if (!page) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedContact(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div
        className={`w-full max-w-2xl max-h-[85vh] rounded-3xl border p-6 sm:p-8 shadow-2xl flex flex-col justify-between overflow-y-auto ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/20">
            <h3 className="font-bold text-xl flex items-center gap-2">
              {page === 'about' && <Info className="w-5 h-5 text-cyan-400" />}
              {page === 'privacy' && <ShieldCheck className="w-5 h-5 text-emerald-400" />}
              {page === 'terms' && <FileText className="w-5 h-5 text-indigo-400" />}
              {page === 'contact' && <Send className="w-5 h-5 text-purple-400" />}
              <span>
                {page === 'about' && 'About Free Video Downloader'}
                {page === 'privacy' && 'Privacy Policy'}
                {page === 'terms' && 'Terms of Service'}
                {page === 'contact' && 'Contact Support'}
              </span>
            </h3>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="py-6 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4">
            {page === 'about' && (
              <>
                <p>
                  <strong>Free Video Downloader</strong> is a next-generation online video downloading and media extraction suite. We provide fast, free, high-speed tools to convert and save videos from YouTube, Instagram, TikTok, Facebook, Twitter, and 20+ other social media networks.
                </p>
                <p>
                  Our mission is to give users seamless access to their favorite content for offline watching, research, creative remixing, and archival preservation.
                </p>
              </>
            )}

            {page === 'privacy' && (
              <>
                <p>
                  Your privacy is paramount. Free Video Downloader does not require user registration or logins.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>We do not store your IP address or track your download activity.</li>
                  <li>We do not save downloaded files on our servers.</li>
                  <li>All processing occurs in-transit via SSL encrypted proxy tunnels.</li>
                </ul>
              </>
            )}

            {page === 'terms' && (
              <>
                <p>By using Free Video Downloader, you agree to the following terms:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>You will only download public content or media for which you hold appropriate rights.</li>
                  <li>You will not use this platform for copyright infringement or illegal distribution.</li>
                  <li>Free Video Downloader is provided "as is" without implied warranties.</li>
                </ul>
              </>
            )}

            {page === 'contact' && (
              <>
                {submittedContact ? (
                  <div className="text-center py-8 space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h4 className="text-base font-bold text-white">Message Sent!</h4>
                    <p className="text-xs text-slate-400">
                      Thank you for contacting Free Video Downloader Support. We will get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-bold mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full p-3 rounded-xl border text-xs outline-none ${
                          darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full p-3 rounded-xl border text-xs outline-none ${
                          darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1">Your Message</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`w-full p-3 rounded-xl border text-xs outline-none ${
                          darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}
                        placeholder="How can we help you?"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold text-xs"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800/20 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:text-white"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
