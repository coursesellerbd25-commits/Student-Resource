<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
require 'db_connectPage1.php';

//Check DB connection
if ($conn->connect_error) {
    die("Database Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    //Get & sanitize inputs
    $fullname = htmlspecialchars(trim($_POST['fullname']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['register_error'] = "Invalid email format";
        header("Location: indexPage1.php");
        exit();
    }

    // Check if passwords match
    if ($password !== $confirm_password) {
        $_SESSION['register_error'] = "Passwords do not match";
        header("Location: indexPage1.php");
        exit();
    }

    //Check if email already exists
    $checkStmt = $conn->prepare("SELECT id FROM studentusers WHERE email = ?");

    if (!$checkStmt) {
        die("Prepare failed: " . $conn->error);
    }

    $checkStmt->bind_param("s", $email);
    $checkStmt->execute();
    $checkStmt->store_result();

    if($checkStmt->num_rows > 0) {
        $_SESSION['register_error'] = "Email already exists";
        header("Location: indexPage1.php");
        exit();
    }

    // Hash password
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    //Insert User
    $stmt = $conn->prepare("INSERT INTO studentusers (fullname, email, password_hash) VALUES (?, ?, ?)");

    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("sss", $fullname, $email, $password_hash);
    
    if ($stmt->execute()) {
        $_SESSION['registration_success'] = "Registration Successful!";
        header("Location: indexPage1.php");
        exit();
    } else {
        $_SESSION['register_error'] = "Something went wrong. Try again.";
        header("Location: indexPage1.php");
        exit();
    }
}
?>
