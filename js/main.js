import { getState, subscribe, setPrice, setError } from "./core/store.js";
import { startLoop } from "./core/scheduler.js";
import { fetchPrice } from "./api/coinbase.js";
import { renderCards } from "./ui/cards.js";
import { showStatus } from "./ui/status.js";
import { initToolbar } from "./ui/toolbar.js";
import { initAddForm } from "./ui/addForm.js";
import { renderSuggestions } from "./ui/suggestions.js";

async function refresh() {
  const { cryptos, currency } = getState();
  const results = await Promise.allSettled(
    cryptos.map((c) => fetchPrice(c.symbol, currency)),
  );
  let ok = 0;
  results.forEach((r, i) => {
    if (r.status === "fulfilled") (setPrice(cryptos[i]?.symbol, r.value), ok++);
    else setError(cryptos[i]?.symbol);
  });
  showStatus(ok > 0 || !cryptos.length);
  return ok > 0 || !cryptos.length;
}

subscribe(renderCards);
subscribe(renderSuggestions);
initToolbar();
initAddForm();
startLoop(refresh);
