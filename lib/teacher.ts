export const isAllowedTeacher = (userId: string | undefined | null) => {
  return userId === process.env.NEXT_PUBLIC_TEACHER_ID;
};
