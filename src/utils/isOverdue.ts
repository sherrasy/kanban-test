import type { Task } from '@/types/Task';

export const isOverdue = (task: Task, now: number = Date.now()): boolean => {
  if (task.type === 'done') {
    return false;
  }
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  return task.endDay < today.getTime();
};
