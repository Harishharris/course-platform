'use client';

import { UserButton, useAuth } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

import { Button } from './ui/button';
import SearchInput from './seach-input';
import { isAllowedTeacher } from '@/lib/teacher';

export default function NavbarRoutes() {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacher = pathname?.startsWith('/teacher');
  const isCoursePage = pathname.includes('/courses');
  const isSearchPage = pathname == '/search';

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacher || isCoursePage ? (
          <Link href={'/'}>
            <Button size={'sm'} variant={'ghost'}>
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isAllowedTeacher(userId) ? (
          <Link href={'/teacher/courses'}>
            <Button size={'sm'} variant={'ghost'}>
              Teacher Mode
            </Button>
          </Link>
        ) : null}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
}
