'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DailyLesson {
    date: string;
    isCompleted: boolean;
}

interface EngagementChartProps {
    data: DailyLesson[];
}

export function EngagementChart({ data }: EngagementChartProps) {
    // Group by date and count completed lessons
    const groupedData = data.reduce((acc: any, lesson) => {
        if (lesson.isCompleted) {
            acc[lesson.date] = (acc[lesson.date] || 0) + 1;
        }
        return acc;
    }, {});

    // Sort by date and take last 7 days (or available range)
    const chartData = Object.entries(groupedData)
        .sort((a: any, b: any) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
        .map(([date, count]) => ({
            date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
            lessons: count
        }));

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Weekly Engagement</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            allowDecimals={false}
                        />
                        <Tooltip
                            cursor={{ fill: '#f9fafb' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar
                            dataKey="lessons"
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                            barSize={40}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
