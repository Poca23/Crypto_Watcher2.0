import { getState, addCrypto } from "../core/store.js";
import { verifySymbol } from "../api/verify.js";
import { SUGGESTIONS } from "../config.js";

const form = document.getElementById("addForm");
const input = document.getElementById("addInput");
const select = document.getElementById("addSelect");
const msg = document.getElementById("addMsg");

export function initAddForm() {
  form.onsubmit = async (e) => {
    e.preventDefault();
    const symbol = input.value.trim().toUpperCase();
    const { cryptos, currency } = getState();

    if (!/^[A-Z0-9]{2,10}$/.test(symbol))
      return (msg.textContent = "Symbole invalide.");
    if (cryptos.some((c) => c.symbol === symbol))
      return (msg.textContent = "Déjà suivi.");

    msg.textContent = "Vérification…";
    if (!(await verifySymbol(symbol, currency)))
      return (msg.textContent = `${symbol} introuvable sur Coinbase.`);

    const known = SUGGESTIONS.find((s) => s.symbol === symbol);
    addCrypto(symbol, known?.name);
    input.value = "";
    select.value = "";
    msg.textContent = "";
  };
}
