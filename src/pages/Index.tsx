
import React, { useState } from 'react';
import AuthPage from '@/components/AuthPage';
import Dashboard from '@/components/Dashboard';
import ProgressFeed from '@/components/ProgressFeed';
import Leaderboard from '@/components/Leaderboard';
import CalorieTracker from '@/components/CalorieTracker';
import SleepTracker from '@/components/SleepTracker';
import ChatBot from '@/components/ChatBot';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { LogOut, Settings } from 'lucide-react';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('dashboard');
  };

  if (!isAuthenticated) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'feed':
        return <ProgressFeed />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'calories':
        return <CalorieTracker />;
      case 'sleep':
        return <SleepTracker />;
      case 'chat':
        return <ChatBot />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-lg">
              <span className="text-white font-bold text-lg">FT</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900">FitTracker</h1>
              <p className="text-xs text-gray-500">Stay healthy, stay strong</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 pb-20">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
