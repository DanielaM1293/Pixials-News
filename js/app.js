/**
 * app.js — utilidades compartidas por todas las páginas de Pixials News
 *
 * Este archivo se carga en las cuatro vistas (Home, Listado, Detalle y
 * Contacto). Reúne lo que todas necesitan: el menú móvil, el link activo,
 * la gestión de favoritos y funciones auxiliares de formato.
 *
 * Dependencia: debe cargarse DESPUÉS de data.js, porque usa
 * inicializarDatos() y LS_KEYS definidos allí.
 */

// Se ejecuta cuando el HTML terminó de cargarse (antes de imágenes y estilos).
// Aquí se inicializa todo lo que es común a cualquier página.
document.addEventListener("DOMContentLoaded", () => {
  inicializarDatos();            // asegura que localStorage tenga datos base
  configurarMenuMovil();         // botón hamburguesa
  marcarLinkActivo();            // resalta la página actual en el menú
  actualizarContadorFavoritos(); // muestra cuántos favoritos hay en el header
});

/* =========================================================
   NAVEGACIÓN
   ========================================================= */

/**
 * Abre y cierra el menú de navegación en pantallas pequeñas.
 * Alterna la clase "open", que en style.css muestra la lista de links.
 */
function configurarMenuMovil() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return; // por seguridad, si la página no tiene menú
  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
  });
}

/**
 * Marca con la clase "active" el link del menú que corresponde a la
 * página actual. Toma el nombre del archivo desde la URL
 * (ej: ".../listado.html" -> "listado.html").
 */
function marcarLinkActivo() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });
}

/* =========================================================
   FAVORITOS (persisten en localStorage)
   Se guardan como un arreglo de ids, por ejemplo: [1, 4, 7]
   ========================================================= */

/** Devuelve el arreglo de ids de las noticias marcadas como favoritas. */
function obtenerFavoritos() {
  inicializarDatos();
  return JSON.parse(localStorage.getItem(LS_KEYS.FAVORITOS));
}

/**
 * Indica si una noticia está en favoritos.
 * Number(id) convierte ids que llegan como texto desde el HTML (data-*).
 */
function esFavorito(id) {
  return obtenerFavoritos().includes(Number(id));
}

/**
 * Agrega la noticia a favoritos si no estaba, o la quita si ya estaba.
 * Guarda el resultado, actualiza el contador del header y devuelve
 * true (quedó en favoritos) o false (fue retirada).
 */
function toggleFavorito(id) {
  id = Number(id);
  let favs = obtenerFavoritos();
  if (favs.includes(id)) {
    favs = favs.filter(f => f !== id); // quitar
  } else {
    favs.push(id);                     // agregar
  }
  localStorage.setItem(LS_KEYS.FAVORITOS, JSON.stringify(favs));
  actualizarContadorFavoritos();
  return favs.includes(id);
}

/**
 * Actualiza el número junto a "Favoritos" en el menú.
 * Si no hay favoritos, oculta el contador.
 */
function actualizarContadorFavoritos() {
  const el = document.querySelector("[data-fav-count]");
  if (!el) return;
  const count = obtenerFavoritos().length;
  el.textContent = count;
  el.style.display = count > 0 ? "inline-flex" : "none";
}

/* =========================================================
   HELPERS DE FORMATO
   ========================================================= */

/**
 * Convierte una fecha ISO ("2026-09-02") a formato legible ("2 sep. 2026").
 * Se separa el texto a mano en lugar de usar new Date() para evitar
 * desfases por zona horaria.
 */
function formatearFecha(iso) {
  const meses = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  const [y,m,d] = iso.split("-");
  return `${parseInt(d)} ${meses[parseInt(m)-1]}. ${y}`;
}

/**
 * Recorta un texto a un máximo de caracteres y agrega "…" si fue cortado.
 * Se usa en los resúmenes de las tarjetas.
 */
function truncar(texto, max) {
  return texto.length > max ? texto.slice(0, max).trim() + "…" : texto;
}
