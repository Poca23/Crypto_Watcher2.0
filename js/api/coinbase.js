const BASE = "https://api.coinbase.com/v2/prices";

export async function fetchPrice(symbol, currency) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 3000);
  try {
    const res = await fetch(`${BASE}/${symbol}-${currency}/spot`, {
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { data } = await res.json();
    const price = Number(data.amount);
    if (!Number.isFinite(price)) throw new Error("Prix invalide");
    return price;
  } finally {
    clearTimeout(timer);
  }
}
