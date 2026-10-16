export function sparklinePath(values, width = 200, height = 48) {
  if (values.length < 2) return "";
  const min = Math.min(...values);
  const range = Math.max(...values) - min || 1;
  return values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}
