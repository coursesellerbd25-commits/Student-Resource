<?php
// Database connection
$servername = "localhost"; // Change if necessary
$username = "root"; // Your database username
$password = ""; // Your database password
$dbname = "student_resource"; // Your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle registration
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['register'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash the password

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO teacher_login_register (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $password);

    if ($stmt->execute()) {
        echo "<script>
                alert('Successfully Registered!');
                window.location.href='login_registerPage3.php';
              </script>";
    } else {
        echo "<script>
                alert('Error: Email may already exists!');
                </script>";
    }

    $stmt->close();
}

// Handle login
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['login'])) {
  session_start();

    $email = $_POST['email'];
    $password = $_POST['password'];

    // Prepare and bind
    $stmt = $conn->prepare("SELECT id, password FROM teacher_login_register WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $hashed_password);
        $stmt->fetch();
        
        // Verify the password
        if (password_verify($password, $hashed_password)) {
            $_SESSION['teacher_id'] = $id;

            header("Location: teacherDashboardPage4.php");
            exit();

            // Start session and redirect to dashboard or home page
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "No user found with that email.";
    }

    $stmt->close();
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Teacher Login/Register</title>
  <link rel="stylesheet" href="login_registerPage3.css">
</head>
<body>
  <div class="container">
    <h1>Teacher Portal</h1>
    <div class="form-container">
      <div class="form-toggle">
        <button id="login-toggle" onclick="showLogin()">Login</button>
        <button id="register-toggle" onclick="showRegister()">Register</button>
      </div>

      <!-- Login Form -->
      <form id="login-form" class="form" action="login_registerPage3.php" method="POST">

        <h2>Login</h2>

        <label for="login-email">Email:</label>
        <input type="email" name="email" required><br>

        <label for="register-id">ID:</label>
        <input type="text" name="id" id="login-id" required><br>

        <label for="login-password">Password:</label>
        <input type="password" id= "login-password" name="password" required>
          <div class="password-toggle">
            <input type="checkbox" id="show-login-password">
            <label for="show-login-password">See Password</label>
          </div>

        <button type="submit" name="login">Login</button>

        <div id="login-message" class="form-message"></div>
      </form>

      <!-- Register Form -->
      <form id="register-form" class="form" action="login_registerPage3.php" method="POST" style="display: none;">

        <h2>Register</h2>

        <label for="register-name">Name:</label>
        <input type="text" name="name" required><br>

        <label for="register-id">ID:</label>
        <input type="text" name="id" id="register-id" required><br>

        <label for="register-email">Email:</label>
        <input type="email" name="email" required><br>

        <label for="register-password">Password:</label>
        <input type="password" id="register-password" name="password" required>
          <div class="password-toggle">
            <input type="checkbox" id="show-register-password">
            <label for="show-register-password">See Password</label>
          </div>

        <button type="submit" name="register">Register</button>

        <div id="register-message" class="form-message"><br></div>
      </form>
    </div>
  </div>

  <script src="login_registerPage3.js"></script>
</body>
</html>
