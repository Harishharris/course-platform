'use client';

import ConfirmModal from '@/components/modals/confirm-modal';
import { Button } from '@/components/ui/button';
import { useConfettiStore } from '@/hooks/use-confetti-store';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ActionsProps {
  courseId: string;
  isPublished: boolean;
  disable: boolean;
}

export default function Actions({
  courseId,
  isPublished,
  disable,
}: ActionsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const confetti = useConfettiStore();

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success('Course deleted');
      router.refresh();
      router.push(`/teacher/courses`);
    } catch (err) {
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        const res = await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success('Course Unublished');
        router.refresh();
      } else {
        const res = await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success('Course Published');
        confetti.onOpen();
      }
    } catch (err) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disable || isLoading}
        variant={'outline'}
        size={'sm'}
      >
        {isPublished ? 'Unpublish' : 'Publish'}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size={'sm'}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
}
