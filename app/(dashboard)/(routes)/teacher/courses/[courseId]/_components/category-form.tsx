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
import { Course } from '@prisma/client';
import { cn } from '@/lib/utils';
import ComboboxDemo from '@/components/ui/combobox';

interface CategoryProps {
  initialData: Course;
  courseId: string;
  options: { label: string; value: string }[];
}

const formSchema = z.object({
  categoryId: z.string().min(1),
});

export default function CategoryForm({
  initialData,
  courseId,
  options,
}: CategoryProps) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((currentState) => !currentState);
  const router = useRouter();

  const form = useForm<Zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categroyId: initialData.categoryId || '',
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: Zod.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success('Course updated');
      toggleEdit();
      router.refresh();
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  const selectedOption = options.find(
    (option) => option.value === initialData.categoryId
  );

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 ">
      <div className="font-medium flex items-center justify-between">
        Course Category
        <Button onClick={toggleEdit} variant={'ghost'}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            !isEditing && (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit Category
              </>
            )
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p
          className={cn(
            'text-sm mt-2',
            !initialData.categoryId && 'text-slate-500 italic'
          )}
        >
          {selectedOption?.label || 'No Category'}
        </p>
      ) : (
        <Form {...form}>
          <form
            className="space-y-4 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ComboboxDemo options={...options} {...field} />
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
