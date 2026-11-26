import { formatDate, parseDate } from '@/utils/dateUtils';

describe('formatDate', () => {
  it('formats ms timestamp as dd.mm.yyyy with zero padding', () => {
    expect(formatDate(new Date(2025, 0, 5).getTime())).toBe('05.01.2025');
  });
});

describe('parseDate', () => {
  it('parses valid dd.mm.yyyy to local midnight timestamp', () => {
    expect(parseDate('05.01.2025')).toBe(new Date(2025, 0, 5).getTime());
  });

  it('returns null for wrong format', () => {
    expect(parseDate('2025-01-05')).toBeNull();
    expect(parseDate('5.1.2025')).toBeNull();
    expect(parseDate('05/01/2025')).toBeNull();
    expect(parseDate('abc')).toBeNull();
    expect(parseDate('')).toBeNull();
  });

  it('returns null for non-existent calendar dates', () => {
    expect(parseDate('30.02.2025')).toBeNull();
    expect(parseDate('31.04.2025')).toBeNull();
    expect(parseDate('32.01.2025')).toBeNull();
    expect(parseDate('00.01.2025')).toBeNull();
    expect(parseDate('01.13.2025')).toBeNull();
  });

  it('accepts 29.02 in leap years and rejects it otherwise', () => {
    expect(parseDate('29.02.2024')).toBe(new Date(2024, 1, 29).getTime());
    expect(parseDate('29.02.2025')).toBeNull();
  });

  it('round-trips with formatDate', () => {
    const ts = parseDate('17.11.2025');
    expect(ts).not.toBeNull();
    expect(formatDate(ts as number)).toBe('17.11.2025');
  });
});
