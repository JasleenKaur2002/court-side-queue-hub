import React, { useEffect } from 'react'
import Header from '@/components/layout/Header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate, useLocation } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import Chart from 'chart.js/auto'

const PostDraftLanding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      toast({
        variant: "destructive",
        description: "Error: You cannot return to Draft Lobby",
        className: "bg-red-500 text-white border-none"
      });
      window.history.pushState(null, '', location.pathname);
    };

    window.history.pushState(null, '', location.pathname);
    window.addEventListener('popstate', handlePopState);

    let cumulativeChart: Chart | null = null;
    let weeklyChart: Chart | null = null;

    const cumulativeCtx = document.getElementById('cumulativeScoreChart') as HTMLCanvasElement;
    if (cumulativeCtx) {
      cumulativeChart = new Chart(cumulativeCtx, {
        type: 'line',
        data: {
          labels: [
            'Weekly Performance',
            'In-Season Tournament Champion',
            'Points Per Game Leader',
            'Assists Per Game Leader',
            'Blocks Per Game Leader',
            'Steals Per Game Leader',
            'Rebounds Per Game Leader',
            'Three Pointers Made Leader',
            'Field Goal Percentage Leader',
            'Three Point Percentage Leader',
            'Box Score Plus/Minus Leader',
            'All-NBA First Team Selection',
            'All-Defensive First Team',
            'Most Valuable Player',
            'Defensive Player of the Year',
            'Rookie of the Year',
            'Coach of the Year',
            'NBA Champion',
            'Eastern Conference Champion',
            'Western Conference Champion'
          ],
          datasets: [
            {
              label: 'Sauce Cumulative',
              data: [80, 90, 120, 140, 160, 180, 190, 200, 210, 220, 230, 235, 240, 245, 250, 250, 250, 250, 250, 250],
              borderColor: '#22c55e', 
              backgroundColor: '#22c55e',
              tension: 0.3,
              borderWidth: 3,
              fill: false,
              hidden: false,
              pointRadius: 0
            },
            {
              label: 'Josh Cumulative',
              data: [100, 100, 100, 120, 120, 120, 140, 140, 160, 180, 190, 200, 210, 220, 230, 235, 240, 245, 245, 245],
              borderColor: '#eab308', 
              backgroundColor: '#eab308',
              tension: 0.3,
              borderWidth: 3,
              fill: false,
              hidden: false,
              pointRadius: 0
            },
            {
              label: 'Jacko Cumulative',
              data: [60, 60, 65, 70, 80, 85, 90, 95, 100, 110, 120, 130, 140, 150, 160, 160, 160, 160, 160, 160],
              borderColor: '#f97316',
              backgroundColor: '#f97316',
              tension: 0.3,
              borderWidth: 3,
              fill: false,
              hidden: false,
              pointRadius: 0
            },
            {
              label: 'Trent Cumulative',
              data: [70, 70, 65, 65, 65, 70, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75],
              borderColor: '#ec4899', 
              backgroundColor: '#ec4899',
              tension: 0.3,
              borderWidth: 3,
              fill: false,
              hidden: false,
              pointRadius: 0
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 30,
              right: 30,
              bottom: 30,
              left: 30
            }
          },
          scales: {
            y: {
              min: 0,
              max: 300,
              grid: {
                color: 'rgba(156, 163, 175, 0.1)',
              },
              border: {
                display: true,
                color: 'rgba(156, 163, 175, 0.3)'
              },
              ticks: {
                stepSize: 50,
                font: {
                  size: 13,
                  weight: 500,
                  family: 'Inter, system-ui, sans-serif'
                },
                padding: 12,
                color: 'rgb(107, 114, 128)'
              },
              title: {
                display: true,
                text: 'Cumulative Points',
                font: {
                  size: 14,
                  weight: 600,
                  family: 'Inter, system-ui, sans-serif'
                },
                color: 'rgb(75, 85, 99)',
                padding: { bottom: 15 }
              }
            },
            x: {
              grid: {
                display: false
              },
              border: {
                display: true,
                color: 'rgba(156, 163, 175, 0.3)'
              },
              ticks: {
                font: {
                  size: 11,
                  weight: 500,
                  family: 'Inter, system-ui, sans-serif'
                },
                padding: 8,
                color: 'rgb(107, 114, 128)',
                maxRotation: 45,
                minRotation: 45,
                autoSkip: false
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              align: 'center',
              labels: {
                boxWidth: 20,
                boxHeight: 20,
                padding: 20,
                font: {
                  size: 13,
                  weight: 600,
                  family: 'Inter, system-ui, sans-serif'
                },
                usePointStyle: true,
                pointStyle: 'circle'
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleFont: {
                size: 14,
                weight: 600,
                family: 'Inter, system-ui, sans-serif'
              },
              bodyFont: {
                size: 13,
                family: 'Inter, system-ui, sans-serif'
              },
              padding: 12,
              cornerRadius: 6,
              displayColors: true,
              mode: 'index',
              intersect: false
            }
          },
          interaction: {
            intersect: false,
            mode: 'index'
          }
        }
      });

      const weeklyCtx = document.getElementById('weeklyScoreChart') as HTMLCanvasElement;
      if (weeklyCtx) {
        weeklyChart = new Chart(weeklyCtx, {
          type: 'line',
          data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Current'],
            datasets: [{
              label: 'Weekly Score',
              data: [65, 72, 68, 85, 82, 86],
              borderColor: 'rgb(34, 197, 94)',
              backgroundColor: 'rgb(34, 197, 94)',
              tension: 0.1,
              borderWidth: 3,
              fill: false,
              pointBackgroundColor: 'rgb(34, 197, 94)',
              pointBorderColor: 'rgb(34, 197, 94)',
              pointRadius: 5,
              pointHoverRadius: 7
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                grid: {
                  color: 'rgba(156, 163, 175, 0.1)'
                },
                ticks: {
                  font: {
                    size: 12,
                    weight: 500
                  },
                  color: 'rgb(107, 114, 128)'
                },
                title: {
                  display: true,
                  text: 'Weekly Points',
                  font: {
                    size: 14,
                    weight: 600
                  },
                  color: 'rgb(75, 85, 99)'
                }
              },
              x: {
                grid: {
                  display: false
                },
                ticks: {
                  font: {
                    size: 12,
                    weight: 500
                  },
                  color: 'rgb(107, 114, 128)'
                }
              }
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
                labels: {
                  font: {
                    size: 13,
                    weight: 600
                  },
                  padding: 20,
                  usePointStyle: true,
                  pointStyle: 'circle'
                }
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFont: {
                  size: 14,
                  weight: 600
                },
                bodyFont: {
                  size: 13
                },
                padding: 12,
                cornerRadius: 6,
                displayColors: true
              }
            },
            interaction: {
              intersect: false,
              mode: 'index'
            }
          }
        });
      }
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (cumulativeChart) {
        cumulativeChart.destroy();
      }
      if (weeklyChart) {
        weeklyChart.destroy();
      }
    };
  }, [location.pathname, toast]);

  const handleViewDetails = () => {
    toast({
      variant: "destructive",
      description: "Error: You cannot return to Draft Lobby",
      className: "bg-red-500 text-white border-none"
    });
  };

  const draftPicks = [
    {
      category: "MVP",
      selection: "Luka Doncic"
    },
    {
      category: "NBA East Champion",
      selection: "Boston Celtics"
    },
    {
      category: "NBA West Champion",
      selection: "Denver Nuggets"
    },
    {
      category: "Western Conference #1 Seed",
      selection: "Phoenix Suns"
    },
    {
      category: "Eastern Conference #1 Seed",
      selection: "Milwaukee Bucks"
    },
    {
      category: "Points Per Game Leader",
      selection: "Shai Gilgeous-Alexander"
    },
    {
      category: "Regular Season Fewest Wins",
      selection: "Detroit Pistons"
    },
  ];

  const weeklyScores = [
    { week: 1, score: 68, categories: { pts: 8, ast: 7, reb: 6 }, opponent: "Team Alpha" },
    { week: 2, score: 72, categories: { pts: 7, ast: 8, reb: 7 }, opponent: "Team Beta" },
    { week: 3, score: 75, categories: { pts: 8, ast: 8, reb: 7 }, opponent: "Team Gamma" },
    { week: 4, score: 82, categories: { pts: 9, ast: 8, reb: 8 }, opponent: "Team Delta" },
    { week: 5, score: 79, categories: { pts: 8, ast: 7, reb: 8 }, opponent: "Team Epsilon" },
    { week: 6, score: 85, categories: { pts: 9, ast: 9, reb: 8 }, opponent: "Team Zeta" },
    { week: 7, score: 88, categories: { pts: 9, ast: 9, reb: 9 }, opponent: "Team Eta" },
  ];

  const teamStats = [
    { team: "Warriors", score: 85, streak: "W3", rank: 1, categories: { offense: 92, defense: 88 } },
    { team: "Lakers", score: 78, streak: "W1", rank: 2, categories: { offense: 88, defense: 85 } },
    { team: "Suns", score: 75, streak: "L1", rank: 3, categories: { offense: 86, defense: 82 } },
    { team: "Nets", score: 72, streak: "W2", rank: 4, categories: { offense: 84, defense: 80 } },
    { team: "Celtics", score: 70, streak: "L2", rank: 5, categories: { offense: 82, defense: 78 } },
    { team: "Bulls", score: 65, streak: "L3", rank: 6, categories: { offense: 78, defense: 75 } },
  ];

  const maxScore = Math.max(...weeklyScores.map(w => w.score));

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen">
      <Header />
      <Toaster />
      <div className="pt-16">
        <header className="py-10 px-4 md:px-8">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">Post Draft Hub</h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">View draft results and track team performance</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                Season 2025
              </Badge>
              <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                Draft Complete
              </Badge>
            </div>
          </div>
        </header>

        <main className="px-4 md:px-8 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto">
          <div className="space-y-8">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">League Standings</h2>
                <Badge variant="secondary" className="text-gray-600">Rank #2</Badge>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <div className="space-y-3">
                    {teamStats.map((team, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-500 w-8">{team.rank}</span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">{team.team}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className={team.streak.startsWith('W') ? 'text-green-600' : 'text-red-600'}>
                              {team.streak}
                            </Badge>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{team.score}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 dark:bg-blue-600 rounded-full"
                              style={{ width: `${(team.categories.offense / 100) * 100}%` }}
                            />
                          </div>
                          <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 dark:bg-green-600 rounded-full"
                              style={{ width: `${(team.categories.defense / 100) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Offense Rating</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Defense Rating</span>
                    </div>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                  onClick={() => navigate('/')}
                >
                  View Full Statistics
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Weekly Performance</h2>
                <span className="text-sm text-green-600 dark:text-green-400">↑ 12% vs Last Week</span>
              </div>
              <Tabs defaultValue="chart" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chart">Chart View</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                <TabsContent value="chart">
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <div className="h-40 flex items-end justify-between gap-2">
                      {weeklyScores.map((week, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center gap-1">
                          <div 
                            className="w-full bg-blue-500/20 dark:bg-blue-500/30 hover:bg-blue-500/30 dark:hover:bg-blue-500/40 rounded-t transition-colors"
                            style={{ height: `${(week.score / maxScore) * 100}%` }}
                          />
                          <span className="text-xs text-gray-600 dark:text-gray-400">W{week.week}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="details">
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <div className="space-y-3">
                      {weeklyScores.map((week, index) => (
                        <div key={index} className="flex flex-col gap-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              Week {week.week} vs {week.opponent}
                            </span>
                            <span className="text-sm text-gray-600">{week.score} pts</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="flex items-center gap-1">
                              <span className="text-gray-500">PTS:</span>
                              <span className="text-gray-900 dark:text-gray-100">{week.categories.pts}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-gray-500">AST:</span>
                              <span className="text-gray-900 dark:text-gray-100">{week.categories.ast}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-gray-500">REB:</span>
                              <span className="text-gray-900 dark:text-gray-100">{week.categories.reb}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <Button 
                className="w-full mt-4 bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                onClick={() => navigate('/')}
              >
                View Weekly Details
              </Button>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">My Selections</h2>
                <Badge variant="outline" className="text-gray-600">6 Rounds</Badge>
              </div>
              <div className="space-y-4">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {draftPicks.map((pick, index) => (
                    <div key={index} className="py-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-blue-600 dark:text-blue-400">
                          {pick.category}
                        </h3>
                        <p className="text-gray-900 dark:text-gray-100 pl-2">
                          {pick.selection}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Total Categories:</span>
                    <span className="text-gray-900 dark:text-gray-100">{draftPicks.length} Categories</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                  onClick={() => navigate('/')}
                >
                  View All Selections
                </Button>
              </div>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Draft Summary</h2>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Completed</Badge>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Teams</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">6</p>
                    <p className="text-xs text-gray-500 mt-1">Full Roster</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Draft Position</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">#4</p>
                    <p className="text-xs text-gray-500 mt-1">Snake Draft</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Picks</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">36</p>
                    <p className="text-xs text-gray-500 mt-1">6 Teams × 6 Rounds</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">45m</p>
                    <p className="text-xs text-gray-500 mt-1">Avg. 75s per pick</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Draft Categories</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-blue-600">PTS</Badge>
                      <span className="text-gray-600">Points</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-blue-600">AST</Badge>
                      <span className="text-gray-600">Assists</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-blue-600">REB</Badge>
                      <span className="text-gray-600">Rebounds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-blue-600">STL</Badge>
                      <span className="text-gray-600">Steals</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Draft Progress</span>
                    <span className="text-gray-900 dark:text-gray-100">100%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                <Button 
                  className="w-full bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                  onClick={() => navigate('/')}
                >
                  View Complete Recap
                </Button>
              </div>
            </Card>
          </div>

          <div className="space-y-8 md:col-span-2 lg:col-span-3">
            <Card className="p-6 w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Season Scoring Progress</h2>
                <Badge variant="outline" className="text-blue-600">Live Updates</Badge>
              </div>
              <div className="space-y-4">
                <Tabs defaultValue="graph" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="graph">Graph View</TabsTrigger>
                    <TabsTrigger value="table">Detailed Table</TabsTrigger>
                  </TabsList>
                  <TabsContent value="graph" className="h-[500px]">
                    <div className="flex flex-col gap-1 mb-4 items-center text-[15px] text-gray-300">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-[2px] bg-[#f97316]"></div>
                          <span>Jacko Cumulative</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-[2px] bg-[#eab308]"></div>
                          <span>Josh Cumulative</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-[2px] bg-[#22c55e]"></div>
                          <span>Sauce Cumulative</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-[2px] bg-[#ec4899]"></div>
                          <span>Trent Cumulative</span>
                        </div>
                      </div>
                    </div>
                    <canvas id="cumulativeScoreChart"></canvas>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const chart = Chart.getChart("cumulativeScoreChart");
                          if (chart) {
                            chart.data.datasets.forEach(dataset => {
                              dataset.hidden = false;
                            });
                            chart.update();
                          }
                        }}
                      >
                        Show All Teams
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const chart = Chart.getChart("cumulativeScoreChart");
                          if (chart) {
                            chart.data.datasets.forEach((dataset, index) => {
                              dataset.hidden = dataset.label !== 'Josh Cumulative';
                            });
                            chart.update();
                          }
                        }}
                      >
                        Show My Team Only
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="table">
                    <div className="rounded-md border">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                              <th className="py-3 px-4 text-left font-medium">Category</th>
                              <th className="py-3 px-4 text-right font-medium">Prob. (%)</th>
                              <th className="py-3 px-4 text-right font-medium">Points Avail.</th>
                              <th className="py-3 px-4 text-right font-medium">Projected</th>
                              <th className="py-3 px-4 text-right font-medium">Actual</th>
                              <th className="py-3 px-4 text-left font-medium">Notes</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {[
                              {
                                category: "Weekly Performance",
                                probability: 100,
                                pointsAvailable: 100,
                                projected: 100,
                                actual: 85,
                                notes: "Week 1 complete"
                              },
                              {
                                category: "In-Season Tournament Champion",
                                probability: 75,
                                pointsAvailable: 100,
                                projected: 75,
                                actual: 100,
                                notes: "Lakers won the tournament"
                              },
                              {
                                category: "Most Valuable Player",
                                probability: 60,
                                pointsAvailable: 100,
                                projected: 60,
                                actual: null,
                                notes: "Doncic leading MVP race"
                              },
                              {
                                category: "Eastern Conference Champion",
                                probability: 40,
                                pointsAvailable: 100,
                                projected: 40,
                                actual: null,
                                notes: "Celtics current favorites"
                              },
                              // Add more categories here...
                            ].map((row, index) => (
                              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                <td className="py-3 px-4 font-medium">{row.category}</td>
                                <td className="py-3 px-4 text-right">{row.probability}%</td>
                                <td className="py-3 px-4 text-right">{row.pointsAvailable}</td>
                                <td className="py-3 px-4 text-right">{row.projected}</td>
                                <td className="py-3 px-4 text-right">
                                  {row.actual !== null ? row.actual : '-'}
                                </td>
                                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{row.notes}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="bg-gray-50 dark:bg-gray-800 font-medium">
                            <tr>
                              <td className="py-3 px-4">Totals</td>
                              <td className="py-3 px-4 text-right">-</td>
                              <td className="py-3 px-4 text-right">2000</td>
                              <td className="py-3 px-4 text-right">1245</td>
                              <td className="py-3 px-4 text-right">185</td>
                              <td className="py-3 px-4">Current Progress: 185/1245 (14.9%)</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      <p>* Probabilities derived from betting odds and market analysis</p>
                      <p>* Projected points = Probability × Points Available</p>
                      <p>* Total projected points represent expected season-end score</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </div>
          
        </main>
      </div>
    </div>
  )
}

export default PostDraftLanding
