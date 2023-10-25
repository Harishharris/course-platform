import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { Cousine } from 'next/font/google';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params: { courseId } }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!course) {
      return new NextResponse('Not Found', { status: 500 });
    }

    const unPublishedCourse = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        published: false,
      },
    });
    return NextResponse.json(unPublishedCourse);
  } catch (err) {
    console.log('[COURSE_ID_UNPUBLISH]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
