export function flash(el, type) {
  if (type === "flat") return;
  el.classList.remove("flash-up", "flash-down");
  void el.offsetWidth;
  el.classList.add(`flash-${type}`);
}
