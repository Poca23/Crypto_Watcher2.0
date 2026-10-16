const el = document.getElementById("status");

export function showStatus(online) {
  el.textContent = online ? "● En direct" : "○ Connexion perdue, nouvel essai…";
  el.className = `status ${online ? "up" : "down"}`;
}
