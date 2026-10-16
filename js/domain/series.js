const MAX_POINTS = 60;

export function pushPrice(series = [], price) {
  if (series.at(-1) === price) return series;
  return [...series, price].slice(-MAX_POINTS);
}
