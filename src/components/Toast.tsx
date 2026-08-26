import React from 'react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div
      id="global-toast"
      className="fixed bottom-6 right-6 bg-slate-900 text-white rounded-2xl p-4 shadow-xl border border-slate-800 flex items-center gap-3 transform translate-y-0 opacity-100 transition-all duration-300 z-50 max-w-md"
    >
      <div className="bg-emerald-500/20 p-2 rounded-xl flex-shrink-0 text-emerald-400 border border-emerald-500/30">
        <span className="material-symbols-outlined fill-1 text-[20px]">check_circle</span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-xs text-white truncate">{toast.title}</h4>
        {toast.subtitle && (
          <p className="text-[11px] text-slate-300 mt-0.5">{toast.subtitle}</p>
        )}
      </div>
    </div>
  );
};
