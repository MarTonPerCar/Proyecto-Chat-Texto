import { cargarEstructura, getAbsolutePath } from '../../js/loadTemplate.js';

async function init() {
  document.getElementById("cssRegisterLink").href = getAbsolutePath("main/css/register.css");
  document.getElementById("signIn").href = getAbsolutePath("main/html/signIn.html");

  await cargarEstructura();

  // Asignar listener al botón de registro
  document.getElementById("btn-registrar").addEventListener("click", function(event) {
    event.preventDefault(); // Prevenir comportamiento por defecto
    if (validateRegistrationForm()) {
      registrarUsuario();
      const urlDestino = getAbsolutePath("main/html/signIn.html");
      console.log("Redirigiendo a:", urlDestino);
      window.location.href = urlDestino;
    }
  });
}

// Ejecutar init() dependiendo del estado del DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  await init();
}

// Función para registrar usuario y actualizar JSON en LocalStorage
function registrarUsuario() {
  // Obtener valores de los inputs
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const name = document.getElementById("name").value.trim();
  const surname = document.getElementById("surname").value.trim();
  const phone = document.getElementById("phonenumber").value.trim();

  // Obtener datos existentes o crear un array vacío
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Verificar que el usuario no exista ya
  if (usuarios.some(user => user.email === email)) {
    alert("Este email ya está registrado.");
    return;
  }

  // Crear el nuevo usuario
  const nuevoUsuario = {
    email,
    password,
    name,
    surname,
    phone,
    agenda: "", // Se puede actualizar después
    link: []
  };

  // Agregar usuario a la lista
  usuarios.push(nuevoUsuario);

  // Guardar en LocalStorage
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  console.log("Usuario registrado:", nuevoUsuario);
}

// Función para descargar el JSON actualizado
function descargarJSON() {
  const usuarios = localStorage.getItem('usuarios') || "[]";
  const blob = new Blob([usuarios], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = 'usuarios.json';
  document.body.appendChild(enlace);
  enlace.click();

  document.body.removeChild(enlace);
  URL.revokeObjectURL(url);
}

// Función de validación del formulario
function validateRegistrationForm() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const repeatPassword = document.getElementById("repeat-password");
  const nameField = document.getElementById("name");
  const surname = document.getElementById("surname");
  const phone = document.getElementById("phonenumber");

  let isValid = true;
  let errors = [];

  if (!email || email.value.trim() === "") {
    isValid = false;
    errors.push("El email es obligatorio.");
  } else if (!validateEmail(email.value.trim())) {
    isValid = false;
    errors.push("El formato del email no es válido.");
  }

  if (!password || password.value.trim() === "") {
    isValid = false;
    errors.push("La contraseña es obligatoria.");
  } else if (password.value.trim().length < 8) {
    isValid = false;
    errors.push("La contraseña debe tener al menos 8 caracteres.");
  }

  if (!repeatPassword || repeatPassword.value.trim() === "") {
    isValid = false;
    errors.push("Debes repetir la contraseña.");
  } else if (password.value.trim() !== repeatPassword.value.trim()) {
    isValid = false;
    errors.push("Las contraseñas no coinciden.");
  }

  if (!nameField || nameField.value.trim() === "") {
    isValid = false;
    errors.push("El nombre es obligatorio.");
  }

  if (!surname || surname.value.trim() === "") {
    isValid = false;
    errors.push("El apellido es obligatorio.");
  }

  if (!phone || phone.value.trim() === "") {
    isValid = false;
    errors.push("El número de teléfono es obligatorio.");
  } else if (!validatePhone(phone.value.trim())) {
    isValid = false;
    errors.push("El número de teléfono no es válido.");
  }

  if (!isValid) {
    alert(errors.join("\n"));
    return false;
  }
  return true;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^\+?\d{7,15}$/;
  return re.test(phone);
}
