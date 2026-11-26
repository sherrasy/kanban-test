import { useEffect, useRef, useState } from 'react';
import type { Task } from '@/types/Task';
import {
  fetchDefaultTasks,
  readTasksFromStorage,
  writeTasksToStorage,
} from '@/utils/taskStorage';

interface UseTasksResult {
  tasks: Task[];
  setTasks: (updater: Task[] | ((prev: Task[]) => Task[])) => void;
  isLoading: boolean;
  error: string | null;
}

export const useTasks = (): UseTasksResult => {
  const [tasks, setTasksState] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const load = async (): Promise<void> => {
      const stored = readTasksFromStorage();

      if (stored !== null) {
        if (!cancelled) setTasksState(stored);
      } else {
        try {
          const defaults = await fetchDefaultTasks();
          if (!cancelled) setTasksState(defaults);
        } catch (e) {
          if (!cancelled) {
            setError(e instanceof Error ? e.message : 'Failed to load tasks');
          }
        }
      }

      if (!cancelled) {
        hydrated.current = true;
        setIsLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    writeTasksToStorage(tasks);
  }, [tasks]);

  return { tasks, setTasks: setTasksState, isLoading, error };
};
