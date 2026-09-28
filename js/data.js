const LS_KEYS = {
  NOTICIAS: "pixials_noticias",
  FAVORITOS: "pixials_favoritos"
};

// Se asigna a window para garantizar alcance global en el navegador
window.datosListos = inicializarDatos();

async function inicializarDatos() {
  if (!localStorage.getItem(LS_KEYS.NOTICIAS)) {
    try {
      const res = await fetch("data/noticias.json");
      if (!res.ok) throw new Error("No se pudo cargar noticias.json");
      const noticias = await res.json();
      localStorage.setItem(LS_KEYS.NOTICIAS, JSON.stringify(noticias));
    } catch (error) {
      console.error("Error cargando JSON:", error);
      throw error;
    }
  }

  if (!localStorage.getItem(LS_KEYS.FAVORITOS)) {
    localStorage.setItem(LS_KEYS.FAVORITOS, JSON.stringify([]));
  }
}

function obtenerNoticias() {
  return JSON.parse(localStorage.getItem(LS_KEYS.NOTICIAS)) || [];
}

function guardarNoticias(noticias) {
  localStorage.setItem(LS_KEYS.NOTICIAS, JSON.stringify(noticias));
}

function obtenerFavoritos() {
  return JSON.parse(localStorage.getItem(LS_KEYS.FAVORITOS)) || [];
}

function guardarFavoritos(favs) {
  localStorage.setItem(LS_KEYS.FAVORITOS, JSON.stringify(favs));
}
