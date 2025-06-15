
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Medal, Award, Crown, Flame, Target } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Leaderboard = () => {
  const weeklyLeaders = [
    {
      rank: 1,
      name: 'Emma Rodriguez',
      initials: 'ER',
      points: 2840,
      workouts: 6,
      calories: 15420,
      streak: 12,
      badge: 'gold'
    },
    {
      rank: 2,
      name: 'James Wilson',
      initials: 'JW',
      points: 2650,
      workouts: 5,
      calories: 14850,
      streak: 8,
      badge: 'silver'
    },
    {
      rank: 3,
      name: 'Maya Patel',
      initials: 'MP',
      points: 2480,
      workouts: 5,
      calories: 13900,
      streak: 15,
      badge: 'bronze'
    },
    {
      rank: 4,
      name: 'You',
      initials: 'YO',
      points: 2320,
      workouts: 4,
      calories: 12800,
      streak: 5,
      badge: null,
      isCurrentUser: true
    },
    {
      rank: 5,
      name: 'David Kim',
      initials: 'DK',
      points: 2180,
      workouts: 4,
      calories: 12200,
      streak: 3,
      badge: null
    }
  ];

  const monthlyLeaders = [
    {
      rank: 1,
      name: 'Sarah Chen',
      initials: 'SC',
      points: 11840,
      workouts: 24,
      calories: 62420,
      streak: 22,
      badge: 'gold'
    },
    {
      rank: 2,
      name: 'Alex Johnson',
      initials: 'AJ',
      points: 10950,
      workouts: 22,
      calories: 58900,
      streak: 18,
      badge: 'silver'
    },
    {
      rank: 3,
      name: 'You',
      initials: 'YO',
      points: 9680,
      workouts: 18,
      calories: 51200,
      streak: 12,
      badge: 'bronze',
      isCurrentUser: true
    }
  ];

  const getBadgeIcon = (badge: string | null, rank: number) => {
    switch (badge) {
      case 'gold':
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 'silver':
        return <Trophy className="h-5 w-5 text-gray-400" />;
      case 'bronze':
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">#{rank}</div>;
    }
  };

  const getBadgeColor = (badge: string | null) => {
    switch (badge) {
      case 'gold':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 'silver':
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 'bronze':
        return 'bg-gradient-to-r from-amber-400 to-amber-600';
      default:
        return 'bg-gradient-to-r from-emerald-400 to-teal-600';
    }
  };

  const LeaderboardList = ({ leaders }: { leaders: typeof weeklyLeaders }) => (
    <div className="space-y-3">
      {leaders.map((leader, index) => (
        <Card 
          key={leader.rank} 
          className={`hover:shadow-md transition-all duration-200 ${
            leader.isCurrentUser ? 'ring-2 ring-emerald-400 bg-emerald-50' : ''
          } ${index < 3 ? 'border-l-4 ' + (
            index === 0 ? 'border-yellow-400' : 
            index === 1 ? 'border-gray-400' : 
            'border-amber-600'
          ) : ''}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center">
                  {getBadgeIcon(leader.badge, leader.rank)}
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarFallback className={getBadgeColor(leader.badge) + " text-white"}>
                    {leader.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className={`font-semibold ${leader.isCurrentUser ? 'text-emerald-700' : 'text-gray-900'}`}>
                      {leader.name}
                    </p>
                    {leader.isCurrentUser && (
                      <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                        You
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{leader.points} points</p>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Target className="h-3 w-3" />
                    <span>{leader.workouts}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Flame className="h-3 w-3" />
                    <span>{leader.calories.toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {leader.streak} day streak
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Leaderboard</h2>
        <p className="text-gray-600">Compete with friends and stay motivated!</p>
      </div>

      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="weekly">This Week</TabsTrigger>
          <TabsTrigger value="monthly">This Month</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weekly" className="mt-6">
          <LeaderboardList leaders={weeklyLeaders} />
        </TabsContent>
        
        <TabsContent value="monthly" className="mt-6">
          <LeaderboardList leaders={monthlyLeaders} />
        </TabsContent>
      </Tabs>

      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-700">
            <Award className="h-5 w-5" />
            <span>Achievement Badges</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto">
                <Flame className="h-6 w-6 text-white" />
              </div>
              <p className="text-xs font-medium">Calorie Crusher</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                <Target className="h-6 w-6 text-white" />
              </div>
              <p className="text-xs font-medium">Goal Getter</p>
            </div>
            <div className="space-y-2 opacity-50">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto">
                <Trophy className="h-6 w-6 text-gray-500" />
              </div>
              <p className="text-xs font-medium">Champion</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
