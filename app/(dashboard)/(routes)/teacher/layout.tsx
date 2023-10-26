import { isAllowedTeacher } from '@/lib/teacher';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  if (!isAllowedTeacher(userId)) {
    return redirect('/');
  }
}
