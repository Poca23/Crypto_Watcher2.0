import { createCard, updateCard } from "./card.js";
import { removeCrypto } from "../core/store.js";

const container = document.getElementById("cards");

export function renderCards({ cryptos, currency }) {
  const existing = new Map(
    [...container.children].map((el) => [el.dataset.symbol, el]),
  );
  cryptos.forEach((c) => {
    const card = existing.get(c.symbol) ?? createCard(c.symbol, removeCrypto);
    updateCard(card, c, currency);
    container.append(card); // replace à la bonne position sans recréer
    existing.delete(c.symbol);
  });
  existing.forEach((el) => el.remove());
}
