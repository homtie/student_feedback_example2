import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface SupportModalProps {
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ onClose }) => {
  const { showToast } = useApp();
  const [topic, setTopic] = useState('Feedback Portal Issue');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Support Ticket Created', 'Reference #EDU-89241 has been dispatched to Academic IT.');
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 md:p-7 flex flex-col gap-5 relative my-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[22px]">contact_support</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Academic Helpdesk & Support</h3>
            <p className="text-xs text-slate-500">We're here to assist with courses, surveys, and portal questions.</p>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-2xl">check</span>
            </div>
            <h4 className="text-base font-bold text-slate-900">Ticket Logged!</h4>
            <p className="text-xs text-slate-500 mt-1">Our academic tech support desk will respond shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Category</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 outline-none font-medium cursor-pointer"
              >
                <option value="Feedback Portal Issue">Feedback Portal & Submission Issue</option>
                <option value="Course Registration">Course Registration & Schedule Mismatch</option>
                <option value="Anonymity & Privacy">Anonymity & Privacy Question</option>
                <option value="Faculty Analytics">Faculty Analytics / Report Generation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Message / Description</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your question or issue in detail..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 outline-none resize-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
              ></textarea>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-600 flex items-center gap-2 border border-slate-100">
              <span className="material-symbols-outlined text-blue-600 text-[16px]">info</span>
              <span>Direct Hotline: (555) 019-2834 • Support hours 8 AM - 6 PM EST</span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs"
            >
              Submit Ticket
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
