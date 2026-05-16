// Mock enrolled courses for the student dashboard.
// In a real app this would come from the backend.

export const enrolledCourses: { slug: string; progress: number; lastLesson: number }[] = [
  { slug: "french-macarons", progress: 0.45, lastLesson: 3 },
  { slug: "chocolate-cakes", progress: 0.8, lastLesson: 4 },
  { slug: "artisan-bread", progress: 0.1, lastLesson: 1 },
];
