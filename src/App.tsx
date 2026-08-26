import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { FacultyDashboard } from './components/FacultyDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { FeedbackManagement } from './components/FeedbackManagement';
import { CoursesView } from './components/CoursesView';
import { ReportsView } from './components/ReportsView';
import { SettingsView } from './components/SettingsView';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { CourseFeedbackForm } from './components/CourseFeedbackForm';
import { FeedbackModal } from './components/FeedbackModal';
import { FeedbackDetailModal } from './components/FeedbackDetailModal';
import { LoginModal } from './components/LoginModal';
import { SupportModal } from './components/SupportModal';
import { Toast } from './components/Toast';
import { FeedbackSubmission } from './types';

const MainLayout: React.FC = () => {
  const {
    currentTab,
    currentRole,
    isFeedbackModalOpen,
    selectedCourseForFeedback,
    closeFeedbackModal,
    isSupportModalOpen,
    closeSupportModal,
    isLoginModalOpen,
    closeLoginModal
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inspectedFeedback, setInspectedFeedback] = useState<FeedbackSubmission | null>(null);

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-row selection:bg-primary-container selection:text-on-primary-container">
      {/* Sidebar Navigation */}
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area (Offset by 64 = 16rem on md+ screens) */}
      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        {/* Header / TopBar */}
        <TopBar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Dynamic View Canvas */}
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12 overflow-x-hidden">
          {currentTab === 'dashboard' && (
            <>
              {currentRole === 'faculty' ? (
                <FacultyDashboard onInspectFeedback={(fb) => setInspectedFeedback(fb)} />
              ) : (
                <StudentDashboard />
              )}
            </>
          )}

          {currentTab === 'courses' && <CoursesView />}

          {currentTab === 'analytics' && (
            <AnalyticsDashboard onInspectFeedback={(fb) => setInspectedFeedback(fb)} />
          )}

          {currentTab === 'feedback-form' && (
            <div className="max-w-3xl mx-auto">
              <CourseFeedbackForm
                onSuccess={() => {
                  // Navigate to analytics or dashboard after submission
                }}
              />
            </div>
          )}

          {currentTab === 'feedback-history' && (
            <FeedbackManagement onInspectFeedback={(fb) => setInspectedFeedback(fb)} />
          )}

          {currentTab === 'reports' && <ReportsView />}

          {currentTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Modals & Dialogs */}
      {isFeedbackModalOpen && (
        <FeedbackModal
          course={selectedCourseForFeedback}
          onClose={closeFeedbackModal}
        />
      )}

      {inspectedFeedback && (
        <FeedbackDetailModal
          feedback={inspectedFeedback}
          onClose={() => setInspectedFeedback(null)}
        />
      )}

      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}

      {isSupportModalOpen && <SupportModal onClose={closeSupportModal} />}

      {/* Global Toast */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
