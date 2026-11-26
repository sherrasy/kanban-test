import { filterTasks } from '@/utils/filterTasks';
import type { Task } from '@/types/Task';

const makeTask = (id: number, text: string, startDay: number, endDay: number): Task => ({
  id,
  type: 'todo',
  startDay,
  endDay,
  text,
});

const TASKS: Task[] = [
  makeTask(1, 'Сверстать Карточку', new Date(2025, 0, 5).getTime(), new Date(2025, 0, 8).getTime()),
  makeTask(2, 'Настроить поиск', new Date(2025, 0, 8, 14, 30).getTime(), new Date(2025, 0, 12).getTime()),
  makeTask(3, 'Deploy', new Date(2025, 1, 1).getTime(), new Date(2025, 1, 2).getTime()),
];

describe('filterTasks', () => {
  it('returns all tasks for empty query', () => {
    expect(filterTasks(TASKS, '')).toHaveLength(3);
    expect(filterTasks(TASKS, '   ')).toHaveLength(3);
  });

  it('matches text substring case-insensitively', () => {
    const result = filterTasks(TASKS, 'кАрТоЧк');
    expect(result.map((t) => t.id)).toEqual([1]);
  });

  it('matches by startDay calendar date', () => {
    const result = filterTasks(TASKS, '05.01.2025');
    expect(result.map((t) => t.id)).toEqual([1]);
  });

  it('matches by endDay calendar date', () => {
    const result = filterTasks(TASKS, '12.01.2025');
    expect(result.map((t) => t.id)).toEqual([2]);
  });

  it('matches calendar date regardless of time of day', () => {
    const result = filterTasks(TASKS, '08.01.2025');
    expect(result.map((t) => t.id)).toEqual([1, 2]);
  });

  it('returns empty array when nothing matches', () => {
    expect(filterTasks(TASKS, 'несуществующее')).toEqual([]);
    expect(filterTasks(TASKS, '01.01.1999')).toEqual([]);
  });
});
