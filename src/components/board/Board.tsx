import React from 'react';
import type { Task, TaskStatus } from '@/types/Task';
import { Column } from '@/components/board/column/Column';
import styles from './Board.module.css';

const STATUSES: readonly TaskStatus[] = ['todo', 'in_progress', 'review', 'done'];

interface BoardProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onSave: (task: Task) => void;
  onAdd: (status: TaskStatus) => void;
  onDropTask: (id: number, status: TaskStatus) => void;
}

export const Board: React.FC<BoardProps> = ({ tasks, onDelete, onSave, onAdd, onDropTask }) => {
  return (
    <div className={styles.board}>
      {STATUSES.map((status) => (
        <Column
          key={status}
          status={status}
          tasks={tasks.filter((task) => task.type === status)}
          onDelete={onDelete}
          onSave={onSave}
          onAdd={onAdd}
          onDropTask={onDropTask}
        />
      ))}
    </div>
  );
};
