// home.js — carrusel de destacadas y últimas noticias

document.addEventListener("DOMContentLoaded", () => {
  const noticias = obtenerNoticias();
  const destacadas = noticias.filter(n => n.destacada);
  const recientes = [...noticias]
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .slice(0, 3);

  renderCarrusel(destacadas);
  renderGridReciente(recientes);
});

function renderGridReciente(noticias) {
  const grid = document.getElementById("latestGrid");
  grid.innerHTML = noticias.map(n => `
    <article class="news-card cut-sm">
      <a href="detalle.html?id=${n.id}" class="thumb">
        <span class="tag">${n.categoria}</span>
        <img src="${n.imagen}" alt="${n.titulo}" loading="lazy">
      </a>
      <div class="body">
        <h3><a href="detalle.html?id=${n.id}">${n.titulo}</a></h3>
        <p class="excerpt">${truncar(n.resumen, 110)}</p>
        <div class="meta">
          <span>${n.autor}</span>
          <span>${formatearFecha(n.fecha)}</span>
        </div>
        <div class="actions">
          <a href="detalle.html?id=${n.id}" class="btn btn-ghost cut-sm" style="flex:1;justify-content:center;">Leer más</a>
          <button class="btn btn-fav cut-sm" data-fav-btn="${n.id}" aria-label="Guardar en favoritos">★</button>
        </div>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-fav-btn]").forEach(btn => {
    const id = btn.dataset.favBtn;
    if (esFavorito(id)) btn.classList.add("is-active");
    btn.addEventListener("click", () => {
      const activo = toggleFavorito(id);
      btn.classList.toggle("is-active", activo);
    });
  });
}

/* ---------- Carrusel ---------- */
let carIndex = 0;
let carTimer = null;

function renderCarrusel(items) {
  const track = document.getElementById("carouselTrack");
  const dotsWrap = document.getElementById("carouselDots");

  track.innerHTML = items.map(n => `
    <div class="slide">
      <img src="${n.imagen}" alt="${n.titulo}">
      <div class="slide-copy">
        <span class="tag">${n.categoria}</span>
        <h3>${n.titulo}</h3>
        <a href="detalle.html?id=${n.id}">Leer noticia →</a>
      </div>
    </div>
  `).join("");

  dotsWrap.innerHTML = items.map((_, i) => `<button data-dot="${i}" class="${i === 0 ? "active" : ""}"></button>`).join("");

  const irA = (i) => {
    carIndex = (i + items.length) % items.length;
    track.style.transform = `translateX(-${carIndex * 100}%)`;
    dotsWrap.querySelectorAll("button").forEach((d, idx) => d.classList.toggle("active", idx === carIndex));
  };

  document.getElementById("prevBtn").addEventListener("click", () => { irA(carIndex - 1); reiniciarAuto(); });
  document.getElementById("nextBtn").addEventListener("click", () => { irA(carIndex + 1); reiniciarAuto(); });
  dotsWrap.querySelectorAll("button").forEach(d => {
    d.addEventListener("click", () => { irA(Number(d.dataset.dot)); reiniciarAuto(); });
  });

  const carousel = document.getElementById("carousel");
  carousel.addEventListener("mouseenter", () => clearInterval(carTimer));
  carousel.addEventListener("mouseleave", reiniciarAuto);

  function reiniciarAuto() {
    clearInterval(carTimer);
    carTimer = setInterval(() => irA(carIndex + 1), 5000);
  }
  reiniciarAuto();
}
