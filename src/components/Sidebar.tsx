import React from 'react';
import { useApp } from '../context/AppContext';
import { NavigationTab } from '../types';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const { currentTab, setCurrentTab, currentRole, openFeedbackModal, openSupportModal, openLoginModal } = useApp();

  const navItems: { id: NavigationTab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'analytics', label: 'Analytics', icon: 'monitoring' },
    { id: 'feedback-form', label: 'Feedback Form', icon: 'rate_review' },
    { id: 'courses', label: 'Courses', icon: 'school' },
    { id: 'feedback-history', label: 'Feedback History', icon: 'history' },
    { id: 'reports', label: 'Reports', icon: 'analytics' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
  ];

  const handleNavClick = (tabId: NavigationTab) => {
    setCurrentTab(tabId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <nav
        aria-label="Sidebar Navigation"
        className={`fixed left-0 top-0 h-screen flex flex-col py-6 border-r border-slate-200 bg-white shadow-xs w-64 z-50 transition-transform duration-300 md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Portal Header / Brand */}
        <div className="px-6 mb-7 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">dashboard</span>
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 tracking-tight leading-tight">CampusPulse</h1>
              <p className="text-[11px] text-slate-500 font-medium">Bento Academic Suite</p>
            </div>
          </div>

          {/* Close button on mobile */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="md:hidden text-slate-500 hover:text-slate-900 p-1 rounded-lg"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          )}
        </div>

        {/* Section Label */}
        <div className="px-6 mb-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Navigation</span>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex flex-col gap-1.5 px-3 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-150 text-left w-full ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-bold border border-blue-100 shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    isActive ? 'fill-1 text-blue-600' : 'text-slate-400'
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Submit Feedback Action Button */}
        <div className="px-4 my-4">
          <button
            id="sidebar-submit-feedback-btn"
            onClick={() => {
              openFeedbackModal();
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full bg-slate-900 hover:bg-black text-white py-3 px-4 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">rate_review</span>
            Submit Feedback
          </button>
        </div>

        {/* Support & Logout footer */}
        <div className="px-3 pt-3 border-t border-slate-200 flex flex-col gap-1">
          <button
            id="sidebar-support-btn"
            onClick={() => {
              openSupportModal();
              if (onCloseMobile) onCloseMobile();
            }}
            className="flex items-center gap-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl px-4 py-2 text-xs font-medium transition-all text-left w-full"
          >
            <span className="material-symbols-outlined text-[18px] text-slate-400">contact_support</span>
            <span>Support Helpdesk</span>
          </button>

          <button
            id="sidebar-logout-btn"
            onClick={() => {
              openLoginModal();
              if (onCloseMobile) onCloseMobile();
            }}
            className="flex items-center gap-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl px-4 py-2 text-xs font-medium transition-all text-left w-full"
          >
            <span className="material-symbols-outlined text-[18px] text-slate-400">logout</span>
            <span>Switch Role / Sign Out</span>
          </button>

          {/* Current role mini badge */}
          <div className="mx-2 mt-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${currentRole === 'faculty' ? 'bg-blue-600' : 'bg-green-500'}`}></span>
              <span className="text-slate-700 font-semibold capitalize text-[11px]">{currentRole} Mode</span>
            </div>
            <button
              onClick={() => openLoginModal()}
              className="text-blue-600 font-bold hover:underline cursor-pointer text-[10px] uppercase tracking-wider"
            >
              Change
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
