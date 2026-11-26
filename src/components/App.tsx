import React from 'react';
import { useTasks } from '@/hooks/useTasks';
import { Board } from '@/components/Board';

export const App: React.FC = () => {
  const { tasks, setTasks, isLoading, error } = useTasks();

  if (isLoading) {
    return <p>Загрузка…</p>;
  }

  if (error) {
    return <p role="alert">Ошибка загрузки задач: {error}</p>;
  }

  const handleDelete = (id: number): void => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <main>
      <Board tasks={tasks} onDelete={handleDelete} />
    </main>
  );
};
