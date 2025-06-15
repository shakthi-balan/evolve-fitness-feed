
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Moon, Clock, TrendingUp, Calendar, Star, Bed } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const SleepTracker = () => {
  const [showLogSleep, setShowLogSleep] = useState(false);
  const [bedTime, setBedTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');

  const sleepData = [
    { date: 'Today', hours: 0, quality: 0, bedTime: '', wakeTime: '', logged: false },
    { date: 'Yesterday', hours: 7.5, quality: 8, bedTime: '10:30 PM', wakeTime: '6:00 AM', logged: true },
    { date: '2 days ago', hours: 6.8, quality: 6, bedTime: '11:15 PM', wakeTime: '6:00 AM', logged: true },
    { date: '3 days ago', hours: 8.2, quality: 9, bedTime: '10:00 PM', wakeTime: '6:15 AM', logged: true },
    { date: '4 days ago', hours: 7.0, quality: 7, bedTime: '10:45 PM', wakeTime: '5:45 AM', logged: true },
    { date: '5 days ago', hours: 8.5, quality: 9, bedTime: '9:30 PM', wakeTime: '6:00 AM', logged: true },
    { date: '6 days ago', hours: 6.5, quality: 5, bedTime: '11:30 PM', wakeTime: '6:00 AM', logged: true }
  ];

  const weeklyAverage = sleepData.filter(d => d.logged).reduce((acc, curr) => acc + curr.hours, 0) / sleepData.filter(d => d.logged).length;
  const averageQuality = sleepData.filter(d => d.logged).reduce((acc, curr) => acc + curr.quality, 0) / sleepData.filter(d => d.logged).length;
  const sleepGoal = 8;
  const goalProgress = (weeklyAverage / sleepGoal) * 100;

  const getQualityColor = (quality: number) => {
    if (quality >= 8) return 'text-green-600 bg-green-100';
    if (quality >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getQualityText = (quality: number) => {
    if (quality >= 8) return 'Excellent';
    if (quality >= 6) return 'Good';
    if (quality >= 4) return 'Fair';
    return 'Poor';
  };

  const handleLogSleep = () => {
    if (bedTime && wakeTime) {
      console.log('Logging sleep:', { bedTime, wakeTime });
      setShowLogSleep(false);
      setBedTime('');
      setWakeTime('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Sleep Tracker</h2>
        <p className="text-gray-600">Monitor your sleep patterns for better health</p>
      </div>

      {/* Today's Sleep Prompt */}
      {!sleepData[0].logged && (
        <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-purple-700">
              <Moon className="h-5 w-5" />
              <span>Log Last Night's Sleep</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-purple-600 mb-4">
              Don't forget to log how you slept last night! It helps track your sleep patterns.
            </p>
            <Button 
              onClick={() => setShowLogSleep(true)}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
            >
              <Bed className="h-4 w-4 mr-2" />
              Log Sleep
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Sleep Logging Form */}
      {showLogSleep && (
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle>Log Your Sleep</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedTime">Bedtime</Label>
                <Input 
                  id="bedTime" 
                  type="time"
                  value={bedTime}
                  onChange={(e) => setBedTime(e.target.value)}
                  className="border-gray-200 focus:border-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wakeTime">Wake Time</Label>
                <Input 
                  id="wakeTime" 
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="border-gray-200 focus:border-purple-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Sleep Quality (1-10)</Label>
              <div className="flex space-x-2">
                {[1,2,3,4,5,6,7,8,9,10].map((num) => (
                  <Button
                    key={num}
                    variant="outline"
                    size="sm"
                    className="w-10 h-10 p-0 hover:bg-purple-100"
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowLogSleep(false)}>
                Cancel
              </Button>
              <Button onClick={handleLogSleep} className="bg-purple-600 hover:bg-purple-700">
                Save Sleep Log
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sleep Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Average Sleep</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">
                {weeklyAverage.toFixed(1)}h
              </p>
              <Progress value={goalProgress} className="h-2" />
              <p className="text-xs text-gray-600">
                Goal: {sleepGoal}h ({Math.round(goalProgress)}%)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700 flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Sleep Quality</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">
                {averageQuality.toFixed(1)}/10
              </p>
              <Badge className={getQualityColor(averageQuality)}>
                {getQualityText(averageQuality)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Sleep Streak</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">6 days</p>
              <p className="text-xs text-gray-600">Consistent tracking</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sleep History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Sleep History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sleepData.map((day, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  !day.logged ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    !day.logged ? 'bg-gray-200' : 
                    day.quality >= 8 ? 'bg-green-100' : 
                    day.quality >= 6 ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    <Moon className={`h-4 w-4 ${
                      !day.logged ? 'text-gray-500' : 
                      day.quality >= 8 ? 'text-green-600' : 
                      day.quality >= 6 ? 'text-yellow-600' : 'text-red-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{day.date}</p>
                    {day.logged ? (
                      <p className="text-sm text-gray-500">
                        {day.bedTime} - {day.wakeTime}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400">Not logged yet</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  {day.logged ? (
                    <>
                      <p className="font-bold text-gray-900">{day.hours}h</p>
                      <Badge className={`text-xs ${getQualityColor(day.quality)}`}>
                        {day.quality}/10
                      </Badge>
                    </>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setShowLogSleep(true)}
                    >
                      Log
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SleepTracker;
