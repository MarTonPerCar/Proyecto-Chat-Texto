import { getAbsolutePath } from '../../js/loadTemplate.js';
import { cargarImagenPorId } from '../../js/cargarImagenes.js';

async function init() {
  cargarImagenPorId('Logo', 'Logo');
  cargarImagenPorId('Instagram', 'Instagram');
  document.getElementById("cssFooterLink").href = getAbsolutePath("Templates/css/footer.css");
  document.getElementById("indexLink").href = getAbsolutePath("main/html/index.html");



}

// Ejecutar init() dependiendo del estado del DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  await init(); // Si el DOM ya está cargado, ejecutarlo inmediatamente
}
