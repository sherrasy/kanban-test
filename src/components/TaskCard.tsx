import React from 'react';
import type { Task } from '@/types/Task';
import { formatDate } from '@/utils/dateUtils';
import { isOverdue } from '@/utils/isOverdue';
import { TrashIcon } from '@/components/icons/TrashIcon';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  const overdue = isOverdue(task);

  return (
    <article className={`${styles.card} ${overdue ? styles.overdue : ''}`}>
      <p className={styles.text}>{task.text}</p>
      <div className={styles.footer}>
        <span className={styles.dates}>
          {formatDate(task.startDay)} – {formatDate(task.endDay)}
        </span>
        <button
          type="button"
          className={styles.deleteButton}
          aria-label={`Удалить задачу: ${task.text}`}
          onClick={() => onDelete(task.id)}
        >
          <TrashIcon />
        </button>
      </div>
    </article>
  );
};
