import React, { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { filterTasks } from '@/utils/filterTasks';
import { Board } from '@/components/board/Board';
import { SearchBar } from '@/components/search/SearchBar';
import type { Task, TaskStatus } from '@/types/Task';
import styles from './App.module.css';

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

  const handleSave = (updated: Task): void => {
    setTasks((prev) => prev.map((task) => (task.id === updated.id ? updated : task)));
  };

  const handleAdd = (status: TaskStatus): void => {
    setTasks((prev) => {
      const dayStart = new Date();
      dayStart.setHours(0, 0, 0, 0);
      const timestamp = dayStart.getTime();
      const nextId = prev.reduce((max, task) => Math.max(max, task.id), 0) + 1;
      return [
        ...prev,
        { id: nextId, type: status, startDay: timestamp, endDay: timestamp, text: 'Новая задача' },
      ];
    });
  };

  const handleDropTask = (id: number, status: TaskStatus): void => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, type: status } : task)),
    );
  };

  return (
    <main>
      <header className={styles.header}>
        <h1 className={styles.title}>Your tasks</h1>
        <SearchBar value={query} onChange={setQuery} />
      </header>
      <Board
        tasks={filterTasks(tasks, query)}
        onDelete={handleDelete}
        onSave={handleSave}
        onAdd={handleAdd}
        onDropTask={handleDropTask}
      />
    </main>
  );
};
