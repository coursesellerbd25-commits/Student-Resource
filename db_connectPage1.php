<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "student_resource";

//Create Connection
$conn = new mysqli($host, $username, $password, $database);

//Check Connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>