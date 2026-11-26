import React from 'react';
import type { Task, TaskStatus } from '@/types/Task';
import { Column } from '@/components/Column';
import styles from './Board.module.css';

const STATUSES: readonly TaskStatus[] = ['todo', 'in_progress', 'review', 'done'];

interface BoardProps {
  tasks: Task[];
  onDelete: (id: number) => void;
}

export const Board: React.FC<BoardProps> = ({ tasks, onDelete }) => {
  return (
    <div className={styles.board}>
      {STATUSES.map((status) => (
        <Column
          key={status}
          status={status}
          tasks={tasks.filter((task) => task.type === status)}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
