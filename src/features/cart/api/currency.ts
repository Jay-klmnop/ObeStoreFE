export function usdToKrw(usd: number, rate = 1400): number {
  return Math.round(usd * rate);
}
