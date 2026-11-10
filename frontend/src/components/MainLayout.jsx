import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function MainLayout({
  activeScreen = 'dashboard',
  onNavigate,
  onLogout,
  searchQuery = '',
  onSearchChange,
  unreadCount = 0,
  isNotificationsActive = false,
  onOpenNotifications,
  children,
}) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] selection:bg-brand-100 selection:text-brand-700">
      {/* Static Fixed Sidebar */}
      <Sidebar
        activeScreen={activeScreen}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content Wrapper offset by fixed Sidebar (pl-64) and fixed Header (pt-20) */}
      <div className="pl-64 pt-20 min-h-screen flex flex-col min-w-0">
        {/* Static Fixed Top Navbar */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          unreadCount={unreadCount}
          isNotificationsActive={isNotificationsActive}
          onOpenNotifications={onOpenNotifications}
          onNavigate={onNavigate}
          onLogout={onLogout}
        />

        {/* Dynamic Screen Content */}
        <main className="flex-1 px-10 pb-12">{children}</main>
      </div>
    </div>
  );
}
