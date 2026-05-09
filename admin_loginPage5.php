<?php
session_start();

// Database connection
$servername = "localhost"; // Change if necessary
$username = "root"; // Change to your database username
$password = ""; // Change to your database password
$dbname = "student_resource"; // Change to your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $username = trim($_POST['username']);
    $password = $_POST['password'];

    // Prepare and bind
    $stmt = $conn->prepare("SELECT id, name, password FROM admin_users WHERE username = ?");

    if (!$stmt) {
        die("SQL Error: " . $conn->error);
    }

    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    // Check if the user exists
    if ($stmt->num_rows > 0) {

        $stmt->bind_result($admin_id, $admin_name, $hashed_password);
        $stmt->fetch();

        // Verify the password
        if (password_verify($password, $hashed_password)) {

            //Session variables
            $_SESSION['admin_id'] = $admin_id;
            $_SESSION['admin_name'] = $admin_name;

            header("Location: admin_dashboardPage6.php");
            exit();
        } else {
            echo "<script>
                        alert('Invalid Password!');
                        window.location.href='admin_login_registerPage5.html';
                  </script>";
        }
        } else {
            echo "<script>
                        alert('No Admin Found!');
                        window.location.href='admin_login_registerPage5.html';
                  </script>";
        }

    // Close the statement and connection
    $stmt->close();
    }

$conn->close();
?>