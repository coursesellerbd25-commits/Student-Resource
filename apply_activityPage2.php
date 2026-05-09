<?php 
session_start();
require 'db_connectPage1.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id = $_SESSION['user_id'];
    $activity_id = $_POST['activity_id'];

    //Prevent duplicate apply
    $check = $conn->prepare("SELECT id FROM studentapplied_activities WHERE user_id=? AND activity_id=?");
    $check->bind_param("ii", $user_id, $activity_id);
    $check->execute();
    $result = $check->get_result();

    if ($result->num_rows > 0) {
        echo "exists";
        exit();
    }

    //Insert
    $stmt = $conn->prepare("INSERT INTO studentapplied_activities (user_id, activity_id) VALUES (?, ?)");
    $stmt->bind_param("ii", $user_id, $activity_id);

    if ($stmt->execute()) {
        echo "success";
    } else {
        echo "error: " . $stmt->error;
    }
}
?>