<?php 
session_start();
require 'db_connectPage1.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $user_id = $_POST['user_id'];
    $availability = $_POST['availability'];
    $areas = $_POST['areas'];

    if (!$user_id || !$availability || !$areas) {
        echo "error";
        exit();
    }

    $stmt = $conn->prepare("INSERT INTO delivery_agents (user_id, availability, areas) VALUES(?, ?, ?)");
    $stmt->bind_param("iss", $user_id, $availability, $areas);

    if ($stmt->execute()) {
        echo "success";
    } else {
        echo "error";
    }
}
?>