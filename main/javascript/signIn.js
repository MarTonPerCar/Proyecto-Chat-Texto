import { cargarEstructura, getAbsolutePath } from '../../js/loadTemplate.js';

async function init() {

  console.log(getAbsolutePath("main/css/signIn.css"));
  console.log(getAbsolutePath("colors.css"));

  document.getElementById("cssLink").href = getAbsolutePath("main/css/signIn.css");


  document.getElementById("startLink").href = getAbsolutePath("main/html/start.html");
  document.getElementById("recoverPasswordEmail").href = getAbsolutePath("main/html/recoverPassword(Email).html");
  await cargarEstructura();


  document.getElementById("startLink").addEventListener("click", async () => {
    await login();
  });
}

// Función para verificar si el usuario y contraseña son correctos usando fetch
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Cargar los usuarios simulados desde el JSON usando fetch
    const usuarios = await cargarUsuarios();

    // Verificar si los datos coinciden
    const usuario = usuarios.find(u => u.email === email && u.password === password);

    if (usuario) {
      alert("¡Inicio de sesión exitoso!");
      // Redirigir a la página principal o continuar con el flujo
      window.location.href = getAbsolutePath("main/html/start.html");
    } else {
      alert("Email o contraseña incorrectos.");
    }
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
    alert("Hubo un error al intentar verificar los datos. Inténtalo más tarde.");
  }
}

// Función para cargar el JSON simulado usando fetch
async function cargarUsuarios() {
  const response = await fetch(getAbsolutePath("json/usuarios.json"));

  // Verificar si la respuesta es exitosa
  if (!response.ok) {
    throw new Error("No se pudo obtener el archivo de usuarios.");
  }

  // Devolver los usuarios como un objeto JSON
  return await response.json();
}

// Ejecutar init() dependiendo del estado del DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  await init(); // Si el DOM ya está cargado, ejecutarlo inmediatamente
}
