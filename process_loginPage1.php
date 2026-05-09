<?php
session_start();
require 'db_connectPage1.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['login_error'] = "Invalid email format";
        header("Location: indexPage1.php");
        exit();
    }

    $stmt = $conn->prepare("SELECT * FROM studentusers WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user['password_hash'])) {

            $_SESSION['user_id'] = $user['id'];

            header("Location: dashboardPage2.php");
            exit();
        }
    }

    $_SESSION['login_error'] = "Invalid email or password";
    header("Location: indexPage1.php");
    exit();
}
?>
