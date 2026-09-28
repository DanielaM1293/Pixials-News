/**
 * detalle.js — vista de detalle de una noticia
 *
 * Lee el parámetro ?id= de la URL (ej: detalle.html?id=3), busca la
 * noticia en los datos y construye la vista completa con JavaScript:
 * imagen, título, autor, fecha, contenido, botón de favoritos y
 * noticias relacionadas.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Obtener el id desde la URL y buscar la noticia correspondiente
  const id = new URLSearchParams(window.location.search).get("id");
  const noticia = obtenerNoticiaPorId(id);

  // 2. Si el id no existe (o la noticia fue eliminada), mostrar mensaje de error
  if (!noticia) {
    document.getElementById("articleWrap").style.display = "none";
    document.getElementById("notFound").style.display = "block";
    return;
  }

  // 3. Actualizar el título de la pestaña y la ruta de navegación (breadcrumb)
  document.getElementById("pageTitleTag").textContent = `${noticia.titulo} — Pixials News`;
  document.getElementById("crumbTitulo").textContent = truncar(noticia.titulo, 40);

  // 4. Noticias relacionadas: misma categoría, excluyendo la actual, máximo 3
  const relacionadas = obtenerNoticias()
    .filter(n => n.categoria === noticia.categoria && n.id !== noticia.id)
    .slice(0, 3);

  // 5. Construir todo el HTML de la noticia con una plantilla de texto
  document.getElementById("articleWrap").innerHTML = `
    <div class="article-hero">
      <span class="tag">${noticia.categoria}</span>
      <img src="${noticia.imagen}" alt="${noticia.titulo}">
    </div>
    <div class="article-layout">
      <article class="article-body">
        <h1>${noticia.titulo}</h1>
        <div class="article-meta">
          <span>Por ${noticia.autor}</span>
          <span>${formatearFecha(noticia.fecha)}</span>
          <span>${noticia.categoria}</span>
        </div>
        <div class="article-content">
          ${/* cada salto de línea del contenido se convierte en un párrafo */ ""}
          ${noticia.contenido.split("\n").map(p => `<p>${p}</p>`).join("")}
        </div>
        <div class="article-actions">
          <button class="btn btn-fav cut" id="favBtn">★ Guardar en favoritos</button>
          <a href="contacto.html" class="btn btn-ghost cut">Comentar o contactar</a>
        </div>
      </article>

      <aside class="side-panel">
        <div class="side-card cut-sm">
          <h4>Sobre esta edición</h4>
          <p class="text-dim" style="font-size:.88rem;">Publicado en la sección ${noticia.categoria}. ¿Te interesa este tema? Guárdalo en favoritos para encontrarlo fácilmente después.</p>
        </div>
        ${relacionadas.length ? `
        <div class="side-card cut-sm">
          <h4>Relacionadas</h4>
          ${relacionadas.map(r => `
            <a href="detalle.html?id=${r.id}" class="related-item">
              <img src="${r.imagen}" alt="">
              <div>
                <h5>${truncar(r.titulo, 60)}</h5>
                <span>${formatearFecha(r.fecha)}</span>
              </div>
            </a>
          `).join("")}
        </div>` : ""}
      </aside>
    </div>
  `;

  // 6. Botón de favoritos (se conecta DESPUÉS de crear el HTML, porque
  //    antes de eso el botón todavía no existe en la página)
  const favBtn = document.getElementById("favBtn");

  // Estado inicial: si ya era favorita, se muestra como guardada
  if (esFavorito(noticia.id)) {
    favBtn.classList.add("is-active");
    favBtn.textContent = "★ Guardado en favoritos";
  }

  // Al hacer clic: agrega o quita de favoritos y actualiza el botón
  favBtn.addEventListener("click", () => {
    const activo = toggleFavorito(noticia.id);
    favBtn.classList.toggle("is-active", activo);
    favBtn.textContent = activo ? "★ Guardado en favoritos" : "★ Guardar en favoritos";
  });
});
