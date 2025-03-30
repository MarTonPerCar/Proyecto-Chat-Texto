export async function cargarEstructura() {
  // HEADER
  if (document.getElementById('header')) {
    await cargarTemplate('/Templates/html/header.html', 'header', 'Templates/javascript/header.js');
  }
  if (document.getElementById('header-sign-in')) {
    await cargarTemplate('/Templates/html/headerSignIn.html', 'header-sign-in', 'Templates/javascript/headerSignIn.js');
  }

  // FOOTER
  if (document.getElementById('footer')) {
    await cargarTemplate('/Templates/html/footer.html', 'footer', 'Templates/javascript/footer.js');
  }
  if (document.getElementById('footer-mainpage')) {
    await cargarTemplate('/Templates/html/footer_main_page.html', 'footer-mainpage');
  }

  // AVATAR / CONVERSATIONS
  if (document.getElementById('avatar-nombre')) {
    await cargarTemplate('/Templates/html/avatarNombre.html', 'avatar-nombre');
  }
  if (document.getElementById('conversations')) {
    await cargarTemplate('/Templates/html/conversations.html', 'conversations', 'Templates/javascript/conversations.js');
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
    await cargarElementoDinamico("notChangeableText", "NCT-email", "not-changeable-text-email");
  }
  if (document.getElementById('not-changeable-text-phonenumber')) {
    await cargarElementoDinamico("notChangeableText", "NCT-phonenumber", "not-changeable-text-phonenumber");
  }
  if (document.getElementById('not-changeable-text-state')) {
    await cargarElementoDinamico("notChangeableText", "NCT-state", "not-changeable-text-state");
  }

// REQUEST
  if (document.getElementById('request-email')) {
    await cargarElementoDinamico("request", "email", "request-email");
  }
  if (document.getElementById('request-font-size')) {
    await cargarElementoDinamico("request", "font-size", "request-font-size");
  }
  if (document.getElementById('request-name')) {
    await cargarElementoDinamico("request", "name", "request-name");
  }
  if (document.getElementById('request-password')) {
    await cargarElementoDinamico("request", "password", "request-password");
  }
  if (document.getElementById('request-phonenumber')) {
    await cargarElementoDinamico("request", "phonenumber", "request-phonenumber");
  }
  if (document.getElementById('request-repeat-password')) {
    await cargarElementoDinamico("request", "repeat-password", "request-repeat-password");
  }
  if (document.getElementById('request-surname')) {
    await cargarElementoDinamico("request", "surname", "request-surname");
  }

// REQUEST SELECTOR
  if (document.getElementById('request-selector-language')) {
    await cargarElementoDinamico("requestSelector", "language", "request-selector-language");
  }
  if (document.getElementById('request-selector-theme')) {
    await cargarElementoDinamico("requestSelector", "theme", "request-selector-theme");
  }


}

// --------------------------------------------------------------------------

function getProjectBase() {
  let pathParts = window.location.pathname.split('/').filter(p => p !== ""); // Filtra partes vacías
  if (pathParts.length > 1) {
    return window.location.origin + "/" + pathParts[0] + "/"; // Detecta la carpeta raíz
  } else {
    return window.location.origin; // Si está en la raíz del servidor
  }
}

export function getAbsolutePath(relativePath) {
  console.log("Cargando", relativePath);
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

//  --------------------------------------------------------------------------

async function cargarElementoDinamico(tipo, clave, id) {
  const jsonURL = getAbsolutePath("json/templates.json"); // Ruta del JSON
  let jsonData = await fetch(jsonURL).then(res => res.json());

  let data = jsonData[clave];
  if (!data) {
    console.error(`⚠ No se encontró información en el JSON para "${clave}"`);
    return;
  }

  let templateURL = "";
  switch (tipo) {
    case "request":
      templateURL = "/Templates/html/request.html";
      break;
    case "notChangeableText":
      templateURL = "/Templates/html/notChangeableText.html";
      break;
    case "requestSelector":
      templateURL = "/Templates/html/requestSelector.html";
      break;
    default:
      console.error(`⚠ Tipo "${tipo}" no reconocido`);
      return;
  }

  let response = await fetch(templateURL);
  let templateHTML = await response.text();

  // Reemplazar los valores en el template con los del JSON
  templateHTML = reemplazarValores(templateHTML, tipo, data);

  // Insertar en el HTML dentro del contenedor con id proporcionado
  let container = document.getElementById(id);
  if (!container) {
    console.error(`⚠ No se encontró un contenedor con id="${id}"`);
    return;
  }
  container.innerHTML = templateHTML;
}


function reemplazarValores(templateHTML, tipo, data) {
  switch (tipo) {
    case "request":
      return templateHTML
        .replace(/Label/g, data.label || "Texto genérico") // Label
        .replace(/id="formInput"/g, `id="${data.nameID || "default-id"}"`) // ID
        .replace(/type="text"/g, `type="${data.type || "text"}"`) // Tipo del input
        .replace(/placeholder="Placeholder"/g, `placeholder="${data.placeholder || ""}"`) // Placeholder
        .replace(/pattern=""/g, `pattern="${data.patron || ".*"}"`); // Patrón de validación

    case "notChangeableText":
      return templateHTML
        .replace(/Lorem Ipsum Placeholder/g, data.placeholder || "")
        .replace(/Lorem Ipsum Valor/g, data.valor || "");

    case "requestSelector":
      const optionsHTML = (data.opciones || [])
        .map(option => `<option value="${option}">${option}</option>`)
        .join("");

      return templateHTML
        .replace(/Lorem Ipsum Label/g, data.label || "")
        .replace(/select-class/g, data.class || "")
        .replace(/generic-select/g, data.name || "")
        .replace(/placeholder="Lorem Ipsum"/g, `placeholder="${data.placeholder || ""}"`)
        .replace(/<option value="option1">Opción 1<\/option>\s*<option value="option2">Opción 2<\/option>/g, optionsHTML);

    default:
      return templateHTML;
  }
}
