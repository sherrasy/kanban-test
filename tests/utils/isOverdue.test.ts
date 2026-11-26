import { isOverdue } from '@/utils/isOverdue';
import type { Task } from '@/types/Task';

const NOW = new Date(2025, 0, 10, 15, 30).getTime();
const TODAY_START = new Date(2025, 0, 10).getTime();
const YESTERDAY = new Date(2025, 0, 9).getTime();
const TOMORROW = new Date(2025, 0, 11).getTime();

const makeTask = (overrides: Partial<Task>): Task => ({
  id: 1,
  type: 'todo',
  startDay: YESTERDAY,
  endDay: TOMORROW,
  text: 'task',
  ...overrides,
});

describe('isOverdue', () => {
  it('returns true when endDay is before start of today and status is not done', () => {
    expect(isOverdue(makeTask({ endDay: YESTERDAY }), NOW)).toBe(true);
  });

  it('returns false when endDay is today (even at 00:00)', () => {
    expect(isOverdue(makeTask({ endDay: TODAY_START }), NOW)).toBe(false);
  });

  it('returns false when endDay is in the future', () => {
    expect(isOverdue(makeTask({ endDay: TOMORROW }), NOW)).toBe(false);
  });

  it('returns false for done tasks even with past endDay', () => {
    expect(isOverdue(makeTask({ type: 'done', endDay: YESTERDAY }), NOW)).toBe(
      false,
    );
  });
});
