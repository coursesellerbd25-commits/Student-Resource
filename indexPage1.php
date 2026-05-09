<?php
session_start();

if (isset($_SESSION['registration_success'])) {
  echo "<script>alert('Registration successful!');</script>";
  unset($_SESSION['registration_success']);
}

if (isset($_SESSION['register_error'])) {
  echo "<script>alert('" . $_SESSION['register_error'] . "');</script>";
  unset($_SESSION['register_error']);
}

if (isset($_SESSION['login_error'])) {
  echo "<script>alert('" . $_SESSION['login_error'] . "');</script>";
  unset($_SESSION['login_error']);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IIUC Student Resource Portal</title>
  <link rel="stylesheet" href="stylesPage1.css">
</head>
<body>
  <div class="auth-container">
    <div class="auth-tabs">
      <button class="tab active" data-tab="login">Login</button>
      <button class="tab" data-tab="register">Register</button>
    </div>
    
    <form id="login-form" class="auth-form active" method="post" action="process_loginPage1.php">
      <h2>Student Login</h2>
      <div class="error-message" id="login-error"></div>
      <input type="email" name="email" placeholder="IIUC Email (e.g: student@iiuc.edu)" required>
      <div class="password-wrapper">
        <input type="password" id="login-password" name="password" placeholder="Password" required minlength="8" title="Password must be at least 8 characters">
        <div class="password-toggle">
          <input type="checkbox" id="show-login-password">
          <label for="show-login-password">See</label>
        </div>
      </div>
      <div class="remember-me">
        <input type="checkbox" id="remember" name="remember" value="1">
        <label for="remember">Remember me</label>
      </div>
      <button type="submit" name="login">Login</button>
      <div class="forgot-password">
        <a href="forgot_passwordPage1.php">Forgot password?</a>
      </div>
    </form>
    
    <form id="register-form" class="auth-form" method="post" action="process_registerPage1.php">
      <div class="db-notice">
        All data secured in MySQL (v8.0+)  
        <span class="db-status"><?php echo isset($db_connected) ? 'Connected' : 'Connecting...'; ?></span>
      </div>
      <h2>Create Account</h2>
      <div class="error-message" id="register-error"></div>
      <input type="text" name="fullname" placeholder="Full Name" required>
      <input type="email" name="email" placeholder="IIUC Email (e.g: student@iiuc.edu)" required>
      <div class="password-wrapper">
        <input type="password" id="register-password" name="password" placeholder="Create Password (min 8 characters)" required minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}">
        <div class="password-toggle">
          <input type="checkbox" id="show-register-password">
          <label for="show-register-password">See</label>
        </div>
      </div>
      <input type="password" name="confirm_password" placeholder="Confirm Password" required>
      <button type="submit" name="register">Register</button>
    </form>
  </div>
  
  <script src="scriptPage1.js"></script>
</body>
</html>
