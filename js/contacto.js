/**
 * contacto.js — validación del formulario de contacto
 *
 * Valida los cuatro campos (nombre, correo, asunto y mensaje) antes de
 * aceptar el envío. Como no hay backend en esta entrega, el "envío" se
 * simula mostrando un mensaje de confirmación.
 */

// Conecta el evento "submit" del formulario cuando la página está lista.
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("contactForm").addEventListener("submit", manejarEnvio);
});

/**
 * Se ejecuta al enviar el formulario.
 * Valida todos los campos; si alguno falla, muestra su error y no envía.
 */
function manejarEnvio(e) {
  e.preventDefault(); // evita que el navegador recargue la página

  const nombre = document.getElementById("cNombre");
  const correo = document.getElementById("cCorreo");
  const asunto = document.getElementById("cAsunto");
  const mensaje = document.getElementById("cMensaje");
  let valido = true;

  // Se validan TODOS los campos (aunque uno falle) para que el usuario
  // vea todos los errores a la vez. "&& valido" conserva un false previo.
  valido = validarRequerido(nombre, "Escribe tu nombre.") && valido;
  valido = validarCorreo(correo) && valido;
  valido = validarRequerido(asunto, "Selecciona un asunto.") && valido;
  valido = validarRequerido(mensaje, "Escribe tu mensaje.", 10) && valido;

  const successMsg = document.getElementById("successMsg");

  if (!valido) {
    successMsg.classList.add("hidden"); // oculta una confirmación anterior
    return;
  }

  // Simulación de envío (no hay backend en esta entrega)
  successMsg.classList.remove("hidden");
  e.target.reset(); // limpia el formulario
  successMsg.scrollIntoView({ behavior: "smooth", block: "center" });
}

/**
 * Valida un campo obligatorio.
 * @param {HTMLElement} el          campo a validar (input, select o textarea)
 * @param {string} mensajeError     texto que se muestra si falla
 * @param {number} minLen           longitud mínima requerida (1 = no vacío)
 * @returns {boolean} true si es válido
 */
function validarRequerido(el, mensajeError, minLen = 1) {
  const field = el.closest(".field");                 // contenedor del campo
  const errorMsg = field.querySelector(".error-msg"); // espacio para el error
  const valor = el.value.trim(); // trim() ignora espacios al inicio y al final

  if (valor.length < minLen) {
    field.classList.add("error"); // borde magenta definido en style.css
    errorMsg.textContent = mensajeError;
    return false;
  }
  field.classList.remove("error");
  errorMsg.textContent = "";
  return true;
}

/**
 * Valida el correo: que no esté vacío y que tenga formato válido.
 * @param {HTMLElement} el  campo de correo
 * @returns {boolean} true si es válido
 */
function validarCorreo(el) {
  const field = el.closest(".field");
  const errorMsg = field.querySelector(".error-msg");
  const valor = el.value.trim();

  // Expresión regular: algo + "@" + algo + "." + algo, sin espacios.
  // Ej. válido: nombre@dominio.com
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!valor) {
    field.classList.add("error");
    errorMsg.textContent = "Escribe tu correo electrónico.";
    return false;
  }
  if (!regex.test(valor)) {
    field.classList.add("error");
    errorMsg.textContent = "Ingresa un correo válido (ej: nombre@dominio.com).";
    return false;
  }
  field.classList.remove("error");
  errorMsg.textContent = "";
  return true;
}
