
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, User, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm your AI fitness coach. I'm here to help you with workout plans, nutrition advice, motivation, and answer any fitness-related questions. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "Create a workout plan for me",
    "What should I eat post-workout?",
    "How can I stay motivated?",
    "Help me with my form",
    "Suggest healthy recipes",
    "Track my progress"
  ];

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(newMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('workout') || input.includes('exercise')) {
      return "Great question about workouts! I'd recommend starting with a balanced routine that includes both cardio and strength training. For beginners, try 3-4 days per week with exercises like squats, push-ups, planks, and 20-30 minutes of cardio. Would you like me to create a specific plan based on your fitness level and goals?";
    }
    
    if (input.includes('diet') || input.includes('nutrition') || input.includes('eat')) {
      return "Nutrition is crucial for fitness success! Focus on whole foods: lean proteins (chicken, fish, beans), complex carbs (quinoa, sweet potatoes), healthy fats (avocados, nuts), and plenty of vegetables. Aim for balanced meals and stay hydrated. What are your specific nutrition goals?";
    }
    
    if (input.includes('motivation') || input.includes('motivated')) {
      return "Staying motivated can be challenging! Here are some tips: Set small, achievable goals, track your progress, find a workout buddy, vary your routine to prevent boredom, and celebrate your victories. Remember, consistency beats perfection. What's your biggest motivation challenge?";
    }
    
    if (input.includes('calories') || input.includes('weight')) {
      return "For healthy weight management, focus on creating a moderate caloric deficit through a combination of diet and exercise. Generally, aim for 1-2 pounds per week. Use our calorie tracker to monitor your intake and ensure you're eating enough to fuel your workouts!";
    }
    
    if (input.includes('sleep') || input.includes('rest')) {
      return "Sleep is incredibly important for fitness! Aim for 7-9 hours per night. Good sleep helps with muscle recovery, hormone regulation, and energy levels. Try to maintain a consistent sleep schedule and create a relaxing bedtime routine. How has your sleep been lately?";
    }
    
    return "That's a great question! I'm here to help with all aspects of your fitness journey - from workout plans and nutrition advice to motivation and progress tracking. Could you tell me more specifically what you'd like help with? I can provide personalized recommendations based on your goals and current fitness level.";
  };

  const handleQuickQuestion = (question: string) => {
    setNewMessage(question);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">AI Fitness Coach</h2>
        <p className="text-gray-600">Get personalized fitness advice and motivation</p>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b">
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-purple-700">FitBot AI</span>
              <div className="flex items-center space-x-1 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex items-start space-x-3 ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={
                      message.sender === 'bot' 
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white' 
                        : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                    }>
                      {message.sender === 'bot' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'text-right' : ''}`}>
                    <div className={`p-3 rounded-lg ${
                      message.sender === 'bot' 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="border-t bg-white p-4 space-y-3">
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs hover:bg-purple-50 hover:border-purple-300"
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  {question}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ask me anything about fitness..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 border-gray-200 focus:border-purple-500"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isTyping}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;
