import { Category, Course } from '@prisma/client';
import getUserProgress from './get-progress';
import { db } from '@/lib/db';

type CoursWithProgrssWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId: string;
};

export default async function getCourses({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CoursWithProgrssWithCategory[]> {
  try {
    const courses = await db.course.findMany({
      where: {
        published: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const coursesWithProgress: CoursWithProgrssWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          if (course.purchases.length === 0) {
            return {
              ...course,
              progress: null,
            };
          }
          const progressPercentage = await getUserProgress(userId, course.id);
          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );
    return coursesWithProgress;
  } catch (err) {
    console.log('[GET_COURSES]', err);
    return [];
  }
}
