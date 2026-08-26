import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const SettingsView: React.FC = () => {
  const { currentUser, resetAllData, showToast } = useApp();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [anonymousDefault, setAnonymousDefault] = useState(true);
  const [reminderFrequency, setReminderFrequency] = useState('weekly');

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Preferences</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Account Settings</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">Portal Settings</h2>
        <p className="text-xs md:text-sm text-slate-500 font-normal mt-0.5">
          Manage user profile preferences, notifications, and local dataset state.
        </p>
      </div>

      {/* User Profile Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
        <h3 className="text-base font-bold text-slate-900 mb-3">Active Profile</h3>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-blue-50 flex-shrink-0 border border-slate-200">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">{currentUser.name}</h4>
            <p className="text-xs text-slate-500 font-medium">{currentUser.email}</p>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">{currentUser.department}</p>
            <span className="inline-block mt-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wider">
              Role: {currentUser.role}
            </span>
          </div>
        </div>
      </div>

      {/* Preferences Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
        <h3 className="text-base font-bold text-slate-900">Feedback & Notification Preferences</h3>

        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div>
            <h5 className="text-xs font-bold text-slate-800">Default to Anonymous Submissions</h5>
            <p className="text-xs text-slate-500">Hide your name automatically when providing course evaluations.</p>
          </div>
          <input
            type="checkbox"
            checked={anonymousDefault}
            onChange={(e) => {
              setAnonymousDefault(e.target.checked);
              showToast('Preference Saved');
            }}
            className="w-4 h-4 text-blue-600 rounded cursor-pointer accent-blue-600"
          />
        </div>

        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div>
            <h5 className="text-xs font-bold text-slate-800">Evaluation Period Alerts</h5>
            <p className="text-xs text-slate-500">Receive alerts when mid-term or semester survey windows open.</p>
          </div>
          <input
            type="checkbox"
            checked={emailAlerts}
            onChange={(e) => {
              setEmailAlerts(e.target.checked);
              showToast('Notification settings updated');
            }}
            className="w-4 h-4 text-blue-600 rounded cursor-pointer accent-blue-600"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-xs font-bold text-slate-800">Survey Reminder Frequency</h5>
            <p className="text-xs text-slate-500">How often reminders for pending feedback should trigger.</p>
          </div>
          <select
            value={reminderFrequency}
            onChange={(e) => {
              setReminderFrequency(e.target.value);
              showToast('Reminder frequency saved');
            }}
            className="bg-slate-50 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 outline-none text-slate-700 cursor-pointer"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="never">Never</option>
          </select>
        </div>
      </div>

      {/* Reset & Demo Utilities */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
        <h3 className="text-base font-bold text-rose-600 mb-1">Demo Data & Cache Management</h3>
        <p className="text-xs text-slate-500 mb-4">
          Reset all locally stored evaluations, ratings, drafts, and return to original sample college dataset.
        </p>

        <button
          onClick={resetAllData}
          className="px-4 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">restart_alt</span>
          Reset All Data to Default
        </button>
      </div>
    </div>
  );
};
