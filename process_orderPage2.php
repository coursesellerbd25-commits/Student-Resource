<?php 
session_start();
require 'db_connectPage1.php';

if (!isset($_SESSION['user_id'])) {
    exit("Unauthorized");
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id = $_SESSION['user_id'];

    //Collect form data
    $order = trim($_POST['order']);
    $orderFrom = trim($_POST['orderFrom']);
    $receiveAt = trim($_POST['receiveAt']);
    $receiveWhen = trim($_POST['receiveWhen']);

    //Combine into one field (simple approach)
    $order_details = "Order: $order | From: $orderFrom | Deliver To: $receiveAt | Time: $receiveWhen";

    $stmt = $conn->prepare("INSERT INTO studentorders (user_id, order_details) VALUES (?, ?)");

    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("is", $user_id, $order_details);

    if ($stmt->execute()) {
        echo "success";
    } else{
        echo "error";
    }
}
?>