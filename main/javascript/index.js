import { cargarEstructura, getAbsolutePath } from '../../js/loadTemplate.js';
import { cargarImagenPorId } from '../../js/cargarImagenes.js';

async function init() {
  document.getElementById("cssLink").href = getAbsolutePath("main/css/index.css");
  document.getElementById("cssColorsLink").href = getAbsolutePath("colors.css");
  await cargarEstructura();

  cargarImagenPorId("fullLogo", "fullLogo");
}

// Ejecutar init() dependiendo del estado del DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  await init(); // Si el DOM ya está cargado, ejecutarlo inmediatamente
}
