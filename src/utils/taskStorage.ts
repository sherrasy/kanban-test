import type { Task, TaskStatus } from '@/types/Task';
import tasksJsonUrl from '@/data/tasks.json';

const STORAGE_KEY = 'kanban-tasks';

const TASK_STATUSES: readonly TaskStatus[] = [
  'todo',
  'in_progress',
  'review',
  'done',
];

const isTask = (value: unknown): value is Task => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const task = value as Record<string, unknown>;
  return (
    typeof task.id === 'number' &&
    typeof task.type === 'string' &&
    (TASK_STATUSES as readonly string[]).includes(task.type) &&
    typeof task.startDay === 'number' &&
    typeof task.endDay === 'number' &&
    typeof task.text === 'string'
  );
};

export const isTaskArray = (value: unknown): value is Task[] =>
  Array.isArray(value) && value.every(isTask);

export const readTasksFromStorage = (): Task[] | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed: unknown = JSON.parse(raw);
    return isTaskArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch {
    return null;
  }
};

export const writeTasksToStorage = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    console.log('Error while writing tasks');
  }
};

export const fetchDefaultTasks = async (): Promise<Task[]> => {
  const response = await fetch(tasksJsonUrl);
  if (!response.ok) {
    throw new Error(`Failed to load tasks.json: ${response.status}`);
  }
  const data: unknown = await response.json();
  if (!isTaskArray(data)) {
    throw new Error('tasks.json has invalid format');
  }
  return data;
};
