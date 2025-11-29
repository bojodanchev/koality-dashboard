'use client';

import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import { useState } from 'react';

interface Lesson {
    id: string;
    title: string;
    order: number;
    courseId: string;
}

interface Course {
    id: string;
    title: string;
    level: string;
}

interface CourseCurriculumProps {
    courses: Course[];
    lessons: Lesson[];
}

export function CourseCurriculum({ courses, lessons }: CourseCurriculumProps) {
    const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

    const toggleCourse = (courseId: string) => {
        setExpandedCourseId(expandedCourseId === courseId ? null : courseId);
    };

    // Group lessons by course
    const lessonsByCourse = lessons.reduce((acc: any, lesson) => {
        if (!acc[lesson.courseId]) {
            acc[lesson.courseId] = [];
        }
        acc[lesson.courseId].push(lesson);
        return acc;
    }, {});

    // Sort courses by title or level if needed (optional)
    const sortedCourses = [...courses].sort((a, b) => a.title.localeCompare(b.title));

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Course Curriculum</h3>
            <div className="space-y-4">
                {sortedCourses.map((course) => {
                    const courseLessons = (lessonsByCourse[course.id] || []).sort((a: Lesson, b: Lesson) => a.order - b.order);
                    const isExpanded = expandedCourseId === course.id;

                    return (
                        <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => toggleCourse(course.id)}
                                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <BookOpen className="w-5 h-5 text-blue-600" />
                                    <div>
                                        <p className="font-medium text-gray-900">{course.title}</p>
                                        <p className="text-xs text-gray-500">{courseLessons.length} lessons • {course.level}</p>
                                    </div>
                                </div>
                                {isExpanded ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
                            </button>

                            {isExpanded && (
                                <div className="bg-white divide-y divide-gray-100">
                                    {courseLessons.length > 0 ? (
                                        courseLessons.map((lesson: Lesson) => (
                                            <div key={lesson.id} className="p-3 pl-12 text-sm text-gray-700 hover:bg-gray-50">
                                                {lesson.order}. {lesson.title}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-4 pl-12 text-sm text-gray-500 italic">No lessons available yet.</div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
