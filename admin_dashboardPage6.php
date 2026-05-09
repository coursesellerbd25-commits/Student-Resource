<?php
session_start();

$host = 'localhost'; // Database host
$db = 'student_resource'; // Database name
$user = 'root'; // Database username
$pass = ''; // Database password


// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if user is logged in
if (!isset($_SESSION['admin_id'])) {
    header("Location: admin_login_registerPage5.html"); // Redirect to login page
    exit();
}

// Fetch user profile
$admin_id = $_SESSION['admin_id'];

$stmt = $conn->prepare("SELECT * FROM admin_users WHERE id = ?");
$stmt->bind_param("i", $admin_id);
$stmt->execute();

$admin_result = $stmt->get_result();
$admin = $admin_result->fetch_assoc();

// Fetch activities
$activities_query = "SELECT * FROM studentactivities";
$activities_result = $conn->query($activities_query);

// Fetch students
$students_query = "SELECT * FROM studentusers";
$students_result = $conn->query($students_query);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="admin_dashboardPage6.css"> <!-- Link to your CSS file -->
</head>
<body>
    <div class="container">
        <header>
            <h1>Welcome to the Admin Dashboard
<nav>
            <a href="logoutPage1.php" id="logout-button">Logout</a>
        </nav></h1>
            <div class="header-accessibility">
                <p><b>Current Time (BD):</b></p>
                <div id="current-time"></div>
                <select id="language-settings" onchange="changeLanguage()">
    <option value="en">English</option>
    <option value="bn">Bangla</option>
    <option value="zh">Chinese</option>
    <option value="ja">Japanese</option>
    <option value="ko">Korean</option>
    <option value="ru">Russian</option>
    <option value="de">German</option>
    <option value="la">Latin</option>
    <option value="fr">French</option>
  </select>
                <input type="text" id="search-bar" placeholder="Search...">
            </div>
        </header>
         <nav>
    <ul>
        <li><a href="#" id="me-link">Me</a></li>
        <li><a href="#" id="co-curriculum-link">Co-Curriculum Activities List</a></li>
        <li><a href="#" id="todays-presence-link">Today's Presence</a></li>
    </ul>
</nav>
    </div>
<!--Me-->
    <main><section id="me" style="display: block;"> <!-- Initially hidden -->
    <h2>Me</h2>
    <div class="profile-info">
        <img src="download1Page6.jpg" alt="Profile Picture" id="profile-pic"> <!-- Replace with actual image path -->
        <div class="profile-details">
            <p><strong>Name:</strong> <span id="profile-name"><?php echo htmlspecialchars($admin['name']); ?></span></p>
            <p><strong>ID:</strong> <span id="profile-id"><?php echo $admin['id']; ?></span></p>
            <p><strong>Department:</strong> <span id="profile-department">CCE</span></p>
            <p><strong>Position:</strong> <span id="profile-position">Admin</span></p>
            <p><strong>Phone Number:</strong> <span id="profile-phone"> (123) 456-7890</span></p>
            <button id="edit-profile-btn">Edit Profile</button>
        </div>
    </div>

    <!-- Edit Profile Form -->
    <div id="edit-profile-form" style="display: none;"> <!-- Initially hidden -->
        <h3>Edit Profile</h3>
        <form id="profile-form">
            <label for="name">Name:</label>
            <input type="text" id="name" value="John Doe"><br>

            <label for="id">ID:</label>
            <input type="text" id="id" value="123456"><br>

            <label for="department">Department:</label>
            <input type="text" id="department" value="CCE"><br>

            <label for="position">Position:</label>
            <input type="text" id="position" value="Admin"><br>

            <label for="phone">Phone Number:</label>
            <input type="text" id="phone" value="(123) 456-7890"><br>

            <label for="profile-pic-input">Profile Picture URL:</label>
            <input type="text" id="profile-pic-input" value="download1.jpg"><br>

            <button type="button" id="save-profile-btn">Save Changes</button>
            <button type="button" id="cancel-edit-btn">Cancel</button>
        </form>
    </div>
</section>

<!--Co-curriculum Activities-->
    <section id="co-curriculum" style="display: none;"> <!-- Initially hidden -->
        <h2>Co-Curriculum Activities</h2>

        <div id="activities-list">
            <?php 
            
            $activity_query = "SELECT * FROM studentactivities ORDER BY created_at DESC";
            $activity_result = $conn->query($activity_query);

            if($activity_result && $activity_result->num_rows > 0):
                while($activity = $activity_result->fetch_assoc()):
            ?>

                    <div class='activity-item'>
                        <h3><?php echo htmlspecialchars($activity['title']); ?></h3>
                        <p><strong>Type:</strong>
                        <?php echo htmlspecialchars($activity['type']); ?></p>
                        <p><strong>Learn:</strong>
                        <?php echo htmlspecialchars($activity['description']); ?></p>
                        <p><strong>Deadline:</strong>
                        <?php echo htmlspecialchars($activity['deadline']); ?></p>

                        <h4>Applied Students</h4>
                        <ul>
                            <?php
                            $activity_id = $activity['id'];
                            $apply_query = "SELECT studentusers.fullname, studentusers.id 
                                            FROM studentapplied_activities 
                                            JOIN studentusers 
                                            ON studentapplied_activities.user_id = studentusers.id 
                                            WHERE studentapplied_activities.activity_id = ? 
                            ";
                            $apply_stmt = $conn->prepare($apply_query);
                            $apply_stmt->bind_param("i", $activity_id);
                            $apply_stmt->execute();
                            $apply_result = $apply_stmt->get_result();

                            if ($apply_result->num_rows > 0):
                                while ($student = $apply_result->fetch_assoc()):
                            ?>
                                    <li>
                                        <?php echo htmlspecialchars($student['fullname']); ?> 
                                        (ID: <?php echo $student['id']; ?>)
                                    </li>
                                <?php 
                                    endwhile;
                            else:
                            ?>
                                <li>No students applied yet.</li>;
                            <?php endif; ?>
                        </ul>
                    </div>
                    <?php 
                        endwhile;
                    else:
                    ?>
                        <p>No Activities Published Yet.</p>
                    <?php endif; ?>
                </div>
        <button id="add-activity-btn">Add New Activity</button>

    <!-- Add this in your HTML where you want the form to be -->
<div id="activity-form" style="display: none;">
    <h3 id="form-title">Edit Activity</h3>
    <form id="form">
        <div class="form-group">
            <label for="activity-title">Title:</label>
            <input type="text" id="activity-title" required>
        </div>
        <div class="form-group">
            <label for="activity-type">Type:</label>
            <input type="text" id="activity-type" required>
        </div>
        <div class="form-group">
            <label for="activity-learn">Description:</label>
            <input type="text" id="activity-learn" required>
        </div>
        <div class="form-group">
            <label for="activity-deadline">Deadline:</label>
            <input type="date" id="activity-deadline" required>
        </div>
        <button type="button" id="save-activity-btn">Save Activity</button>
        <button type="button" id="cancel-btn">Cancel</button>
    </form>
</div>
</section>

<!--Today's Presence-->
<section id="todays-presence" style="display: none;"> <!-- Initially hidden -->
    <h2>Today's Presence</h2>
    <table id="presence-table" border="1" style="width: 100%; border-collapse: collapse;">
        <thead>
            <tr>
                <th>Student Name</th>
                <th>Student ID</th>
                <th>Submitted by Teacher</th>
                <th>Presence</th>
            </tr>
        </thead>
        <tbody id="presence-list">
            <?php if ($students_result && $students_result->num_rows > 0): ?>
                <?php while($student = $students_result->fetch_assoc()): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($student['fullname']); ?></td>
                        <td><?php echo $student['id']; ?></td>
                        <td>-</td>
                        <td><input type="checkbox"></td>
                    </tr>
                <?php endwhile; ?>
            <?php else: ?>
                <tr colspan="4">No Registered Students Found.</tr>
            <?php endif; ?>
        </tbody>
    </table>
</section>
</main>
    
    <button id="chatbot-button">💬</button>
    <script src="admin_dashboardPage6.js"></script> <!-- Link to your JavaScript file -->
</body>
</html>
