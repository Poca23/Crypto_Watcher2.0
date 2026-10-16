import { REFRESH_MS } from "../config.js";

export function startLoop(task) {
  let delay = REFRESH_MS;
  let timer;

  const tick = async () => {
    const ok = await task();
    delay = ok ? REFRESH_MS : Math.min(delay * 2, 50000);
    timer = setTimeout(tick, delay);
  };

  tick();
  return () => clearTimeout(timer);
}
