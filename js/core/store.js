import { CRYPTOS, DEFAULT_CURRENCY } from "../config.js";
import { load, save } from "./storage.js";
import { pushPrice } from "../domain/series.js";

const saved = load({ currency: DEFAULT_CURRENCY, theme: null, symbols: null });
const base = saved.symbols ?? CRYPTOS;
const state = {
  currency: saved.currency,
  theme: saved.theme,
  cryptos: base.map((c) => ({ ...c, series: [], error: false })),
};
const listeners = new Set();

const emit = () => listeners.forEach((fn) => fn(state));
const persist = () =>
  save({
    currency: state.currency,
    theme: state.theme,
    symbols: state.cryptos.map(({ symbol, name }) => ({ symbol, name })),
  });
const find = (symbol) => state.cryptos.find((c) => c.symbol === symbol);

export const getState = () => state;
export const subscribe = (fn) => (listeners.add(fn), fn(state));

export function setPrice(symbol, price) {
  const c = find(symbol);
  if (!c) return;
  c.series = pushPrice(c.series, price);
  c.error = false;
  emit();
}

export function setError(symbol) {
  const c = find(symbol);
  if (c) c.error = true;
  emit();
}

export function addCrypto(symbol, name = symbol) {
  state.cryptos.push({ symbol, name, series: [], error: false });
  persist();
  emit();
}

export function removeCrypto(symbol) {
  state.cryptos = state.cryptos.filter((c) => c.symbol !== symbol);
  persist();
  emit();
}

export function setCurrency(currency) {
  state.currency = currency;
  state.cryptos.forEach((c) => (c.series = []));
  persist();
  emit();
}

export function setTheme(theme) {
  state.theme = theme;
  persist();
}
