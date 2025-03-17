import { cargarEstructura, getAbsolutePath } from '../../js/loadTemplate.js';

async function init() {
  document.getElementById("cssAddGroup").href = getAbsolutePath("main/css/addGroup.css");
  document.getElementById("startLink").href = getAbsolutePath("main/html/start.html");
  document.getElementById("startLink2").href = getAbsolutePath("main/html/start.html");


  await cargarEstructura();
}

// Ejecutar init() dependiendo del estado del DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  await init(); // Si el DOM ya está cargado, ejecutarlo inmediatamente
}
