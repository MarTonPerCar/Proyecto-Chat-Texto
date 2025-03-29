import { cargarEstructura, getAbsolutePath } from '../../js/loadTemplate.js';

async function init() {
  document.getElementById("cssRecoverPasswordLink").href = getAbsolutePath("main/css/recoverPassword(Email).css");
  document.getElementById("changePassword").href = getAbsolutePath("main/html/recoverPassword(Password).html");
  document.getElementById("cssColorsLink").href = getAbsolutePath("colors.css");


  await cargarEstructura();
}

// Ejecutar init() dependiendo del estado del DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  await init(); // Si el DOM ya está cargado, ejecutarlo inmediatamente
}
