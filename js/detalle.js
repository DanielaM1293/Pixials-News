// detalle.js — renderiza una noticia individual a partir de ?id=

document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const noticia = obtenerNoticiaPorId(id);

  if (!noticia) {
    document.getElementById("articleWrap").style.display = "none";
    document.getElementById("notFound").style.display = "block";
    return;
  }

  document.getElementById("pageTitleTag").textContent = `${noticia.titulo} — Pixials News`;
  document.getElementById("crumbTitulo").textContent = truncar(noticia.titulo, 40);

  const relacionadas = obtenerNoticias()
    .filter(n => n.categoria === noticia.categoria && n.id !== noticia.id)
    .slice(0, 3);

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

  const favBtn = document.getElementById("favBtn");
  if (esFavorito(noticia.id)) {
    favBtn.classList.add("is-active");
    favBtn.textContent = "★ Guardado en favoritos";
  }
  favBtn.addEventListener("click", () => {
    const activo = toggleFavorito(noticia.id);
    favBtn.classList.toggle("is-active", activo);
    favBtn.textContent = activo ? "★ Guardado en favoritos" : "★ Guardar en favoritos";
  });
});
