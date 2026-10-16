import { fetchPrice } from "./coinbase.js";

export async function verifySymbol(symbol, currency) {
  try {
    await fetchPrice(symbol, currency);
    return true;
  } catch {
    return false;
  }
}
