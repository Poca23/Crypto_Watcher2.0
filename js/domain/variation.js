// Renvoie { percent, type } avec type = "up" | "down" | "flat".
export function variation(price, prev) {
  if (!prev || price === undefined) return { percent: 0, type: "flat" };
  const percent = ((price - prev) / prev) * 100;
  const rounded = Math.round(percent * 100) / 100;
  if (rounded === 0) return { percent: 0, type: "flat" };
  return { percent: rounded, type: rounded > 0 ? "up" : "down" };
}
