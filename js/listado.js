// listado.js — filtros, búsqueda, favoritos y mini CRUD de noticias

let filtroActual = "todas";
let terminoBusqueda = "";
let soloFavoritos = false;

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  soloFavoritos = params.get("filtro") === "favoritos";

  if (soloFavoritos) {
    document.getElementById("pageTitle").textContent = "Tus noticias favoritas";
  }

  renderChips();
  renderGrid();
  renderManageList();

  document.getElementById("searchInput").addEventListener("input", (e) => {
    terminoBusqueda = e.target.value.trim().toLowerCase();
    renderGrid();
  });

  document.getElementById("crudToggle").addEventListener("click", () => {
    const body = document.getElementById("crudBody");
    const icon = document.getElementById("crudIcon");
    body.classList.toggle("open");
    icon.textContent = body.classList.contains("open") ? "–" : "＋";
  });

  document.getElementById("newsForm").addEventListener("submit", manejarCreacion);
});

function renderChips() {
  const noticias = obtenerNoticias();
  const categorias = ["todas", ...new Set(noticias.map(n => n.categoria))];
  const wrap = document.getElementById("filterChips");
  wrap.innerHTML = categorias.map(c => `
    <button class="chip cut-sm ${c === filtroActual ? "active" : ""}" data-cat="${c}">
      ${c === "todas" ? "Todas" : c}
    </button>
  `).join("");

  wrap.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      filtroActual = chip.dataset.cat;
      wrap.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      renderGrid();
    });
  });
}

function obtenerNoticiasFiltradas() {
  let noticias = obtenerNoticias();

  if (soloFavoritos) {
    const favs = obtenerFavoritos();
    noticias = noticias.filter(n => favs.includes(n.id));
  }
  if (filtroActual !== "todas") {
    noticias = noticias.filter(n => n.categoria === filtroActual);
  }
  if (terminoBusqueda) {
    noticias = noticias.filter(n =>
      n.titulo.toLowerCase().includes(terminoBusqueda) ||
      n.resumen.toLowerCase().includes(terminoBusqueda)
    );
  }
  return noticias.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
}

function renderGrid() {
  const grid = document.getElementById("newsGrid");
  const empty = document.getElementById("emptyState");
  const noticias = obtenerNoticiasFiltradas();

  if (noticias.length === 0) {
    grid.innerHTML = "";
    empty.style.display = "block";
    if (soloFavoritos) {
      empty.textContent = "Aún no tienes noticias en favoritos. Ve al catálogo y marca las que te interesen con ★.";
    }
    return;
  }
  empty.style.display = "none";

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
      if (soloFavoritos) renderGrid(); // si estamos en favoritos, se remueve al desmarcar
    });
  });
}

/* ---------- Mini CRUD ---------- */

function manejarCreacion(e) {
  e.preventDefault();
  const campos = {
    titulo: document.getElementById("fTitulo"),
    categoria: document.getElementById("fCategoria"),
    resumen: document.getElementById("fResumen"),
    contenido: document.getElementById("fContenido"),
    imagen: document.getElementById("fImagen")
  };
  let valido = true;

  Object.entries(campos).forEach(([clave, el]) => {
    const field = el.closest(".field");
    const errorMsg = field.querySelector(".error-msg");
    field.classList.remove("error");
    errorMsg.textContent = "";

    if (clave === "imagen") return; // opcional

    if (!el.value.trim()) {
      field.classList.add("error");
      errorMsg.textContent = "Este campo es obligatorio.";
      valido = false;
    }
  });

  if (!valido) return;

  const noticias = obtenerNoticias();
  const nuevoId = noticias.length ? Math.max(...noticias.map(n => n.id)) + 1 : 1;

  const nueva = {
    id: nuevoId,
    titulo: campos.titulo.value.trim(),
    categoria: campos.categoria.value,
    resumen: campos.resumen.value.trim(),
    contenido: campos.contenido.value.trim(),
    imagen: campos.imagen.value.trim() || `https://picsum.photos/seed/pixials-${nuevoId}/900/600`,
    fecha: new Date().toISOString().slice(0, 10),
    autor: "Redacción Pixials",
    destacada: false
  };

  noticias.push(nueva);
  guardarNoticias(noticias);

  e.target.reset();
  renderChips();
  renderGrid();
  renderManageList();
}

function renderManageList() {
  const wrap = document.getElementById("manageList");
  const noticias = [...obtenerNoticias()].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  wrap.innerHTML = noticias.map(n => `
    <div class="manage-row">
      <img src="${n.imagen}" alt="">
      <div class="info">
        <h4>${n.titulo}</h4>
        <span>${n.categoria} · ${formatearFecha(n.fecha)}</span>
      </div>
      <button class="btn btn-danger cut-sm" data-delete="${n.id}">Eliminar</button>
    </div>
  `).join("");

  wrap.querySelectorAll("[data-delete]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.delete);
      if (!confirm("¿Eliminar esta noticia del catálogo? Esta acción no se puede deshacer.")) return;
      const restantes = obtenerNoticias().filter(n => n.id !== id);
      guardarNoticias(restantes);
      renderChips();
      renderGrid();
      renderManageList();
    });
  });
}
