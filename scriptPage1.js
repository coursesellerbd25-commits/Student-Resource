// JavaScript to toggle password visibility
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.tab');
  const forms = document.querySelectorAll('.auth-form');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs and forms
      tabs.forEach(t => t.classList.remove('active'));
      forms.forEach(f => {
        f.classList.remove('active');
        f.style.display = 'none'; // Hide the form immediately
      });
      
      // Add active class to clicked tab and corresponding form
      this.classList.add('active');
      const formId = this.dataset.tab + '-form';
      const activeForm = document.getElementById(formId);
      activeForm.style.display = 'block'; // Show the form
      setTimeout(() => activeForm.classList.add('active'), 50); // Slightly longer delay for smoother transition
    });
  });

  // Toggle password visibility for login
  const loginPassword = document.getElementById('login-password');
  const showLoginPassword = document.getElementById('show-login-password');
  showLoginPassword.addEventListener('change', function() {
    loginPassword.type = this.checked ? 'text' : 'password';
  });

  // Toggle password visibility for registration
  const registerPassword = document.getElementById('register-password');
  const showRegisterPassword = document.getElementById('show-register-password');
  showRegisterPassword.addEventListener('change', function() {
    registerPassword.type = this.checked ? 'text' : 'password';
  });
});
