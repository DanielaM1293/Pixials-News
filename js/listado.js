/**
 * listado.js — catálogo de noticias
 *
 * Maneja tres filtros que se combinan entre sí (categoría, búsqueda por
 * texto y "solo favoritos") y el mini CRUD: crear y eliminar noticias.
 * Cada cambio vuelve a dibujar la cuadrícula sin recargar la página.
 */

/* ---------- Estado de los filtros ---------- */
let filtroActual = "todas";  // categoría seleccionada
let terminoBusqueda = "";    // texto del buscador (en minúsculas)
let soloFavoritos = false;   // true cuando se llega desde el menú "Favoritos"

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await datosListos;
  } catch (error) {
    console.error(error);
    mostrarErrorCarga("newsGrid");
    return;
  }

  // Si la URL trae ?filtro=favoritos, se muestra solo la lista de favoritas
  const params = new URLSearchParams(window.location.search);
  soloFavoritos = params.get("filtro") === "favoritos";

  if (soloFavoritos) {
    const pageTitle = document.getElementById("pageTitle");
    if (pageTitle) pageTitle.textContent = "Tus noticias favoritas";
  }

  // Dibujo inicial de la página
  renderChips();        // botones de categoría
  renderGrid();         // tarjetas de noticias
  renderManageList();   // lista del panel de administración

  // Buscador: se filtra en cada tecla que el usuario escribe
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      terminoBusqueda = e.target.value.trim().toLowerCase();
      renderGrid();
    });
  }

  // Panel de administración: se despliega y se pliega al hacer clic
  const crudToggle = document.getElementById("crudToggle");
  if (crudToggle) {
    crudToggle.addEventListener("click", () => {
      const body = document.getElementById("crudBody");
      const icon = document.getElementById("crudIcon");
      if (body) body.classList.toggle("open");
      if (icon) icon.textContent = body.classList.contains("open") ? "–" : "＋";
    });
  }

  // Formulario de creación de noticias
  const newsForm = document.getElementById("newsForm");
  if (newsForm) {
    newsForm.addEventListener("submit", manejarCreacion);
  }
});

/* =========================================================
   FILTROS Y RENDERIZADO
   ========================================================= */

/**
 * Dibuja los botones (chips) de categoría.
 * Las categorías se calculan a partir de las noticias existentes, por lo
 * que si se crea una noticia de otra categoría, aparece un chip nuevo.
 */
function renderChips() {
  const wrap = document.getElementById("filterChips");
  if (!wrap) return;

  const noticias = obtenerNoticias();
  // Set elimina categorías repetidas; "todas" va siempre primero
  const categorias = ["todas", ...new Set(noticias.map(n => n.categoria))];
  wrap.innerHTML = categorias.map(c => `
    <button class="chip cut-sm ${c === filtroActual ? "active" : ""}" data-cat="${c}">
      ${c === "todas" ? "Todas" : c}
    </button>
  `).join("");

  // Al hacer clic en un chip: se guarda la categoría y se redibuja la grilla
  wrap.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      filtroActual = chip.dataset.cat;
      wrap.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      renderGrid();
    });
  });
}

/**
 * Aplica los tres filtros en cadena (cada uno reduce la lista anterior)
 * y devuelve las noticias resultantes, de la más reciente a la más antigua.
 */
function obtenerNoticiasFiltradas() {
  let noticias = obtenerNoticias();

  // Filtro 1: solo favoritas
  if (soloFavoritos) {
    const favs = obtenerFavoritos();
    noticias = noticias.filter(n => favs.includes(n.id));
  }
  // Filtro 2: categoría
  if (filtroActual !== "todas") {
    noticias = noticias.filter(n => n.categoria === filtroActual);
  }
  // Filtro 3: texto en el título o en el resumen
  if (terminoBusqueda) {
    noticias = noticias.filter(n =>
      n.titulo.toLowerCase().includes(terminoBusqueda) ||
      n.resumen.toLowerCase().includes(terminoBusqueda)
    );
  }
  // Orden por fecha descendente
  return noticias.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
}

/**
 * Dibuja las tarjetas de noticias según los filtros activos.
 * Si no hay resultados, muestra el mensaje de "estado vacío".
 */
function renderGrid() {
  const grid = document.getElementById("newsGrid");
  const empty = document.getElementById("emptyState");
  if (!grid) return;

  const noticias = obtenerNoticiasFiltradas();

  // Sin resultados: limpiar la grilla y mostrar el mensaje
  if (noticias.length === 0) {
    grid.innerHTML = "";
    if (empty) {
      empty.style.display = "block";
      if (soloFavoritos) {
        empty.textContent = "Aún no tienes noticias en favoritos. Ve al catálogo y marca las que te interesen con ★.";
      }
    }
    return;
  }
  if (empty) empty.style.display = "none";

  // Una tarjeta por noticia: imagen, categoría, título, resumen y acciones
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

  // Botones de favoritos (se conectan después de crear las tarjetas)
  grid.querySelectorAll("[data-fav-btn]").forEach(btn => {
    const id = btn.dataset.favBtn;
    if (esFavorito(id)) btn.classList.add("is-active"); // estado inicial
    btn.addEventListener("click", () => {
      const activo = toggleFavorito(id);
      btn.classList.toggle("is-active", activo);
      if (soloFavoritos) renderGrid(); // en la vista de favoritos, la tarjeta desaparece al desmarcar
    });
  });
}

/* =========================================================
   MINI CRUD (Crear y Eliminar)
   ========================================================= */

/**
 * CREAR: valida el formulario y agrega la noticia nueva.
 * Los campos obligatorios no pueden estar vacíos; la imagen es opcional
 * (si se omite, se usa una imagen de marcador generada con el id).
 */
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

  // Recorre cada campo: limpia errores previos y valida los obligatorios
  Object.entries(campos).forEach(([clave, el]) => {
    if (!el) return;
    const field = el.closest(".field");
    if (!field) return;
    const errorMsg = field.querySelector(".error-msg");
    field.classList.remove("error");
    if (errorMsg) errorMsg.textContent = "";

    if (clave === "imagen") return; // opcional: no se valida

    if (!el.value.trim()) {
      field.classList.add("error");
      if (errorMsg) errorMsg.textContent = "Este campo es obligatorio.";
      valido = false;
    }
  });

  if (!valido) return;

  // Nuevo id = mayor id existente + 1 (así nunca se repite, aunque se borren noticias)
  const noticias = obtenerNoticias();
  const nuevoId = noticias.length ? Math.max(...noticias.map(n => n.id)) + 1 : 1;

  const nueva = {
    id: nuevoId,
    titulo: campos.titulo.value.trim(),
    categoria: campos.categoria.value,
    resumen: campos.resumen.value.trim(),
    contenido: campos.contenido.value.trim(),
    imagen: campos.imagen.value.trim() || `https://picsum.photos/seed/pixials-${nuevoId}/900/600`,
    fecha: new Date().toISOString().slice(0, 10), // fecha de hoy: AAAA-MM-DD
    autor: "Redacción Pixials",
    destacada: false
  };

  // Guardar en localStorage y refrescar la interfaz
  noticias.push(nueva);
  guardarNoticias(noticias);

  e.target.reset();
  renderChips();
  renderGrid();
  renderManageList();
}

/**
 * ELIMINAR: dibuja la lista del panel de administración, con un botón
 * "Eliminar" por noticia. Pide confirmación antes de borrar.
 */
function renderManageList() {
  const wrap = document.getElementById("manageList");
  if (!wrap) return;

  // [...] crea una copia para no alterar el orden del arreglo original
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
      // Se conservan todas las noticias EXCEPTO la del id seleccionado
      const restantes = obtenerNoticias().filter(n => n.id !== id);
      guardarNoticias(restantes);
      renderChips();
      renderGrid();
      renderManageList();
    });
  });
}
