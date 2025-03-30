import { cargarEstructura, getAbsolutePath } from '../../js/loadTemplate.js';
import { cargarImagenPorId } from '../../js/cargarImagenes.js';

async function init() {
  cargarImagenPorId('avatarPng', 'avatarPng');
  cargarImagenPorId('avatarPng1', 'avatarPng');
  cargarImagenPorId('avatarPng2', 'avatarPng');
  cargarImagenPorId('avatarPng3', 'avatarPng');
  document.getElementById("cssAddGroup").href = getAbsolutePath("main/css/addGroup.css");
  document.getElementById("startLink").href = getAbsolutePath("main/html/start.html");
  document.getElementById("startLink2").href = getAbsolutePath("main/html/start.html");
  document.getElementById("cssColorsLink").href = getAbsolutePath("colors.css");



  await cargarEstructura();
}

// Ejecutar init() dependiendo del estado del DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  await init(); // Si el DOM ya está cargado, ejecutarlo inmediatamente
}
