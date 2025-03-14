import { cargarEstructura, getAbsolutePath } from '../../js/loadTemplate.js';

console.log("Profile Page cargada correctamente");

async function init() {
  // Asignar ruta absoluta al CSS de profile
  document.getElementById("cssProfileLink").href = getAbsolutePath("main/css/profile.css");

  await cargarEstructura();
}

// Ejecutar init() dependiendo del estado del DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  await init(); // Si el DOM ya está cargado, ejecutarlo inmediatamente
}
