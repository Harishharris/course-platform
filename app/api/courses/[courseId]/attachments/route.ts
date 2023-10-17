import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function POST(
  req: Request,
  { params: { courseId } }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { url } = await req.json();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const courseOwner = db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });
    if (!courseOwner) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const attachments = await db.attachment.create({
      data: {
        url,
        name: url.split('/').pop(),
        courseId,
      },
    });
    return NextResponse.json(attachments);
  } catch (err) {
    console.log('[COURSE_ID_ATTACHMENTS]', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
