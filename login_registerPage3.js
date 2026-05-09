// Function to show the login form
function showLogin() {
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('login-toggle').classList.add('active');
  document.getElementById('register-toggle').classList.remove('active');
}

// Function to show the register form
function showRegister() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'block';
  document.getElementById('register-toggle').classList.add('active');
  document.getElementById('login-toggle').classList.remove('active');
}

// Handle login form submission
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Simulate a login request (replace with actual AJAX call)
  if (email && password) {
    document.getElementById('login-message').textContent = "Login successful!"; // Replace with actual response handling
  } else {
    document.getElementById('login-message').textContent = "Please fill in all fields.";
  }
}

// Handle register form submission
function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  // Simulate a registration request (replace with actual AJAX call)
  if (name && email && password) {
    document.getElementById('register-message').textContent = "Registration successful!"; // Replace with actual response handling
  } else {
    document.getElementById('register-message').textContent = "Please fill in all fields.";
  }
}

// Show the login form by default
document.addEventListener('DOMContentLoaded', showLogin);

//Toggle Login Password
document.addEventListener('DOMContentLoaded', () => {
  const loginCheckbox = document.getElementById('show-login-password');
  const loginPassword = document.getElementById('login-password');

  if (loginCheckbox) {
    loginCheckbox.addEventListener('change', () => {
      loginPassword.type = loginCheckbox.checked ? 'text' : 'password';
    });
  }

  //Toggle Register password
  const registerCheckbox = document.getElementById('show-register-password');
  const registerPassword = document.getElementById('register-password');

  if (registerCheckbox) {
    registerCheckbox.addEventListener('change', () => {
      registerPassword.type = registerCheckbox.checked ? 'text' : 'password';
    });
  }
});
