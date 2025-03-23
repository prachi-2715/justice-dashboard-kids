
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import EmptyState from '@/components/EmptyState';
import ProgressCard from '@/components/ProgressCard';
import TestResults from '@/components/TestResults';
import TimeframeSelector, { TimeframeOption } from '@/components/TimeframeSelector';
import Header from '@/components/Header';
import { BarChart, PieChart, LineChart, BookOpen, Award, BarChart3, Clock, Trophy } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { TestResult } from '@/components/TestHistoryCard';

// Mock data for demonstration purposes
const mockTests: TestResult[] = [
  {
    id: '1',
    title: 'Rights to Education',
    date: new Date('2023-12-15'),
    score: 8,
    questionsCount: 10,
    category: 'Basic Rights',
    time: 185, // 3:05
  },
  {
    id: '2',
    title: 'Freedom of Expression',
    date: new Date('2023-12-20'),
    score: 10,
    questionsCount: 10,
    category: 'Civil Rights',
    time: 210, // 3:30
  },
  {
    id: '3',
    title: 'Right to Play',
    date: new Date('2023-12-28'),
    score: 9,
    questionsCount: 10,
    category: 'Social Rights',
    time: 165, // 2:45
  },
];

const Index = () => {
  const [timeframe, setTimeframe] = useState<TimeframeOption>('weekly');
  const [hasTests, setHasTests] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  
  // Show mock test results when the user clicks to take their first test
  const handleStartTest = () => {
    // Set test results to the mock data
    setTestResults(mockTests);
    
    // Notify the user
    toast('Test completed!', {
      description: 'Your results are now available in the dashboard.',
    });
    
    // Update state to show progress
    setHasTests(true);
  };

  // Calculate total progress stats
  const totalQuestions = testResults.reduce((sum, test) => sum + test.questionsCount, 0);
  const totalCorrect = testResults.reduce((sum, test) => sum + test.score, 0);
  const totalPercentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  // Check if the category has any tests
  const hasCategoryTests = (category: string) => {
    return testResults.some(test => test.category === category);
  };

  // Calculate category progress
  const getCategoryProgress = (category: string) => {
    const categoryTests = testResults.filter(test => test.category === category);
    if (categoryTests.length === 0) return 0;
    
    const totalCategoryQuestions = categoryTests.reduce((sum, test) => sum + test.questionsCount, 0);
    const totalCategoryCorrect = categoryTests.reduce((sum, test) => sum + test.score, 0);
    return Math.round((totalCategoryCorrect / totalCategoryQuestions) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto py-6 px-4 animate-fade-in">
        <div className="flex flex-col gap-6">
          {/* Top section with title and timeframe selector */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Track your progress in learning about rights.</p>
            </div>
            
            {hasTests && (
              <TimeframeSelector
                selected={timeframe}
                onChange={setTimeframe}
              />
            )}
          </div>

          {/* Dashboard content */}
          {!hasTests ? (
            <EmptyState onStartTest={handleStartTest} />
          ) : (
            <>
              {/* Progress Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <ProgressCard
                  title="Overall Score"
                  score={totalCorrect}
                  maxScore={totalQuestions}
                  change={5}
                  infoText="Your combined score across all tests"
                />
                <ProgressCard
                  title="Basic Rights"
                  score={hasCategoryTests('Basic Rights') ? 8 : 0}
                  maxScore={hasCategoryTests('Basic Rights') ? 10 : 0}
                  change={hasCategoryTests('Basic Rights') ? -2 : 0}
                  infoText="Progress in understanding foundational rights"
                />
                <ProgressCard
                  title="Civil Rights"
                  score={hasCategoryTests('Civil Rights') ? 10 : 0}
                  maxScore={hasCategoryTests('Civil Rights') ? 10 : 0}
                  change={hasCategoryTests('Civil Rights') ? 10 : 0}
                  infoText="Progress in understanding freedom of expression"
                />
                <ProgressCard
                  title="Social Rights"
                  score={hasCategoryTests('Social Rights') ? 9 : 0}
                  maxScore={hasCategoryTests('Social Rights') ? 10 : 0}
                  change={hasCategoryTests('Social Rights') ? 3 : 0}
                  infoText="Progress in understanding right to play and leisure"
                />
              </div>

              {/* Tabs section */}
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid grid-cols-3 sm:w-[400px]">
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    <span className="hidden sm:inline">Overview</span>
                  </TabsTrigger>
                  <TabsTrigger value="achievements" className="flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    <span className="hidden sm:inline">Achievements</span>
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="hidden sm:inline">History</span>
                  </TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Stats Card */}
                    <Card className="col-span-1 lg:col-span-2 animate-scale-in">
                      <CardHeader>
                        <CardTitle>Progress Summary</CardTitle>
                        <CardDescription>
                          Your learning journey in {timeframe} view
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-accent">
                            <BookOpen className="h-6 w-6 text-primary mb-2" />
                            <div className="text-2xl font-bold">{testResults.length}</div>
                            <p className="text-sm text-muted-foreground">Tests Taken</p>
                          </div>
                          
                          <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-accent">
                            <Award className="h-6 w-6 text-justice-purple mb-2" />
                            <div className="text-2xl font-bold">{totalPercentage}%</div>
                            <p className="text-sm text-muted-foreground">Average Score</p>
                          </div>
                          
                          <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-accent">
                            <Trophy className="h-6 w-6 text-justice-green mb-2" />
                            <div className="text-2xl font-bold">
                              {testResults.filter(t => t.score === t.questionsCount).length}
                            </div>
                            <p className="text-sm text-muted-foreground">Perfect Scores</p>
                          </div>
                        </div>
                        
                        <div className="h-[200px] mt-8 progress-background rounded-lg p-6 flex items-center justify-center">
                          <div className="text-center text-muted-foreground">
                            <BarChart className="h-8 w-8 mx-auto mb-2 text-justice-blue" />
                            <p className="text-sm">Detailed progress charts coming soon</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Recent Activity */}
                    <Card className="animate-slide-up">
                      <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                          Your latest test results
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <TestResults 
                          results={testResults.slice(0, 2)} 
                          maxHeight="200px"
                        />
                        <Button 
                          variant="outline" 
                          className="w-full mt-4"
                          onClick={() => document.querySelector('[value="history"]')?.dispatchEvent(
                            new MouseEvent('click', { bubbles: true })
                          )}
                        >
                          View All History
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card className="animate-slide-up">
                    <CardHeader>
                      <CardTitle>Rights Categories</CardTitle>
                      <CardDescription>
                        Your progress across different types of rights
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { category: 'Basic Rights', description: 'Foundational rights that every child has', icon: <BookOpen className="h-5 w-5" /> },
                          { category: 'Civil Rights', description: 'Rights related to freedom and expression', icon: <Award className="h-5 w-5" /> },
                          { category: 'Social Rights', description: 'Rights related to social welfare and development', icon: <Trophy className="h-5 w-5" /> },
                          { category: 'Protection Rights', description: 'Rights protecting children from harm', icon: <PieChart className="h-5 w-5" /> },
                        ].map((category, index) => {
                          const progress = getCategoryProgress(category.category);
                          return (
                            <div key={index} className="rounded-lg border p-4 transition-smooth hover:border-primary/20">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-primary">
                                  {category.icon}
                                </div>
                                <h3 className="font-medium">{category.category}</h3>
                              </div>
                              <p className="text-xs text-muted-foreground mb-3">{category.description}</p>
                              
                              {progress > 0 ? (
                                <>
                                  <div className="w-full bg-secondary rounded-full h-2 mb-1">
                                    <div 
                                      className="bg-primary h-full rounded-full animate-progress-fill" 
                                      style={{ width: `${progress}%` }}
                                    />
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Progress</span>
                                    <span className="font-medium">{progress}%</span>
                                  </div>
                                </>
                              ) : (
                                <div className="flex items-center justify-center h-10 text-sm text-muted-foreground">
                                  Not started yet
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Achievements Tab */}
                <TabsContent value="achievements" className="space-y-4">
                  <Card className="animate-scale-in">
                    <CardHeader>
                      <CardTitle>Your Achievements</CardTitle>
                      <CardDescription>
                        Badges and awards you've earned
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          { title: 'Perfect Score', description: 'Achieved 100% on a test', unlocked: testResults.some(t => t.score === t.questionsCount), icon: <Trophy className="h-6 w-6 text-justice-green" /> },
                          { title: 'Quick Learner', description: 'Completed 3 tests', unlocked: testResults.length >= 3, icon: <Clock className="h-6 w-6 text-justice-blue" /> },
                          { title: 'Rights Expert', description: 'Mastered all categories', unlocked: false, icon: <Award className="h-6 w-6 text-justice-purple" /> },
                        ].map((achievement, index) => (
                          <div 
                            key={index} 
                            className={`rounded-lg border p-4 flex flex-col items-center text-center ${
                              achievement.unlocked 
                                ? 'animate-scale-in' 
                                : 'opacity-50 grayscale'
                            }`}
                          >
                            <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center mb-3">
                              {achievement.icon}
                            </div>
                            <h3 className="font-medium mb-1">{achievement.title}</h3>
                            <p className="text-xs text-muted-foreground">{achievement.description}</p>
                            
                            <span className={`mt-2 text-xs font-medium px-2 py-0.5 rounded-full ${
                              achievement.unlocked 
                                ? 'bg-justice-green/10 text-justice-green' 
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {achievement.unlocked ? 'Unlocked' : 'Locked'}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-center mt-8">
                        <Button variant="outline">
                          View All Achievements
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* History Tab */}
                <TabsContent value="history" className="space-y-4">
                  <Card className="animate-scale-in">
                    <CardHeader>
                      <CardTitle>Test History</CardTitle>
                      <CardDescription>
                        All tests you've completed
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TestResults 
                        results={testResults} 
                        maxHeight="500px" 
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
