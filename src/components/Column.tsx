import React from 'react';
import type { Task, TaskStatus } from '@/types/Task';
import { TaskCard } from '@/components/TaskCard';
import styles from './Column.module.css';

export const COLUMN_TITLES: Record<TaskStatus, string> = {
  todo: 'To do',
  in_progress: 'In progress',
  review: 'Review',
  done: 'Done',
};

interface ColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onDelete: (id: number) => void;
}

export const Column: React.FC<ColumnProps> = ({ status, tasks, onDelete }) => {
  const sorted = [...tasks].sort((a, b) => a.startDay - b.startDay);

  return (
    <section className={styles.column} aria-label={COLUMN_TITLES[status]}>
      <header className={styles.header}>
        <h2 className={styles.title}>{COLUMN_TITLES[status]}</h2>
        <span className={styles.count}>{sorted.length}</span>
      </header>
      <div className={styles.list}>
        {sorted.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} />
        ))}
      </div>
    </section>
  );
};
