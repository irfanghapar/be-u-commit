export function calculateEfficiency(added: number, deleted: number, commits: number): number {
  if (commits === 0) return 0;
  return Number(((added + deleted) / commits).toFixed(2));
}