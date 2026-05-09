<?php 
session_start();
session_unset();
session_destroy();

//redirect to landing page
header("Location: page0.html");
exit();
?>