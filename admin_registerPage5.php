<?php
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
    $name = $_POST['name'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Check if passwords match
    if ($password !== $confirm_password) {
        echo "<script>
                alert('Passwords do not match!');
                window.location.href = 'admin_login_registerPage5.html';
            </script>";
        exit();
    }

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO admin_users (name, username, password) VALUES (?, ?, ?)");

    // Check prepare
    if (!$stmt) {
        die("SQL Error: " . $conn->error);
    }

    $stmt->bind_param("sss", $name, $username, $hashed_password);

    // Execute the statement
    if ($stmt->execute()) {
        echo "<script>
                alert('Successfully Registered!');
                window.location.href = 'admin_login_registerPage5.html';
                </script>";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement and connection
    $stmt->close();
    }   
    
$conn->close();
?>
