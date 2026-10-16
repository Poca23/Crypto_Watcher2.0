import { money, percent } from "../format.js";
import { sparklinePath } from "./sparkline.js";
import { variation } from "../domain/variation.js";
import { renderDetails } from "./details.js";
import { flash } from "./flash.js";

const ICON = { up: "▲", down: "▼", flat: "■" };

export function createCard(symbol, onRemove) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.symbol = symbol;
  card.innerHTML = `
    <div class="card-head">
      <div><strong class="sym"></strong><span class="nm"></span></div>
      <span class="badge"></span>
    </div>
    <div class="price"></div>
    <svg class="spark" viewBox="0 0 200 48" preserveAspectRatio="none" aria-hidden="true"><path/></svg>
    <div class="prev"></div>
    <div class="actions">
      <button class="btn toggle" aria-expanded="false">Détails</button>
      <button class="btn remove" aria-label="Retirer"></button>
    </div>
    <div class="extra" hidden></div>`;
  card.querySelector(".remove").textContent = "✕";
  card.querySelector(".remove").onclick = () => onRemove(symbol);
  card.querySelector(".toggle").onclick = (e) => {
    const extra = card.querySelector(".extra");
    extra.hidden = !extra.hidden;
    e.target.setAttribute("aria-expanded", String(!extra.hidden));
  };
  return card;
}

export function updateCard(card, crypto, currency) {
  const { symbol, name, series, error } = crypto;
  const price = series.at(-1);
  const prev = series.at(-2);
  const { percent: pct, type } = variation(price, prev);

  card.querySelector(".sym").textContent = symbol;
  card.querySelector(".nm").textContent = name;

  const badge = card.querySelector(".badge");
  badge.textContent = `${ICON[type]} ${percent(pct)}`;
  badge.className = `badge ${type}`;

  card.querySelector(".spark").setAttribute("class", `spark ${type}`);
  card.querySelector("path").setAttribute("d", sparklinePath(series));

  const priceEl = card.querySelector(".price");
  const text =
    price !== undefined
      ? money(price, currency)
      : error
        ? "Indisponible"
        : "Chargement…";
  if (priceEl.textContent !== text) {
    const hadValue = priceEl.dataset.ready === "1";
    priceEl.textContent = text;
    if (price !== undefined) {
      priceEl.dataset.ready = "1";
      if (hadValue) flash(priceEl, type);
    }
  }

  card.querySelector(".prev").textContent = error
    ? "Erreur de connexion"
    : prev
      ? `Avant : ${money(prev, currency)}`
      : "Avant : —";

  const extra = card.querySelector(".extra");
  if (!extra.hidden) extra.replaceChildren(renderDetails(crypto, currency));
}
