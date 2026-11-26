import React from 'react';
import { useTasks } from '@/hooks/useTasks';
import { formatDate } from '@/utils/dateUtils';

export const App: React.FC = () => {
  const { tasks, isLoading, error } = useTasks();

  if (isLoading) {
    return <p>Загрузка…</p>;
  }

  if (error) {
    return <p role="alert">Ошибка загрузки задач: {error}</p>;
  }

  return (
    <main>
      <h1>Kanban Board</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            [{task.type}] {task.text} — {formatDate(task.startDay)} – {formatDate(task.endDay)}
          </li>
        ))}
      </ul>
    </main>
  );
};
