import { money } from "../format.js";
import { stats } from "../domain/stats.js";

const row = (label, value) => {
  const li = document.createElement("li");
  const a = document.createElement("span");
  const b = document.createElement("strong");
  a.textContent = label;
  b.textContent = value;
  li.append(a, b);
  return li;
};

export function renderDetails({ series }, currency) {
  const { high, low } = stats(series);
  const ul = document.createElement("ul");
  ul.className = "details";
  if (!series.length) return ul;

  ul.append(
    row("Plus haut", money(high, currency)),
    row("Plus bas", money(low, currency)),
  );
  series
    .slice(-5)
    .reverse()
    .forEach((p, i) =>
      ul.append(
        row(i === 0 ? "Dernier prix" : "Précédent", money(p, currency)),
      ),
    );
  return ul;
}
