export const money = (value, currency) => {
  const digits = value < 1 ? 4 : 2;
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
};

export const percent = (value) =>
  `${value > 0 ? "+" : ""}${value.toFixed(2).replace(".", ",")} %`;
