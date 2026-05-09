<?php
// Database connection
$servername = "localhost"; // Change if your database server is different
$username = "root"; // Your database username
$password = ""; // Your database password
$dbname = "student_resource"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Insert absence reason
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $student_id = $_POST['student_id'];
    $reason = $_POST['reason'];

    $stmt = $conn->prepare("INSERT INTO absence_reasons (student_id, reason) VALUES (?, ?)");
    $stmt->bind_param("ss", $student_id, $reason);
    $stmt->execute();
    $stmt->close();
}

$conn->close();
?>
