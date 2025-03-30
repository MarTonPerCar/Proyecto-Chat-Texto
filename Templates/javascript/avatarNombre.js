import { getAbsolutePath } from '../../js/loadTemplate.js';
import { cargarImagenPorId } from '../../js/cargarImagenes.js';

async function init() {

  document.getElementById("cssAvatarNombreLink").href = getAbsolutePath("Templates/css/avatarNombre.css");
  document.getElementById("cssColorsLink").href = getAbsolutePath("colors.css");
  cargarImagenPorId('avatarPng', 'avatarPng');
}

// Ejecutar init() dependiendo del estado del DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  await init(); // Si el DOM ya está cargado, ejecutarlo inmediatamente
}
