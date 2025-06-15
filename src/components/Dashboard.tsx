
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Activity, Target, Moon, Flame, Trophy, Users } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: "Today's Calories",
      value: "1,847",
      target: "2,200",
      progress: 84,
      icon: Flame,
      color: "text-orange-600"
    },
    {
      title: "Sleep Last Night",
      value: "7.5h",
      target: "8h",
      progress: 94,
      icon: Moon,
      color: "text-purple-600"
    },
    {
      title: "Weekly Goal",
      value: "4/5",
      target: "workouts",
      progress: 80,
      icon: Target,
      color: "text-emerald-600"
    },
    {
      title: "Leaderboard",
      value: "#3",
      target: "this week",
      progress: 0,
      icon: Trophy,
      color: "text-yellow-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Good Morning!</h1>
        <p className="text-gray-600">Ready to crush your fitness goals today?</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-2">
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">
                  {stat.target}
                </div>
              </div>
              {stat.progress > 0 && (
                <div className="mt-3">
                  <Progress value={stat.progress} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    {stat.progress}% complete
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-emerald-600" />
            <span>Community Highlights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">J</span>
              </div>
              <div>
                <p className="text-sm font-medium">John completed a 5K run!</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">S</span>
              </div>
              <div>
                <p className="text-sm font-medium">Sarah hit her calorie goal!</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
