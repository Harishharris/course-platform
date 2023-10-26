import { db } from '@/lib/db';
import { Category, Chapter, Course } from '@prisma/client';
import getUserProgress from './get-progress';

type CourseWithProgressWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

type DahsboardCourses = {
  completedCourses: any[];
  coursesInProgress: any[];
};
export const getDashboardCourses = async (
  userId: string
): Promise<DahsboardCourses> => {
  try {
    const purchasedCourses = await db.purchase.findMany({
      where: {
        userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });
    const courses = purchasedCourses.map(
      (item) => item.course
    ) as CourseWithProgressWithCategory[];

    for (let course of courses) {
      const progress = await getUserProgress(userId, course.id);
      course['progress'] = progress;
    }

    const completedCourses = courses.filter(
      (course) => course.progress === 100
    );
    const coursesInProgress = courses.filter(
      (course) => (course.progress ?? 0) < 100
    );
    return { completedCourses, coursesInProgress };
  } catch (err) {
    console.log('[GET_COURSES_COURSES]', err);
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};
