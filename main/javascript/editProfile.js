import { cargarEstructura, getAbsolutePath } from '../../js/loadTemplate.js';

async function init() {
  document.getElementById("cssEditProfile").href = getAbsolutePath("main/css/editProfile.css");
  document.getElementById("changePassword").href = getAbsolutePath("main/html/recoverPassword(Password).html");
  document.getElementById("editProfile").href = getAbsolutePath("main/html/settings.html");


  await cargarEstructura();
}

// Ejecutar init() dependiendo del estado del DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  await init(); // Si el DOM ya está cargado, ejecutarlo inmediatamente
}
