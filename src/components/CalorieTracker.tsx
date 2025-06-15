
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Camera, Utensils, Apple, Coffee, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CalorieTracker = () => {
  const [dailyGoal] = useState(2200);
  const [consumedCalories] = useState(1847);
  const [showAddFood, setShowAddFood] = useState(false);

  const todaysMeals = [
    {
      id: 1,
      name: 'Greek Yogurt with Berries',
      calories: 180,
      time: '8:30 AM',
      meal: 'breakfast',
      protein: 15,
      carbs: 22,
      fat: 5
    },
    {
      id: 2,
      name: 'Grilled Chicken Salad',
      calories: 420,
      time: '12:45 PM',
      meal: 'lunch',
      protein: 35,
      carbs: 15,
      fat: 18
    },
    {
      id: 3,
      name: 'Apple with Almond Butter',
      calories: 190,
      time: '3:20 PM',
      meal: 'snack',
      protein: 4,
      carbs: 25,
      fat: 8
    },
    {
      id: 4,
      name: 'Salmon with Quinoa',
      calories: 520,
      time: '7:15 PM',
      meal: 'dinner',
      protein: 40,
      carbs: 45,
      fat: 22
    },
    {
      id: 5,
      name: 'Green Tea',
      calories: 2,
      time: '9:00 PM',
      meal: 'drink',
      protein: 0,
      carbs: 0,
      fat: 0
    }
  ];

  const progressPercentage = (consumedCalories / dailyGoal) * 100;
  const remainingCalories = dailyGoal - consumedCalories;

  const getMealIcon = (meal: string) => {
    switch (meal) {
      case 'breakfast':
        return <Coffee className="h-4 w-4" />;
      case 'lunch':
        return <Utensils className="h-4 w-4" />;
      case 'dinner':
        return <Utensils className="h-4 w-4" />;
      case 'snack':
        return <Apple className="h-4 w-4" />;
      default:
        return <Coffee className="h-4 w-4" />;
    }
  };

  const getMealColor = (meal: string) => {
    switch (meal) {
      case 'breakfast':
        return 'bg-orange-100 text-orange-700';
      case 'lunch':
        return 'bg-green-100 text-green-700';
      case 'dinner':
        return 'bg-blue-100 text-blue-700';
      case 'snack':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Calorie Tracker</h2>
        <p className="text-gray-600">Track your daily nutrition and stay on target</p>
      </div>

      {/* Daily Overview */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-orange-700">Today's Progress</span>
            <Badge variant="outline" className="text-orange-700 border-orange-300">
              {Math.round(progressPercentage)}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">{consumedCalories}</p>
              <p className="text-sm text-gray-600">of {dailyGoal} calories</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-orange-600">
                {remainingCalories > 0 ? remainingCalories : 0}
              </p>
              <p className="text-sm text-gray-600">remaining</p>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          {remainingCalories < 0 && (
            <p className="text-sm text-orange-600 font-medium">
              You've exceeded your daily goal by {Math.abs(remainingCalories)} calories
            </p>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="today">Today's Log</TabsTrigger>
          <TabsTrigger value="add">Add Food</TabsTrigger>
        </TabsList>
        
        <TabsContent value="today" className="mt-6 space-y-4">
          {todaysMeals.map((meal) => (
            <Card key={meal.id} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${getMealColor(meal.meal)}`}>
                      {getMealIcon(meal.meal)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{meal.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{meal.time}</span>
                        <Badge variant="outline" className="text-xs capitalize">
                          {meal.meal}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{meal.calories} cal</p>
                    <p className="text-xs text-gray-500">
                      P:{meal.protein}g C:{meal.carbs}g F:{meal.fat}g
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="add" className="mt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                className="h-20 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              >
                <Camera className="h-6 w-6 mr-2" />
                Scan Food with Camera
              </Button>
              <Button 
                variant="outline" 
                className="h-20 border-2 border-dashed border-gray-300 hover:border-emerald-400"
                onClick={() => setShowAddFood(!showAddFood)}
              >
                <Plus className="h-6 w-6 mr-2" />
                Add Manually
              </Button>
            </div>

            {showAddFood && (
              <Card className="border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-lg">Add Food Manually</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="foodName">Food Name</Label>
                      <Input 
                        id="foodName" 
                        placeholder="e.g., Grilled Chicken Breast"
                        className="border-gray-200 focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="calories">Calories</Label>
                      <Input 
                        id="calories" 
                        type="number" 
                        placeholder="250"
                        className="border-gray-200 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="protein">Protein (g)</Label>
                      <Input 
                        id="protein" 
                        type="number" 
                        placeholder="25"
                        className="border-gray-200 focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="carbs">Carbs (g)</Label>
                      <Input 
                        id="carbs" 
                        type="number" 
                        placeholder="10"
                        className="border-gray-200 focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fat">Fat (g)</Label>
                      <Input 
                        id="fat" 
                        type="number" 
                        placeholder="8"
                        className="border-gray-200 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Add to Log
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-700 flex items-center space-x-2">
                  <Camera className="h-5 w-5" />
                  <span>AI-Powered Food Recognition</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-600 mb-3">
                  Simply take a photo of your meal and our AI will automatically identify 
                  the food and estimate calories and macronutrients!
                </p>
                <div className="flex items-center space-x-2 text-xs text-blue-500">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Works with most common foods</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-blue-500">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Instant nutritional breakdown</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CalorieTracker;
