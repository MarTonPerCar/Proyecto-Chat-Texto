import { getAbsolutePath } from '../../js/loadTemplate.js';
import { cargarImagenPorId } from '../../js/cargarImagenes.js';

console.log("Header Sign In cargado correctamente");

async function init() {
  // Asignar rutas absolutas a los enlaces y estilos
  document.getElementById("cssHeaderSignInLink").href = getAbsolutePath("Templates/css/headerSignIn.css");

  document.getElementById("indexLink").href = getAbsolutePath("main/html/index.html");
  document.getElementById("startLink").href = getAbsolutePath("main/html/start.html");
  document.getElementById("settingsLink").href = getAbsolutePath("main/html/settings.html");
  document.getElementById("profileLink").href = getAbsolutePath("main/html/profile.html");

  cargarImagenPorId('Main_Icon', 'Main_Icon');
  cargarImagenPorId('Inicio', 'Inicio');
  cargarImagenPorId('Configuracion', 'Configuracion');
  cargarImagenPorId('avatarJpg', 'avatarPng');
}

// Ejecutar init() dependiendo del estado del DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  await init(); // Si el DOM ya está cargado, ejecutarlo inmediatamente
}
