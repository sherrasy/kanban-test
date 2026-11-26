import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '@/components/app/App';
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

  it('opens inline edit on edit click and saves changes to state and localStorage', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(await screen.findByRole('button', { name: 'Редактировать задачу: Test task' }));

    const descriptionInput = screen.getByRole('textbox');
    await user.clear(descriptionInput);
    await user.type(descriptionInput, 'Updated task');
    await user.click(screen.getByRole('button', { name: 'Применить' }));

    expect(screen.getByText(/Updated task/)).toBeInTheDocument();

    const stored = JSON.parse(localStorage.getItem('kanban-tasks') ?? '[]') as Task[];
    expect(stored.find((t) => t.id === 1)?.text).toBe('Updated task');
  });

  it('moves task between columns via drag and drop', async () => {
    render(<App />);
    const card = await screen.findByText(/Test task/);
    const dataTransfer = {
      setData: jest.fn(),
      getData: jest.fn().mockReturnValue('1'),
      effectAllowed: '',
      dropEffect: '',
    };

    fireEvent.dragStart(card, { dataTransfer });
    expect(dataTransfer.setData).toHaveBeenCalledWith(
      'application/x-kanban-task',
      '1',
    );

    fireEvent.drop(screen.getByLabelText('Done'), { dataTransfer });

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem('kanban-tasks') ?? '[]') as Task[];
      expect(stored.find((t) => t.id === 1)?.type).toBe('done');
    });
  });
});
