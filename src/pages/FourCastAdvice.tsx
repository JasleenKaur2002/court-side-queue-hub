
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Users, Target } from 'lucide-react';

const FourCastAdvice = () => {
  const [selectedCategory, setSelectedCategory] = useState('NBA Champion');

  const advice = {
    'NBA Champion': {
      recommendations: [
        { team: 'Boston Celtics', confidence: 85, trend: 'up', reason: 'Strong roster depth and proven playoff experience' },
        { team: 'Denver Nuggets', confidence: 78, trend: 'stable', reason: 'MVP-caliber player and solid supporting cast' },
        { team: 'Phoenix Suns', confidence: 72, trend: 'down', reason: 'Health concerns but high ceiling when healthy' },
      ],
      insights: [
        'Eastern Conference teams have slight edge this season',
        'Look for teams with championship experience',
        'Depth matters more than superstar talent alone'
      ]
    }
  };

  const categories = [
    'NBA Champion',
    'MVP', 
    'Rookie of the Year',
    'Coach of the Year',
    'Leading Scorer'
  ];

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen">
      <Header />
      <div className="pt-16">
        <header className="py-10 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">4Cast Advice</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">AI-powered insights and recommendations for your draft</p>
          </div>
        </header>
        <main className="px-4 md:px-8 pb-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Category Selector */}
            <div className="lg:col-span-1">
              <Card className="p-4">
                <h3 className="font-bold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* AI Recommendations */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Top Recommendations - {selectedCategory}
                </h3>
                <div className="space-y-4">
                  {advice[selectedCategory as keyof typeof advice]?.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium">{rec.team}</span>
                          {rec.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                          {rec.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{rec.reason}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{rec.confidence}%</div>
                        <Progress value={rec.confidence} className="w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Key Insights */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Key Insights
                </h3>
                <div className="space-y-3">
                  {advice[selectedCategory as keyof typeof advice]?.insights.map((insight, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Badge variant="outline" className="mt-1">{index + 1}</Badge>
                      <p className="text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Market Analysis */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Market Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">High</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Competition Level</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">74%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Prediction Accuracy</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">Medium</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Risk Level</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FourCastAdvice;
