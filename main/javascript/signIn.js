import { cargarEstructura, getAbsolutePath } from '../../js/loadTemplate.js';

async function init() {
  document.getElementById("cssLink").href = getAbsolutePath("main/css/signIn.css");
  document.getElementById("startLink").href = getAbsolutePath("main/html/start.html");
  document.getElementById("recoverPasswordEmail").href = getAbsolutePath("main/html/recoverPassword(Email).html");
  await cargarEstructura();
}

// Ejecutar init() dependiendo del estado del DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  await init(); // Si el DOM ya está cargado, ejecutarlo inmediatamente
}

