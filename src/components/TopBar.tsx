import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';

interface TopBarProps {
  onOpenMobileMenu: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenMobileMenu }) => {
  const {
    currentUser,
    currentRole,
    setCurrentRole,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    openSupportModal,
    openLoginModal,
    setCurrentTab,
    courses,
    openFeedbackModal
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCourses = searchQuery.trim()
    ? courses.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.instructorName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="flex justify-between items-center w-full px-4 md:px-8 h-16 sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Toggle Button */}
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden text-slate-700 p-2 -ml-1 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Open navigation menu"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">CampusPulse</h2>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-600 border border-blue-100">
              v2.4 Active
            </span>
          </div>
          <p className="hidden md:block text-[11px] text-slate-500 font-normal">Real-time student engagement & faculty analytics</p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Live Database Connected Badge */}
        <div className="hidden lg:flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Live Database Connected</span>
        </div>

        {/* Search button / input */}
        <div className="relative" ref={searchRef}>
          <div className="hidden sm:flex items-center relative">
            <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[18px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              placeholder="Search courses, professors..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="pl-9 pr-4 py-1.5 w-44 lg:w-56 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:w-64 focus:bg-white focus:border-blue-500 transition-all"
            />
          </div>

          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="sm:hidden p-2 text-slate-500 hover:text-blue-600 transition-colors rounded-full hover:bg-slate-100"
            aria-label="Search"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          {/* Search Dropdown Results */}
          {isSearchOpen && searchQuery.trim().length > 0 && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-1.5 text-xs font-semibold text-slate-500 border-b border-slate-100 flex justify-between">
                <span>Courses & Instructors</span>
                <span>{filteredCourses.length} results</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {filteredCourses.length === 0 ? (
                  <div className="px-4 py-6 text-center text-xs text-slate-400">
                    No matching courses found for "{searchQuery}"
                  </div>
                ) : (
                  filteredCourses.map((course) => (
                    <div
                      key={course.id}
                      onClick={() => {
                        openFeedbackModal(course);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="px-3 py-2.5 hover:bg-slate-50 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-xs text-slate-800 flex items-center gap-2">
                          <span>{course.name}</span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-50 text-blue-600 font-mono border border-blue-100">
                            {course.code}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500">{course.instructorName}</div>
                      </div>
                      <button className="text-[11px] font-semibold text-blue-600 px-2 py-1 rounded bg-blue-50 hover:bg-blue-100">
                        Feedback
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            id="notifications-btn"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 text-slate-600 hover:text-blue-600 transition-colors duration-200 rounded-full hover:bg-slate-100 relative"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full"></span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-900">Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-xs text-blue-600 hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="mt-3 flex flex-col gap-2 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationAsRead(n.id)}
                    className={`p-3 rounded-xl transition-all cursor-pointer border ${
                      n.unread
                        ? 'bg-blue-50/70 border-blue-100'
                        : 'bg-slate-50 border-transparent hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="font-semibold text-xs text-slate-900">{n.title}</h5>
                      <span className="text-[10px] text-slate-400 flex-shrink-0">{n.timeAgo}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Help / Guide */}
        <button
          id="help-btn"
          onClick={openSupportModal}
          className="p-2 text-slate-600 hover:text-blue-600 transition-colors duration-200 rounded-full hover:bg-slate-100"
          aria-label="Help and documentation"
        >
          <span className="material-symbols-outlined text-[22px]">help</span>
        </button>

        {/* User Profile Avatar with dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            id="user-profile-menu-btn"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden cursor-pointer hover:opacity-85 transition-all border border-slate-300 focus:outline-none flex items-center justify-center ml-1"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="material-symbols-outlined text-[20px] text-slate-600">person</span>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-slate-900 truncate">{currentUser.name}</h4>
                  <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                  <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-600 capitalize border border-blue-100">
                    {currentUser.role} Account
                  </span>
                </div>
              </div>

              {/* Quick Role Switcher */}
              <div className="py-3 border-b border-slate-100">
                <label className="text-xs font-semibold text-slate-400 block mb-2 uppercase tracking-wider text-[10px]">Switch Active View</label>
                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => {
                      setCurrentRole('faculty');
                      setIsProfileOpen(false);
                    }}
                    className={`py-1.5 px-2 text-xs font-semibold rounded-lg transition-all ${
                      currentRole === 'faculty'
                        ? 'bg-white text-blue-600 shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Faculty View
                  </button>
                  <button
                    onClick={() => {
                      setCurrentRole('student');
                      setIsProfileOpen(false);
                    }}
                    className={`py-1.5 px-2 text-xs font-semibold rounded-lg transition-all ${
                      currentRole === 'student'
                        ? 'bg-white text-blue-600 shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Student View
                  </button>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-1">
                <button
                  onClick={() => {
                    setCurrentTab('settings');
                    setIsProfileOpen(false);
                  }}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors w-full text-left"
                >
                  <span className="material-symbols-outlined text-[18px]">settings</span>
                  <span>Portal Settings</span>
                </button>
                <button
                  onClick={() => {
                    openLoginModal();
                    setIsProfileOpen(false);
                  }}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  <span>Sign In / Switch Profile</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
