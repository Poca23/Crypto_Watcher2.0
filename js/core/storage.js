const KEY = "cw2";

export function load(fallback) {
  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(KEY)) };
  } catch {
    return fallback;
  }
}

export function save(value) {
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* stockage indisponible : on continue sans */
  }
}
