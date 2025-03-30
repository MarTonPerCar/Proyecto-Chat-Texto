import { cargarEstructura, getAbsolutePath } from '../../js/loadTemplate.js';

async function init() {
  document.getElementById("cssStartLink").href = getAbsolutePath("main/css/start.css");
  document.getElementById("addContact").href = getAbsolutePath("main/html/addContact.html");
  document.getElementById("addGroup").href = getAbsolutePath("main/html/addGroup.html");
  document.getElementById("cssColorsLink").href = getAbsolutePath("colors.css");


  await cargarEstructura();
}

// Ejecutar init() dependiendo del estado del DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  await init(); // Si el DOM ya está cargado, ejecutarlo inmediatamente
}
