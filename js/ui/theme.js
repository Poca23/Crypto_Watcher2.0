import { getState, setTheme } from "../core/store.js";

const root = document.documentElement;

const preferred = () =>
  window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

export function applyTheme() {
  root.dataset.theme = getState().theme ?? preferred();
}

export function toggleTheme() {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  applyTheme();
}
