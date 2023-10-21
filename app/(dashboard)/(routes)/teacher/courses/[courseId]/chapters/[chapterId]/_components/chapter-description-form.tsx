'use client';

const z = require('zod');
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Chapter } from '@prisma/client';
import { cn } from '@/lib/utils';
import Editor from '@/components/editor';
import Preview from '@/components/preview';

interface ChapterDescriptionProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: 'Title is required',
  }),
});

export default function ChapterDescriptionForm({
  initialData,
  courseId,
  chapterId,
}: ChapterDescriptionProps) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((currentState) => !currentState);
  const router = useRouter();

  const form = useForm<Zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData?.description || '',
  });

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: Zod.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success('Chapter updated');
      toggleEdit();
      router.refresh();
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Chapter Description
        <Button onClick={toggleEdit} variant={'ghost'}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            !isEditing && (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit Description
              </>
            )
          )}
        </Button>
      </div>
      {!isEditing ? (
        <div
          className={cn(
            'text-sm mt-2',
            !initialData.description && 'text-slate-500 italic'
          )}
        >
          {!initialData.description && 'No Description'}
          {initialData.description && (
            <Preview value={initialData.description} />
          )}
        </div>
      ) : (
        <Form {...form}>
          <form
            className="space-y-4 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor disabled={!isValid || isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
