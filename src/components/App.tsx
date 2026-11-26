import React, { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { filterTasks } from '@/utils/filterTasks';
import { Board } from '@/components/Board';
import { SearchBar } from '@/components/SearchBar';

export const App: React.FC = () => {
  const { tasks, setTasks, isLoading, error } = useTasks();
  const [query, setQuery] = useState('');

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
      <SearchBar value={query} onChange={setQuery} />
      <Board tasks={filterTasks(tasks, query)} onDelete={handleDelete} />
    </main>
  );
};
