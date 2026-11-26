const pad = (n: number): string => String(n).padStart(2, '0');

export const formatDate = (timestampMs: number): string => {
  const date = new Date(timestampMs);
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
};
