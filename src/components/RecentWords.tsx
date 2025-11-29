'use client';

import { BookA, Clock } from 'lucide-react';

interface Word {
    id: string;
    word?: string;
    example?: string;
    translation: string;
    addedAt: number;
    userId?: string;
}

interface RecentWordsProps {
    words: Word[];
}

export function RecentWords({ words }: RecentWordsProps) {
    const sortedWords = [...words]
        .sort((a, b) => b.addedAt - a.addedAt)
        .slice(0, 10);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Dictionary Words</h3>
                <BookA className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
                {sortedWords.length > 0 ? (
                    sortedWords.map((word) => (
                        <div key={word.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">{word.word || word.example || 'Unknown Word'}</p>
                                <p className="text-sm text-gray-500">{word.translation}</p>
                            </div>
                            <div className="flex items-center text-xs text-gray-400 gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{new Date(word.addedAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <p>No words added yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
