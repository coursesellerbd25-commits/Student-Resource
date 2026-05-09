<?php 
$host = "localhost";
$user = "root";
$pass = "";
$db = "student_resource";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$title = $_POST['title'];
$type = $_POST['type'];
$description = $_POST['learn'];
$deadline = $_POST['deadline'];

$stmt = $conn->prepare("INSERT INTO studentactivities (title, type, description, deadline) VALUES (?, ?, ?, ?)");

if (!$stmt) {
    die($conn->error);
}

$stmt->bind_param("ssss", $title, $type, $description, $deadline);

if($stmt->execute()) {
    echo "success";
} else {
    echo "error";
}

$stmt->close();
$conn->close();
?>