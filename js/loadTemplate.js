export async function cargarEstructura() {
  // HEADER
  if (document.getElementById('header')) {
    await cargarTemplate('/Templates/html/header.html', 'header', 'Templates/javascript/header.js');
  }
  if (document.getElementById('header-sign-in')) {
    await cargarTemplate('/Templates/html/Header_Sign_In.html', 'header-sign-in');
  }

  // FOOTER
  if (document.getElementById('footer')) {
    await cargarTemplate('/Templates/html/footer.html', 'footer');
  }
  if (document.getElementById('footer-mainpage')) {
    await cargarTemplate('/Templates/html/footer_main_page.html', 'footer-mainpage');
  }

  // AVATAR / CONVERSATIONS
  if (document.getElementById('avatar-nombre')) {
    await cargarTemplate('/Templates/html/avatarNombre.html', 'avatar-nombre');
  }
  if (document.getElementById('conversations')) {
    await cargarTemplate('/Templates/html/conversations.html', 'conversations');
  }

  // MENSAJES Y GRUPOS
  if (document.getElementById('mensaje-grupo')) {
    await cargarTemplate('/Templates/html/mensajeGrupo.html', 'mensaje-grupo');
  }
  if (document.getElementById('mensajes')) {
    await cargarTemplate('/Templates/html/menssages.html', 'mensajes');
  }

  // NOT CHANGEABLE TEXT
  if (document.getElementById('not-changeable-text-email')) {
    await cargarTemplate('/Templates/html/notChangeableText (Email).html', 'not-changeable-text-email');
  }
  if (document.getElementById('not-changeable-text-phonenumber')) {
    await cargarTemplate('/Templates/html/notChangeableText (Phonenumber).html', 'not-changeable-text-phonenumber');
  }
  if (document.getElementById('not-changeable-text-state')) {
    await cargarTemplate('/Templates/html/notChangeableText (State).html', 'not-changeable-text-state');
  }

  // REQUEST
  if (document.getElementById('request-email')) {
    await cargarTemplate('/Templates/html/request (Email).html', 'request-email');
  }
  if (document.getElementById('request-font-size')) {
    await cargarTemplate('/Templates/html/request (Font size).html', 'request-font-size');
  }
  if (document.getElementById('request-name')) {
    await cargarTemplate('/Templates/html/request (Name).html', 'request-name');
  }
  if (document.getElementById('request-password')) {
    await cargarTemplate('/Templates/html/request (Password).html', 'request-password');
  }
  if (document.getElementById('request-phonenumber')) {
    await cargarTemplate('/Templates/html/request (PhoneNumber).html', 'request-phonenumber');
  }
  if (document.getElementById('request-repeat-password')) {
    await cargarTemplate('/Templates/html/request (RepeatPassword).html', 'request-repeat-password');
  }
  if (document.getElementById('request-surname')) {
    await cargarTemplate('/Templates/html/request (Surname).html', 'request-surname');
  }

  // REQUEST SELECTOR
  if (document.getElementById('request-selector-language')) {
    await cargarTemplate('/Templates/html/requestSelector (Language).html', 'request-selector-language');
  }
  if (document.getElementById('request-selector-theme')) {
    await cargarTemplate('/Templates/html/requestSelector (Theme).html', 'request-selector-theme');
  }
}

// --------------------------------------------------------------------------

function getProjectBase() {
  let pathParts = window.location.pathname.split('/').filter(p => p !== ""); // Filtra partes vacías
  if (pathParts.length > 1) {
    return window.location.origin + "/" + pathParts[0] + "/"; // Detecta la carpeta raíz
  } else {
    return window.location.origin + "/"; // Si está en la raíz del servidor
  }
}

export function getAbsolutePath(relativePath) {
  return getProjectBase() + relativePath.replace(/^\/+/, ''); // Evita dobles barras "//"
}

// --------------------------------------------------------------------------

async function cargarTemplate(url, id, scriptPath = "") {
  console.log(`Cargando ${url} en ${id}`);

  let response = await fetch(url);
  document.getElementById(id).innerHTML = await response.text();

  // Si scriptPath NO es 0, cargar y ejecutar el script
  if (scriptPath !== "") {
    cargarScript(scriptPath);
  }
}

// Función para cargar un script dinámicamente si es necesario
function cargarScript(scriptPath) {
  let script = document.createElement("script");
  script.src = getAbsolutePath(scriptPath); // Convierte la ruta en absoluta
  script.async = false; // Mantener el orden de ejecución
  script.type = "module";
  document.body.appendChild(script);
  console.log(`Ejecutando script: ${script.src}`);
}
