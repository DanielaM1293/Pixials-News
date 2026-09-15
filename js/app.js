// app.js — utilidades compartidas por todas las páginas de Pixials News

document.addEventListener("DOMContentLoaded", () => {
  inicializarDatos();
  configurarMenuMovil();
  marcarLinkActivo();
  actualizarContadorFavoritos();
});

function configurarMenuMovil() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
  });
}

function marcarLinkActivo() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });
}

/* ---------- Favoritos (localStorage) ---------- */

function obtenerFavoritos() {
  inicializarDatos();
  return JSON.parse(localStorage.getItem(LS_KEYS.FAVORITOS));
}

function esFavorito(id) {
  return obtenerFavoritos().includes(Number(id));
}

function toggleFavorito(id) {
  id = Number(id);
  let favs = obtenerFavoritos();
  if (favs.includes(id)) {
    favs = favs.filter(f => f !== id);
  } else {
    favs.push(id);
  }
  localStorage.setItem(LS_KEYS.FAVORITOS, JSON.stringify(favs));
  actualizarContadorFavoritos();
  return favs.includes(id);
}

function actualizarContadorFavoritos() {
  const el = document.querySelector("[data-fav-count]");
  if (!el) return;
  const count = obtenerFavoritos().length;
  el.textContent = count;
  el.style.display = count > 0 ? "inline-flex" : "none";
}

/* ---------- Helpers de formato ---------- */

function formatearFecha(iso) {
  const meses = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  const [y,m,d] = iso.split("-");
  return `${parseInt(d)} ${meses[parseInt(m)-1]}. ${y}`;
}

function truncar(texto, max) {
  return texto.length > max ? texto.slice(0, max).trim() + "…" : texto;
}
