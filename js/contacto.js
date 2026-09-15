// contacto.js — validación básica del formulario de contacto

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("contactForm").addEventListener("submit", manejarEnvio);
});

function manejarEnvio(e) {
  e.preventDefault();

  const nombre = document.getElementById("cNombre");
  const correo = document.getElementById("cCorreo");
  const asunto = document.getElementById("cAsunto");
  const mensaje = document.getElementById("cMensaje");
  let valido = true;

  valido = validarRequerido(nombre, "Escribe tu nombre.") && valido;
  valido = validarCorreo(correo) && valido;
  valido = validarRequerido(asunto, "Selecciona un asunto.") && valido;
  valido = validarRequerido(mensaje, "Escribe tu mensaje.", 10) && valido;

  const successMsg = document.getElementById("successMsg");

  if (!valido) {
    successMsg.classList.add("hidden");
    return;
  }

  // Simulación de envío (no hay backend en esta entrega)
  successMsg.classList.remove("hidden");
  e.target.reset();
  successMsg.scrollIntoView({ behavior: "smooth", block: "center" });
}

function validarRequerido(el, mensajeError, minLen = 1) {
  const field = el.closest(".field");
  const errorMsg = field.querySelector(".error-msg");
  const valor = el.value.trim();

  if (valor.length < minLen) {
    field.classList.add("error");
    errorMsg.textContent = mensajeError;
    return false;
  }
  field.classList.remove("error");
  errorMsg.textContent = "";
  return true;
}

function validarCorreo(el) {
  const field = el.closest(".field");
  const errorMsg = field.querySelector(".error-msg");
  const valor = el.value.trim();
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
