export function stats(series) {
  if (!series.length) return { high: undefined, low: undefined };
  return { high: Math.max(...series), low: Math.min(...series) };
}
