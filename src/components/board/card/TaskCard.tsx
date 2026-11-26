import React, { useState } from 'react';
import type { Task } from '@/types/Task';
import { formatDate, parseInputDate, toInputDate } from '@/utils/dateUtils';
import { isOverdue } from '@/utils/isOverdue';
import { EditIcon } from '@/components/icons/EditIcon';
import { TrashIcon } from '@/components/icons/TrashIcon';
import { CheckIcon } from '@/components/icons/CheckIcon';
import { CrossIcon } from '@/components/icons/CrossIcon';
import styles from './TaskCard.module.css';

export const TASK_DRAG_MIME = 'application/x-kanban-task';

interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onSave: (updated: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);
  const [startDay, setStartDay] = useState(toInputDate(task.startDay));
  const [endDay, setEndDay] = useState(toInputDate(task.endDay));

  const overdue = isOverdue(task);

  const startEdit = (): void => {
    setText(task.text);
    setStartDay(toInputDate(task.startDay));
    setEndDay(toInputDate(task.endDay));
    setIsEditing(true);
  };

  const cancelEdit = (): void => {
    setIsEditing(false);
  };

  const saveEdit = (e: React.FormEvent): void => {
    e.preventDefault();
    const start = parseInputDate(startDay);
    const end = parseInputDate(endDay);
    if (!text.trim() || start === null || end === null) {
      return;
    }
    onSave({ ...task, text: text.trim(), startDay: start, endDay: end });
    setIsEditing(false);
  };

  return (
    <article
      className={`${styles.card} ${overdue ? styles.overdue : ''} ${isEditing ? styles.editing : ''}`}
      draggable={!isEditing}
      onDragStart={(e) => {
        e.dataTransfer.setData(TASK_DRAG_MIME, String(task.id));
        e.dataTransfer.effectAllowed = 'move';
      }}
    >
      {isEditing ? (
        <form className={styles.form} onSubmit={saveEdit}>
          <label className={styles.field}>
            <span className={styles.label}>Начало:</span>
            <input
              type="date"
              className={styles.fieldInput}
              value={startDay}
              onChange={(e) => setStartDay(e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Окончание:</span>
            <input
              type="date"
              className={styles.fieldInput}
              value={endDay}
              onChange={(e) => setEndDay(e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Описание:</span>
            <input
              type="text"
              className={styles.fieldInput}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
          <div className={styles.editActions}>
            <button
              type="button"
              className={`${styles.roundButton} ${styles.cancelButton}`}
              aria-label="Отменить"
              onClick={cancelEdit}
            >
              <CrossIcon />
            </button>
            <button
              type="submit"
              className={`${styles.roundButton} ${styles.submitButton}`}
              aria-label="Применить"
            >
              <CheckIcon />
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.iconButton} ${styles.editButton}`}
              aria-label={`Редактировать задачу: ${task.text}`}
              onClick={startEdit}
            >
              <EditIcon />
            </button>
            <button
              type="button"
              className={`${styles.iconButton} ${styles.deleteButton}`}
              aria-label={`Удалить задачу: ${task.text}`}
              onClick={() => onDelete(task.id)}
            >
              <TrashIcon />
            </button>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Начало:</span>
            <span className={styles.value}>{formatDate(task.startDay)}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Окончание:</span>
            <span className={`${styles.value} ${overdue ? styles.overdueDate : ''}`}>
              {formatDate(task.endDay)}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Описание:</span>
            <span className={styles.value}>{task.text}</span>
          </div>
        </>
      )}
    </article>
  );
};
