import { cargarEstructura, getAbsolutePath } from '../../js/loadTemplate.js';

console.log("Arriba España");

async function init() {
  document.getElementById("cssHeaderLink").href = getAbsolutePath("Templates/css/header.css");
  document.getElementById("indexLink").href = getAbsolutePath("main/html/index.html");
  document.getElementById("signInLink").href = getAbsolutePath("main/html/signIn.html");
  document.getElementById("registerLink").href = getAbsolutePath("main/html/register.html");
}

// Ejecutar init() dependiendo del estado del DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  await init(); // Si el DOM ya está cargado, ejecutarlo inmediatamente
}
