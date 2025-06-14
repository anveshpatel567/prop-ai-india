
export function deductResumeCredits(balance: number, cost: number = 50): number {
  return Math.max(0, balance - cost);
}
