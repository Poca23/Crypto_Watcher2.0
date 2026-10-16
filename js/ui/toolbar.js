import { getState, setCurrency } from "../core/store.js";
import { applyTheme, toggleTheme } from "./theme.js";

export function initToolbar() {
  const currencyBtn = document.getElementById("currencyBtn");
  currencyBtn.textContent = getState().currency;
  currencyBtn.onclick = () => {
    const next = getState().currency === "EUR" ? "USD" : "EUR";
    setCurrency(next);
    currencyBtn.textContent = next;
  };

  applyTheme();
  document.getElementById("themeBtn").onclick = toggleTheme;

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    document.querySelectorAll(".extra:not([hidden])").forEach((extra) => {
      extra.hidden = true;
      extra
        .closest(".card")
        .querySelector(".toggle")
        .setAttribute("aria-expanded", "false");
    });
  });
}
