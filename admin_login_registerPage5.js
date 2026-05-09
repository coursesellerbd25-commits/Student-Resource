// Function to toggle between login and register forms
function toggleForms() {
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const loginToggle = document.getElementById('login-toggle');
    const registerToggle = document.getElementById('register-toggle');

    if (loginSection.classList.contains('active')) {
        loginSection.classList.remove('active');
        registerSection.classList.add('active');
        loginToggle.classList.remove('active');
        registerToggle.classList.add('active');
    } else {
        registerSection.classList.remove('active');
        loginSection.classList.add('active');
        registerToggle.classList.remove('active');
        loginToggle.classList.add('active');
    }
}

// Event listeners for toggle buttons
document.getElementById('login-toggle').addEventListener('click', toggleForms);
document.getElementById('register-toggle').addEventListener('click', toggleForms);

// Show the login form by default on page load
window.onload = function() {
    document.getElementById('login-section').classList.add('active');
};

// Show/Hide login password
document.getElementById('show-login-password').addEventListener('change', function () {
    const passwordInput = document.getElementById('login-password');
    passwordInput.type = this.checked ? 'text' : 'password';
});

// Show/Hide register password
document.getElementById('show-register-password').addEventListener('change', function () {
    const passwordInput = document.getElementById('register-password');
    passwordInput.type = this.checked ? 'text' : 'password';
});

// Show/Hide confirm password
document.getElementById('show-confirm-password').addEventListener('change', function () {
    const passwordInput = document.getElementById('register-confirm-password');
    passwordInput.type = this.checked ? 'text' : 'password';
});

// Reset data functionality for the register form
document.getElementById('reset-data').addEventListener('click', function() {
    document.getElementById('register-form').reset();
});
