'use client';

import { db } from '@/lib/instant';
import { StatCard } from '@/components/StatCard';
import { UserGrowthChart } from '@/components/UserGrowthChart';
import { RecentActivity } from '@/components/RecentActivity';
import { EngagementChart } from '@/components/EngagementChart';
import { Leaderboard } from '@/components/Leaderboard';
import { CourseCurriculum } from '@/components/CourseCurriculum';
import { RecentWords } from '@/components/RecentWords';
import { Users, GraduationCap, Globe, TrendingUp, BookOpen, Trophy } from 'lucide-react';

export default function Dashboard() {
  const { isLoading, error, data } = db.useQuery({
    users: {},
    courseProgress: {},
    gamification: {},
    dailyLessons: {},
    courses: {},
    lessons: {},
    dictionaryWords: {}
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error: {error.message}
      </div>
    );
  }

  const users = data?.users || [];
  const courseProgress = data?.courseProgress || [];
  const gamification = data?.gamification || [];
  const dailyLessons = data?.dailyLessons || [];

  // Calculate metrics
  const totalUsers = users.length;
  const students = users.filter((u: any) => u.userType === 'student').length;
  const languages = new Set(users.map((u: any) => u.nativeLanguage)).size;

  // Calculate total XP across all users
  const totalXP = gamification.reduce((acc: number, g: any) => acc + (g.totalXP || 0), 0);

  // Calculate lessons completed today
  const today = new Date().toISOString().split('T')[0];
  const lessonsToday = dailyLessons.filter((l: any) => l.date === today && l.isCompleted).length;

  // Process growth data (group by date)
  const sortedUsers = [...users].sort((a: any, b: any) => a.createdAt - b.createdAt);
  const chartDataMap = new Map();

  let runningTotal = 0;
  sortedUsers.forEach((user: any) => {
    runningTotal++;
    const date = new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    chartDataMap.set(date, runningTotal);
  });

  const finalChartData = Array.from(chartDataMap.entries()).map(([date, users]) => ({
    date,
    users
  }));

  // Recent activity
  const recentActivity = [...users]
    .sort((a: any, b: any) => b.createdAt - a.createdAt)
    .slice(0, 5)
    .map((user: any) => ({
      id: user.id,
      name: user.name || 'Anonymous',
      email: user.email,
      type: user.userType,
      date: new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    }));

  // Prepare Leaderboard Data
  const leaderboardData = gamification.map((g: any) => {
    const user = users.find((u: any) => u.id === g.userId);
    return {
      id: g.id,
      name: user?.name || 'Anonymous',
      totalXP: g.totalXP || 0,
      level: g.level || 1,
      streak: g.streak || 0
    };
  });

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Koality Analytics</h1>
        <p className="text-gray-500 mt-2">Real-time overview of your app's performance</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={Users}
          trend="+12%"
        />
        <StatCard
          title="Active Students"
          value={students}
          icon={GraduationCap}
        />
        <StatCard
          title="Lessons Today"
          value={lessonsToday}
          icon={BookOpen}
        />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <UserGrowthChart data={finalChartData} />
          <EngagementChart data={dailyLessons as any} />
        </div>
        <div className="space-y-8">
          <Leaderboard users={leaderboardData as any} />
          <CourseCurriculum courses={data?.courses as any || []} lessons={data?.lessons as any || []} />
          <RecentWords words={data?.dictionaryWords as any || []} />
          <RecentActivity activities={recentActivity} />
        </div>
      </div>
    </div>
  );
}
