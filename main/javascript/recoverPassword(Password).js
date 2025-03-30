import {cargarEstructura, getAbsolutePath} from '../../js/loadTemplate.js';

async function init() {

  document.getElementById("cssStartLink").href = getAbsolutePath("main/css/recoverPassword(Password).css");
  document.getElementById("cssColorsLink").href = getAbsolutePath("colors.css");
  document.getElementById("signInLink").href = getAbsolutePath("main/html/signIn.html");

  await cargarEstructura();
}

// Ejecutar init() dependiendo del estado del DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  await init(); // Si el DOM ya está cargado, ejecutarlo inmediatamente
}
