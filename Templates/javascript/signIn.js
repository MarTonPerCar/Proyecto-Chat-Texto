
// Configura el evento submit para el formulario de login
function setupLogin() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) {
    console.error("No se encontró el formulario de inicio de sesión.");
    return;
  }

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    // Se obtienen los inputs por sus nombres
    const emailInput = document.querySelector('[name="email"]');
    const passwordInput = document.querySelector('[name="password"]');

    if (!emailInput || !passwordInput) {
      console.error("No se encontraron los campos de email o password.");
      return;
    }

    const email = emailInput.value;
    const password = passwordInput.value;

    // Se realiza la validación leyendo el archivo db.json
    fetch('db.json')
      .then((response) => response.json())
      .then((data) => {
        const users = data.persona;
        // Se busca el usuario que coincida con el email y contraseña ingresados
        const user = users.find(u => u.email === email && u.contraseña === password);

        if (user) {
          // Credenciales correctas: redirige a la página principal del login
          alert(`¡Bienvenido, ${user.nombre}!`);
          window.location.href = "../../../html/Login/MainPage/start.html";
        } else {
          // Credenciales incorrectas: muestra un mensaje de error
          const errorMessage = document.getElementById('error-message');
          errorMessage.textContent = "Correo o contraseña incorrectos.";
          errorMessage.style.display = "block";
        }
      })
      .catch((err) => console.error("Error al cargar db.json:", err));
  });
}
