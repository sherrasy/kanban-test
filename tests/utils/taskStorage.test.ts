import { readTasksFromStorage } from '@/utils/taskStorage';

const validTask = {
  id: 1,
  type: 'todo',
  startDay: 1735689600000,
  endDay: 1736294400000,
  text: 'task',
};

describe('readTasksFromStorage', () => {
  beforeEach(() => localStorage.clear());

  it('returns null when storage is empty', () => {
    expect(readTasksFromStorage()).toBeNull();
  });

  it('returns null when storage holds an empty array', () => {
    localStorage.setItem('kanban-tasks', '[]');
    expect(readTasksFromStorage()).toBeNull();
  });

  it('returns null when storage holds invalid JSON', () => {
    localStorage.setItem('kanban-tasks', '{broken');
    expect(readTasksFromStorage()).toBeNull();
  });

  it('returns null when tasks have invalid shape', () => {
    localStorage.setItem('kanban-tasks', JSON.stringify([{ id: 'x' }]));
    expect(readTasksFromStorage()).toBeNull();
  });

  it('returns tasks for valid stored data', () => {
    localStorage.setItem('kanban-tasks', JSON.stringify([validTask]));
    expect(readTasksFromStorage()).toEqual([validTask]);
  });
});
