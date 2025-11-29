import { Trophy, Medal } from 'lucide-react';

interface LeaderboardUser {
    id: string;
    name: string;
    xp: number;
    level: number;
    streak: number;
}

interface LeaderboardProps {
    users: LeaderboardUser[];
}

export function Leaderboard({ users }: LeaderboardProps) {
    const sortedUsers = [...users].sort((a, b) => b.xp - a.xp).slice(0, 5);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Top Learners</h3>
                <Trophy className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="space-y-4">
                {sortedUsers.map((user, index) => (
                    <div key={user.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex items-center gap-4">
                            <div className={`
                w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
                                    index === 1 ? 'bg-gray-100 text-gray-700' :
                                        index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-blue-50 text-blue-700'}
              `}>
                                {index + 1}
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{user.name}</p>
                                <p className="text-xs text-gray-500">Level {user.level} • {user.streak} day streak</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-gray-900">{user.xp.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">XP</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
