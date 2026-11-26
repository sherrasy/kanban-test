import React from 'react';
import type { Task, TaskStatus } from '@/types/Task';
import { TaskCard, TASK_DRAG_MIME } from '@/components/board/card/TaskCard';
import { ColumnIcon } from '@/components/icons/ColumnIcon';
import styles from './Column.module.css';

export const COLUMN_TITLES: Record<TaskStatus, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  review: 'Review',
  done: 'Done',
};

interface ColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onDelete: (id: number) => void;
  onSave: (task: Task) => void;
  onAdd: (status: TaskStatus) => void;
  onDropTask: (id: number, status: TaskStatus) => void;
}

export const Column: React.FC<ColumnProps> = ({
  status,
  tasks,
  onDelete,
  onSave,
  onAdd,
  onDropTask,
}) => {
  const sorted = [...tasks].sort((a, b) => a.startDay - b.startDay);

  return (
    <section
      className={styles.column}
      aria-label={COLUMN_TITLES[status]}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      }}
      onDrop={(e) => {
        e.preventDefault();
        const id = Number(e.dataTransfer.getData(TASK_DRAG_MIME));
        if (Number.isInteger(id) && id > 0) {
          onDropTask(id, status);
        }
      }}
    >
      <header className={styles.header}>
        <span className={styles.headerIcon}>
          <ColumnIcon status={status} />
        </span>
        <h2 className={styles.title}>{COLUMN_TITLES[status]}</h2>
        <span className={styles.spacer} />
        <button
          type="button"
          className={styles.addButton}
          onClick={() => onAdd(status)}
        >
          + Добавить
        </button>
      </header>
      <div className={styles.list}>
        {sorted.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} onSave={onSave} />
        ))}
      </div>
    </section>
  );
};
