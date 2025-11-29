import { User } from 'lucide-react';

interface ActivityItem {
    id: string;
    name: string;
    email: string;
    date: string;
    type: string;
}

interface RecentActivityProps {
    activities: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Recent Signups</h3>
            <div className="space-y-6">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                <User className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{activity.name}</p>
                                <p className="text-sm text-gray-500">{activity.email}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 capitalize">{activity.type}</p>
                            <p className="text-xs text-gray-500">{activity.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
