import { SUGGESTIONS } from "../config.js";

const select = document.getElementById("addSelect");
const input = document.getElementById("addInput");

let lastKey = null;

const option = (value, text) =>
  Object.assign(document.createElement("option"), { value, textContent: text });

export function renderSuggestions({ cryptos }) {
  const followed = new Set(cryptos.map((c) => c.symbol));
  const free = SUGGESTIONS.filter((s) => !followed.has(s.symbol));

  const key = free.map((s) => s.symbol).join();
  if (key === lastKey) return;
  lastKey = key;

  const selected = select.value;
  select.replaceChildren(
    option("", "Choisir dans la liste…"),
    ...free.map((s) => option(s.symbol, `${s.name} (${s.symbol})`)),
  );
  select.value = selected;
}

select.onchange = () => {
  input.value = select.value;
};
