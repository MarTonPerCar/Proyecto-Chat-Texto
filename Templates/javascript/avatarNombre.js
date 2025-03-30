import { getAbsolutePath } from '../../js/loadTemplate.js';
import { cargarImagenPorId } from '../../js/cargarImagenes.js';

async function init() {
  cargarImagenPorId('avatarPng', 'avatarPng');
  document.getElementById("cssAvatarNombreLink").href = getAbsolutePath("Templates/css/avatarNombre.css");
  document.getElementById("indexLink").href = getAbsolutePath("main/html/index.html");
}

// Ejecutar init() dependiendo del estado del DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  await init(); // Si el DOM ya está cargado, ejecutarlo inmediatamente
}
