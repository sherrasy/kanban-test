import type { Task } from '@/types/Task';
import { parseDate } from '@/utils/dateUtils';

const isSameLocalDay = (timestampMs: number, dayStartMs: number): boolean => {
  const a = new Date(timestampMs);
  const b = new Date(dayStartMs);
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

export const filterTasks = (tasks: Task[], query: string): Task[] => {
  const trimmed = query.trim();
  if (!trimmed) {
    return tasks;
  }

  const dayStart = parseDate(trimmed);
  if (dayStart !== null) {
    return tasks.filter(
      (task) =>
        isSameLocalDay(task.startDay, dayStart) ||
        isSameLocalDay(task.endDay, dayStart),
    );
  }

  const lower = trimmed.toLowerCase();
  return tasks.filter((task) => task.text.toLowerCase().includes(lower));
};
