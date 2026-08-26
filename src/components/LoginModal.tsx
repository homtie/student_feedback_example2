import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

interface LoginModalProps {
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const { currentRole, setCurrentRole, openSupportModal, showToast } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole);
  const [email, setEmail] = useState(
    currentRole === 'faculty' ? 's.miller@institution.edu' : 'alex.vance@institution.edu'
  );
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'faculty') {
      setEmail('s.miller@institution.edu');
    } else {
      setEmail('alex.vance@institution.edu');
    }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentRole(selectedRole);
    showToast(`Signed In as ${selectedRole === 'faculty' ? 'Dr. Sarah Miller' : 'Alex Vance'}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-12 relative my-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Left Column: Visual Showcase Bento Column */}
        <div className="md:col-span-5 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 flex flex-col justify-between relative overflow-hidden hidden md:flex text-white">
          <div className="relative z-10">
            <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-md mb-6">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest block mb-1">Institutional Portal</span>
            <h3 className="text-2xl font-extrabold text-white tracking-tight leading-snug">
              Academic Excellence in Every Interaction.
            </h3>
            <p className="text-xs text-blue-100 mt-3 leading-relaxed">
              Empowering the next generation of minds. Join a focused academic environment designed for course clarity, progress, and actionable faculty feedback.
            </p>
          </div>

          {/* Dean's list badge card */}
          <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-sm mt-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">award_star</span>
              </div>
              <div>
                <h5 className="font-bold text-xs text-white">Dean's List Accreditation</h5>
                <p className="text-[11px] text-blue-100">85% Completed • 3.8 Semester GPA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sign In Form */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white">
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Authentication</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">EduPulse Academy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">Welcome back</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Please select your persona or sign in to your dashboard</p>
          </div>

          {/* Role selector pill */}
          <div className="bg-slate-100 p-1 rounded-xl grid grid-cols-2 gap-1 mb-5 border border-slate-200">
            <button
              type="button"
              onClick={() => handleRoleChange('student')}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                selectedRole === 'student'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">school</span>
              Student
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('faculty')}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                selectedRole === 'faculty'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">psychology</span>
              Faculty
            </button>
          </div>

          <form onSubmit={handleSignIn} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Institutional Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[16px]">
                  mail
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@institution.edu"
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs text-slate-900 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[16px]">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-9 pr-9 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs text-slate-900 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 accent-blue-600"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => showToast('Password reset link sent to registered email')}
                className="text-blue-600 hover:underline font-semibold"
              >
                Forgot password?
              </button>
            </div>

            <button
              id="login-submit-btn"
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs mt-2"
            >
              Sign In
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </form>

          {/* Quick 1-click Demo switchers */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 text-center mb-2 uppercase tracking-wider">
              Quick 1-Click Persona Switch
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setCurrentRole('student');
                  onClose();
                  showToast('Switched to Alex Vance (Student)');
                }}
                className="py-2 px-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors text-center cursor-pointer"
              >
                Student Demo
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentRole('faculty');
                  onClose();
                  showToast('Switched to Dr. Sarah Miller (Faculty)');
                }}
                className="py-2 px-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors text-center cursor-pointer"
              >
                Faculty Demo
              </button>
            </div>
          </div>

          <div className="mt-3.5 text-center">
            <button
              type="button"
              onClick={() => {
                onClose();
                openSupportModal();
              }}
              className="text-xs text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Need help accessing your portal? <span className="font-semibold underline">Contact Support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
