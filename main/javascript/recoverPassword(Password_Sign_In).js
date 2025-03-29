import { cargarEstructura, getAbsolutePath } from '../../js/loadTemplate.js';

async function init() {
  document.getElementById("cssRecoverLink").href = getAbsolutePath("main/css/recoverPassword(Password_Sign_In).css");
  document.getElementById("signIn").href = getAbsolutePath("main/html/signIn.html");
  document.getElementById("cssColorsLink").href = getAbsolutePath("colors.css");

  await cargarEstructura();
}

// Ejecutar init() dependiendo del estado del DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  await init(); // Si el DOM ya está cargado, ejecutarlo inmediatamente
}
