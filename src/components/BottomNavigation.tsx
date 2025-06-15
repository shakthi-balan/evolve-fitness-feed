
import React from 'react';
import { Home, Users, PlusCircle, Activity, MessageCircle, Moon } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const tabs = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'feed', icon: PlusCircle, label: 'Feed' },
    { id: 'leaderboard', icon: Users, label: 'Leaders' },
    { id: 'calories', icon: Activity, label: 'Calories' },
    { id: 'sleep', icon: Moon, label: 'Sleep' },
    { id: 'chat', icon: MessageCircle, label: 'AI Coach' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'text-emerald-600 bg-emerald-50'
                : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
            }`}
          >
            <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-emerald-600' : ''}`} />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
