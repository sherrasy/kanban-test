import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';
import type { Task } from '@/types/Task';

const tasksFixture: Task[] = [
  { id: 1, type: 'todo', startDay: 1735689600000, endDay: 1736294400000, text: 'Test task' },
];

beforeEach(() => {
  localStorage.clear();
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(tasksFixture),
  }) as unknown as typeof fetch;
});

describe('App', () => {
  it('renders tasks loaded from fallback tasks.json', async () => {
    render(<App />);
    expect(await screen.findByText(/Test task/)).toBeInTheDocument();
  });

  it('prefers valid localStorage data over tasks.json', async () => {
    localStorage.setItem(
      'kanban-tasks',
      JSON.stringify([
        { id: 9, type: 'done', startDay: 1735689600000, endDay: 1736294400000, text: 'Stored task' },
      ]),
    );
    render(<App />);
    expect(await screen.findByText(/Stored task/)).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
