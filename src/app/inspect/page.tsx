'use client';

import { db } from '@/lib/instant';

export default function Home() {
    const { isLoading, error, data } = db.useQuery({
        courseProgress: {},
        gamification: {},
        dailyLessons: {},
        lessonProgress: {},
        courses: {},
        lessons: {},
        dictionary: {},
        words: {},
        vocabulary: {},
        userWords: {}
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="p-4 space-y-8">
            <h1 className="text-2xl font-bold">Data Inspection</h1>

            <section>
                <h2 className="text-xl font-semibold">Course Progress</h2>
                <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
                    {JSON.stringify(data?.courseProgress, null, 2)}
                </pre>
            </section>

            <section>
                <h2 className="text-xl font-semibold">Gamification</h2>
                <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
                    {JSON.stringify(data?.gamification, null, 2)}
                </pre>
            </section>

            <section>
                <h2 className="text-xl font-semibold">Daily Lessons</h2>
                <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
                    {JSON.stringify(data?.dailyLessons, null, 2)}
                </pre>
            </section>

            <section>
                <h2 className="text-xl font-semibold">Lesson Progress</h2>
                <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
                    {JSON.stringify(data?.lessonProgress, null, 2)}
                </pre>
            </section>
            <section>
                <h2 className="text-xl font-semibold">Courses</h2>
                <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
                    {JSON.stringify(data?.courses, null, 2)}
                </pre>
            </section>
            <section>
                <h2 className="text-xl font-semibold">Lessons</h2>
                <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
                    {JSON.stringify(data?.lessons, null, 2)}
                </pre>
            </section>
            <section>
                <h2 className="text-xl font-semibold">Dictionary / Words</h2>
                <div className="grid grid-cols-2 gap-4">
                    <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
                        Dictionary: {JSON.stringify(data?.dictionary, null, 2)}
                    </pre>
                    <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
                        Words: {JSON.stringify(data?.words, null, 2)}
                    </pre>
                    <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
                        Vocabulary: {JSON.stringify(data?.vocabulary, null, 2)}
                    </pre>
                    <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
                        UserWords: {JSON.stringify(data?.userWords, null, 2)}
                    </pre>
                </div>
            </section>
        </div>
    );
}
