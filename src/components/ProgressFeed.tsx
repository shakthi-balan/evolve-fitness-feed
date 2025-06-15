
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Share, Camera, Plus } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const ProgressFeed = () => {
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState('');

  const posts = [
    {
      id: 1,
      user: { name: 'Alex Johnson', initials: 'AJ' },
      content: 'Just finished my morning 5K run! Feeling energized and ready to take on the day. The weather was perfect and I managed to beat my personal record by 30 seconds! 🏃‍♂️💪',
      image: '/api/placeholder/400/300',
      likes: 24,
      comments: 8,
      timestamp: '2 hours ago',
      liked: false
    },
    {
      id: 2,
      user: { name: 'Sarah Chen', initials: 'SC' },
      content: 'Week 3 of my fitness journey and I can already see the difference! Consistency is key. Thanks to everyone for the motivation! 💪✨',
      image: '/api/placeholder/400/250',
      likes: 45,
      comments: 12,
      timestamp: '4 hours ago',
      liked: true
    },
    {
      id: 3,
      user: { name: 'Mike Torres', initials: 'MT' },
      content: 'New PR on bench press today! 185lbs x 5 reps. The grind never stops! Special thanks to my workout buddy for pushing me.',
      likes: 18,
      comments: 5,
      timestamp: '6 hours ago',
      liked: false
    }
  ];

  const handleNewPost = () => {
    if (newPost.trim()) {
      console.log('New post:', newPost);
      setNewPost('');
      setShowNewPost(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Community Feed</h2>
        <p className="text-gray-600 text-sm">Share your progress and inspire others!</p>
      </div>

      {/* New Post Button */}
      <Button
        onClick={() => setShowNewPost(!showNewPost)}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
      >
        <Plus className="h-4 w-4 mr-2" />
        Share Your Progress
      </Button>

      {/* New Post Form */}
      {showNewPost && (
        <Card className="border-emerald-200">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Textarea
                placeholder="Share your fitness achievement or progress..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px] border-gray-200 focus:border-emerald-500"
              />
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm">
                  <Camera className="h-4 w-4 mr-2" />
                  Add Photo
                </Button>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setShowNewPost(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleNewPost} className="bg-emerald-600 hover:bg-emerald-700">
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                    {post.user.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{post.user.name}</p>
                  <p className="text-xs text-gray-500">{post.timestamp}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-700 mb-4">{post.content}</p>
              {post.image && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img
                    src={post.image}
                    alt="Progress post"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center space-x-1 ${
                      post.liked ? 'text-red-500' : 'text-gray-600'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${post.liked ? 'fill-current' : ''}`} />
                    <span>{post.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-600">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProgressFeed;
