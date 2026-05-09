<?php
session_start();

if (!isset($_SESSION['teacher_id'])) {
    header("Location: login_registerPage3.php");
    exit();
}

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

//Teacher Profile Showcase
$teacher_id = $_SESSION['teacher_id'];

$stmt = $conn->prepare("SELECT name, email FROM teacher_login_register WHERE id = ?");
$stmt->bind_param("i", $teacher_id);
$stmt->execute();
$result = $stmt->get_result();

$teacher = $result->fetch_assoc();

// Fetch All Teachers
$teachers = [];
$result = $conn->query("SELECT id, name, email FROM teacher_login_register");

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $teachers[] = $row;
    }
}

// Fetch All Students
$students = [];
$result = $conn->query("SELECT id, fullname, email FROM studentusers");

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $students[] = $row;
    }
}

// Fetch absence reasons
$sql = "SELECT user_id, reason FROM studentabsence_reasons";
$result = $conn->query($sql);

$absenceReasons = [];
if ($result->num_rows > 0) {
    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        $absenceReasons[] = $row;
    }
} else {
    $absenceReasons = []; // No absence reasons found
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teacher Dashboard</title>
    <link rel="stylesheet" href="teacherDashboardPage4.css"> <!-- Link to your CSS file -->
</head>
<body>
    <div class="container">
        <header>
            <h1>Welcome To Your Dashboard, <?php echo htmlspecialchars($teacher['name']); ?>!</h1>

            <div class="settings">

                <div class="language-settings">
                    <label for="language">Language:</label>
                    <select id="language" onchange="changeLanguage()">
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
                </div>

                <div class="search-container">
                    <i class="fa fa-search" aria-hidden="true"></i> <!-- Search icon -->
                        <input type="text" id="search-bar" placeholder="Search...">
                </div>

                <div id="current-time"></div>

                <a href="logoutPage1.php" class="logout-btn">Logout</a>
            </div>
        </header>

        <nav>
            <ul>
                <li><a href="#" id="me-link">Me</a></li>
                <li><a href="#" id="messaging-zone-link">Messaging Zone</a></li>
                <li><a href="#" id="todays-presence-link">Today's Presence</a></li>
            </ul>
        </nav>

        <main>
            <section id="me" style="display: block;"> <!-- Initially hidden -->

                <h2>Me</h2>

                <div class="profile-info">
                    <img src="download1Page4.jpg" alt="Profile Picture" id="profile-pic"> <!-- Replace with actual image path -->

                    <div class="profile-details">
                        <p><strong>Name:</strong> <span id="profile-name"><?php echo htmlspecialchars($teacher['name']); ?></span></p>
                        <p><strong>ID:</strong> <span id="profile-id"><?php echo $teacher_id; ?></span></p>
                        <p><strong>Department:</strong> <span id="profile-department">N/A</span></p>
                        <p><strong>Position:</strong> <span id="profile-position">Senior Teacher</span></p>
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
            <input type="text" id="position" value="Senior Teacher"><br>

            <label for="phone">Phone Number:</label>
            <input type="text" id="phone" value="(123) 456-7890"><br>

            <label for="profile-pic-input">Profile Picture URL:</label>
            <input type="text" id="profile-pic-input" value="download1.jpg"><br>

            <button type="button" id="save-profile-btn">Save Changes</button>
            <button type="button" id="cancel-edit-btn">Cancel</button>
        </form>
    </div>
</section>

           <section id="messaging-zone" style="display: none;"> <!-- Initially hidden -->
    <h2>Messaging Zone</h2>
    
    <div class="messaging-container">
        <!-- Teacher's Info -->
        <div class="info-box" id="teacher-info">
            <h3>Registered Teachers</h3>
            <ul>
                <?php if (empty($teachers)): ?>
                    <li>No teachers registered.</li>
                <?php else: ?>
                    <?php foreach ($teachers as $t): ?>
                        <li>
                            <?php echo htmlspecialchars($t['name']); ?><br>
                            <small>ID: <?php echo $t['id']; ?></small>
                        </li>
                    <?php endforeach; ?>
                <?php endif; ?>
            </ul>
        </div>

        <!-- Student's Info -->
        <div class="info-box" id="student-info">
            <h3>Registered Students</h3>
            <ul>
                <?php if (empty($students)): ?>
                    <li>No students registered.</li>
                <?php else: ?>
                    <?php foreach ($students as $s): ?>
                        <li>
                            <?php echo htmlspecialchars($s['fullname']); ?><br>
                            <small>ID: <?php echo $s['id']; ?> </small>
                        </li>
                    <?php endforeach; ?>
                <?php endif; ?>
            </ul>
        </div>

        <!-- Teacher to Teacher Messaging Zone -->
<div class="messaging-zone" id="teacher-to-teacher">
    <h3>Teacher to Teacher Messaging</h3>
    <div id="teacher-chat" class="chat-history">
        <!-- Chat messages will be displayed here -->
    </div>
    <input type="text" id="teacher-message-input" placeholder="Type your message here...">
    <button id="send-teacher-message">Send</button>
</div>

<!-- Teacher to Student Messaging Zone -->
<div class="messaging-zone" id="teacher-to-student">
    <h3>Teacher to Student Messaging</h3>
    <div id="student-chat" class="chat-history">
        <!-- Chat messages will be displayed here -->
    </div>
    <input type="text" id="student-message-input" placeholder="Type your message here...">
    <button id="send-student-message">Send</button>
</div>

<!-- Chat History Box -->
<div class="chat-history-box" id="chat-history">
    <h3>Chat History</h3>
    <div id="chat-history-content">
        <!-- Chat history will be displayed here -->
    </div>
</div>

    </div>
</section>

<!--Today's Presence-->
            <section id="todays-presence" style="display: none;"> <!-- Initially hidden -->
    <h2>Today's Presence</h2>
    
    <div id="attendance-chart">
        <h3>Attendance Chart</h3>
        <table id="presence-table">
            <thead>
                <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Present</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($students)): ?>
                    <tr>
                        <td colspan="3">No Students Registered.</td>
                    </tr>
                <?php else: ?>
                    <?php foreach ($students as $s): ?>
                        <tr>
                            <td><?php echo $s['id']; ?></td>

                            <td>
                                <?php echo htmlspecialchars($s['fullname']); ?>
                            </td>

                            <td>
                                <input 
                                    type="checkbox"
                                    name="present_students[]"
                                    value="<?php echo $s['id']; ?>"
                                    checked 
                                >
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>

    <div id="absence-reasons">
        <h3>Absence Reasons</h3>
        <div id="absence-reason-list">
            <!-- Absence reasons will be displayed here -->
            <?php if (empty($absenceReasons)): ?>
                <p>No absence reasons submitted.</p>
            <?php else: ?>
                <?php foreach ($absenceReasons as $reason): ?>
                    <p>
                        Student ID: <?php echo $reason['user_id']; ?> <br>
                        Reason: <?php echo htmlspecialchars($reason['reason']); ?>
                    </p>
                    <hr>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </div>
</section>

        </main>
    </div>

<!-- Chatbot Icon -->
<div id="chatbot-icon" onclick="toggleChatbot()">
    <img src="downloadPage4.png" alt="Chatbot Icon" />
</div>

<!-- Chatbot Interface -->
<div id="chatbot">
    <div id="chatbot-header">
        <h2>Chatbot</h2>
        <button id="close-chatbot" onclick="toggleChatbot()">X</button>
    </div>
    <div id="chatbot-messages"></div>
    <input type="text" id="chatbot-input" placeholder="Type your message...">
    <button id="send-message">Send</button>
</div>

    <script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
    <script src="teacherDashboardPage4.js"></script> <!-- Link to your JavaScript file -->
</body>
</html>
