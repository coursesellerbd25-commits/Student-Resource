<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
require 'db_connectPage1.php';

//Protect Page
if (!isset($_SESSION['user_id'])) {
    header("Location: indexPage1.php");
    exit();
}

//User Details showup
$user_id = $_SESSION['user_id'];
$user = getUserProfile($user_id);

//Co-Curriculum Activities Portal
$appliedActivities = [];

$stmt = $conn->prepare("
  SELECT sa.title
  FROM studentapplied_activities saa
  JOIN studentactivities sa ON saa.activity_id = sa.id
  WHERE saa.user_id = ?
");

$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
  $appliedActivities[] = $row;
}

// Fetch activities from database
$activities = [];

$sql = "SELECT * FROM studentactivities ORDER BY created_at DESC";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $activities[] = $row;
  }
}

//Student Connection List
$students = [];

$sql = "SELECT id, fullname FROM studentusers";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $students[] = $row;
  }
}

//Teacher Connection List
$teachers = [];

$sql = "SELECT id, name FROM teacher_login_register";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $teachers[] = $row;
  }
}

//Instant Delivery form -- Customers
$orders = [];

$sql = "SELECT order_details, order_status, created_at FROM studentorders WHERE user_id = ? ORDER BY id DESC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
  $orders[] = $row;
}

//Instant Delivery form -- Delivery Man
$delivery_info = null;

$stmt = $conn->prepare("SELECT availability, areas FROM delivery_agents WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
  $delivery_info = $result->fetch_assoc();
}

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to fetch user profile
function getUserProfile($user_id) {
    global $conn;

    $sql = "SELECT id, fullname, email FROM studentusers WHERE id = ?";

    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    return $result->fetch_assoc();
}

// Function to check attendance
function checkAttendance($user_id) {
    global $conn;

    $sql = "SELECT attendance_counted FROM studentattendance WHERE user_id = ?";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    return $result->fetch_assoc();
}

// Function to submit absence reason
function submitAbsenceReason($user_id, $reason) {
    global $conn;

    $sql = "INSERT INTO studentabsence_reasons (user_id, reason) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("is", $user_id, $reason);
    return $stmt->execute();
}

// Handle requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {

        switch ($_POST['action']) {

            case 'getUserProfile':
                $user_id = $_POST['user_id'];
                echo json_encode(getUserProfile($user_id));
                break;

            case 'checkAttendance':
                $user_id = $_POST['user_id'];
                echo json_encode(checkAttendance($user_id));
                break;

            case 'submitAbsenceReason':
                $user_id = $_POST['user_id'];
                $reason = $_POST['reason'];

                if (submitAbsenceReason($user_id, $reason)) {
                    echo json_encode([
                        'status' => 'success', 
                        'message' => 'Reason submitted successfully.'
                    ]);
                } else {
                    echo json_encode([
                        'status' => 'error', 
                        'message' => 'Failed to submit reason.'
                    ]);
                }
                break;

            // Add more cases for other actions (like form submissions)
        }
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Student's Dashboard</title>
  <link rel="stylesheet" href="dashboardPage2.css">
</head>
<body>
  <header>
    <div class="header-content">
      <div class="timezone" id="timezone"></div>
      <div class="language-selector">
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

        <div class="search-bar">
          <input type="text" id="search-input" placeholder="Search..." oninput="searchContent()">
          <button id="search-button" onclick="searchContent()">🔍</button>
        </div>

        <div class="logout">
          <a href="logoutPage1.php">
            <button class="logout-btn" onclick="return confirm('Are you sure you want to log out?')">
              Log Out 
            </button>
          </a>
        </div>
    </div>

    <div class="sections">
      <div class="dashboard-section" id="me" onclick="showMeSection()">Me</div>
      <div class="dashboard-section" id="co-curriculum" onclick="showCoCurriculum()">Co-Curriculum Portal</div>
      <div class="dashboard-section" id="student-connect" onclick="showStudentConnect()">Student Connect</div>
      <div class="dashboard-section" id="teacher-messaging" onclick="showTeacherMessaging()">Teacher Messaging Zone</div>
      <div class="dashboard-section" id="instant-delivery" onclick="showDeliveryForms()">Instant Delivery Form</div>
    </div>
  </header>

  <main>
    <div class="me-section" id="me-section" style="display: none;">
        <div class="section">
      <h1>Welcome to Your Dashboard, <?php echo htmlspecialchars($user['fullname']); ?>!</h1>
      <h2>Your Profile</h2>
      <p>Name: <?php echo htmlspecialchars($user['fullname']); ?></p>
      <p>ID: <?php echo $user_id; ?></p>
      <p>Email: <?php echo htmlspecialchars($user['email']); ?></p>
      <!--<p>Department: Computer Science</p>-->
      
      <!--Delivery Man Status-->
      <?php if ($delivery_info): ?>
        <h3>Delivery Profile</h3>
        <p><strong>Availability: </strong> 
          <?php echo htmlspecialchars($delivery_info['availability']); ?>
        </p>
        <p><strong>Areas:</strong>
            <?php echo htmlspecialchars($delivery_info['areas']); ?>
        </p>
      <?php else: ?>
        <p>You are not registered as a delivery agent.</p>
      <?php endif; ?>
      </div>

      <h2>Order History</h2>
      <ul id="order-history">
        <?php if (empty($orders)): ?>
          <li>No Orders Yet.</li>
        <?php else: ?>
          <?php foreach ($orders as $order): ?>
            <li>
              <?php echo htmlspecialchars($order['order_details']); ?>
              <br>
              Status: <?php echo $order['order_status']; ?> |
              Date: <?php echo $order['created_at']; ?>
            </li>
          <?php endforeach; ?>
        <?php endif; ?>
      </ul>

      <h2>Applied Activities</h2>
      <ul id="applied-activities">
        <?php if (empty($appliedActivities)): ?>
          <li>No activities applied yet.</li>
        <?php else: ?>
          <?php foreach ($appliedActivities as $activity): ?>
            <li><?php echo htmlspecialchars($activity['title']); ?></li>
          <?php endforeach; ?>
        <?php endif; ?>
      </ul>

       <!-- Presence Panel -->
  <h2>Attendance Status</h2>
  <div id="attendance-status">
    <p id="attendance-message">Your attendance has been counted.</p>
    <div id="absence-reason-container" style="display: none;">
      <label for="absence-reason">Reason for Absence:</label>
      <input type="text" id="absence-reason" placeholder="Enter reason here...">
      <button onclick="submitAbsenceReason()">Submit</button>
    </div>
  </div>
    </div>

  
    <div class="delivery-forms" id="delivery-forms" style="display: none;">
  <div class="tabs">
    <button class="tab-button active" onclick="showForm('customer')">Customer</button>
    <button class="tab-button" onclick="showForm('delivery')">Delivery Agent</button>
  </div>

  <div class="form-container" id="customer-form">
    <h2>Customer Form</h2>
    <form id="customerOrderForm">
      <input type="hidden" name="user_id" value="<?php echo $user_id; ?>">
      
      <label>What are you?</label>
      <select name="gender" required>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      
      <label>What do you want to order?</label>
      <input type="text" name="order" required>
      
      <label>From where do you want to order?</label>
      <input type="text" name="orderFrom" required>
      
      <label>Where do you want to receive?</label>
      <input type="text" name="receiveAt" required>
      
      <label>When do you want to receive?</label>
      <input type="text" name="receiveWhen" required>
      
      <label>Your Name, ID, Dept:</label>
      <input type="text" name="userInfo" value="<?php echo htmlspecialchars($user['fullname']) . ', ID: ' . $user_id; ?>" readonly>
      
      <button type="submit">Submit</button>
    </form>
    <div class="form-message" id="customer-message"></div>
  </div>

  <div class="form-container" id="delivery-man-form" style="display: none;">
    <h2>Delivery Agent Form</h2>
    <form id="deliveryManForm">
      <input type="hidden" name="user_id" value="<?php echo $user_id; ?>">
      
      <label>What are you?</label>
      <select name="gender" required>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      
      <label>When are you available?</label>
      <input type="text" name="availability" required>
      
      <label>In which areas are you available?</label>
      <input type="text" name="areas" required>
      
      <label>Your Name, ID, Dept:</label>
      <input type="text" name="userInfo" value="<?php echo htmlspecialchars($user['fullname']) . ', ID: ' . $user_id; ?>" readonly>
      
      <button type="submit">Submit</button>
    </form>
    <div class="form-message" id="delivery-message"></div>
  </div>
</div>

    <div class="student-connect" id="student-connect-section" style="display: none;">
      <h1>Student Connect</h1>
      <h2>Registered Students</h2>
      <ul id="student-list">
        <?php if (empty($students)): ?>
          <li>No Student Registered Yet</li>
          <?php else: ?>
            <?php foreach ($students as $student): ?>
              <li onclick="selectStudent('<?php echo htmlspecialchars($student['fullname']); ?>', '<?php echo $student['id']; ?>')">
                <?php echo htmlspecialchars($student['fullname']); ?> (ID: <?php echo $student['id']; ?>)
              </li>
            <?php endforeach; ?>
          <?php endif; ?>
      </ul>
      <h2>Chat with <span id="selected-student-name">...</span></h2>
      <div class="chat-container">
        <div class="chat-messages" id="chat-messages"></div>
        <input type="text" id="chat-input" placeholder="Type a message...">
        <button onclick="sendChatMessage()">Send</button>
      </div>
      <h2>Chat History</h2>
      <div id="chat-history"></div>
    </div>

    <div class="co-curriculum" id="co-curriculum-section" style="display: none;">
      <h1>Co-Curriculum Activities</h1>
      
      <?php if (empty($activities)): ?>
        <p>No Activities Available Yet.</p>
      <?php else: ?>

        <?php foreach ($activities as $activity): ?>
          <div class="activity">
            <h2><?php echo htmlspecialchars($activity['title']); ?></h2>
                <p>
                  <strong>Type:</strong>
                  <?php echo htmlspecialchars($activity['type']); ?>
                </p>
                <p>
                  <strong>Description:</strong>
                  <?php echo htmlspecialchars($activity['description']); ?>
                </p>
                <p>
                  <strong>Deadline:</strong>
                  <?php echo htmlspecialchars($activity['deadline']); ?>
                </p>

                <form class="apply-form" method="POST" action="apply_activityPage2.php">
                  <input type="hidden" name="activity_id" value="<?php echo $activity['id']; ?>">
                  <button type="submit">Apply Now</button>
                </form>
        </div>
        <?php endforeach; ?>
        <?php endif; ?>
    </div>

    <div class="teacher-messaging" id="teacher-messaging-section" style="display: none;">
      <h1>Teacher Messaging Zone</h1>
      <h2>Registered Teachers</h2>
      <ul id="teacher-list">
        <?php if (empty($teachers)): ?>
          <li>No Teacher Registered Yet</li>
        <?php else: ?>
          <?php foreach ($teachers as $teacher): ?>
            <li onclick="selectTeacher(
              '<?php echo htmlspecialchars($teacher['name']); ?>',
              '<?php echo $teacher['id']; ?>',
              'N/A',
              'N/A',
              'N/A'
            )">
              <?php echo htmlspecialchars($teacher['name']); ?> (ID: <?php echo $teacher['id']; ?>)
            </li>
          <?php endforeach; ?>
        <?php endif; ?>
      </ul>
      <h2>Chat with <span id="selected-teacher-name">...</span></h2>
      <div id="teacher-details"></div>
      <div class="chat-container">
        <div class="chat-messages" id="teacher-chat-messages"></div>
        <input type="text" id="teacher-chat-input" placeholder="Type a message...">
        <button onclick="sendTeacherChatMessage()">Send</button>
      </div>
      <h2>Chat History</h2>
      <div id="teacher-chat-history"></div>
    </div>
  </main>

  <div class="chatbot" id="chatbot">
    <button onclick="toggleChatbot()">Chat with us!</button>
    <div class="chatbot-window" id="chatbot-window">
      <div class="chatbot-header">Chatbot</div>
      <div class="chatbot-messages" id="chatbot-messages"></div>
      <input type="text" id="chatbot-input" placeholder="Type a message...">
      <button onclick="sendMessage()">Send</button>
    </div>
  </div>

  <script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
  <script>const CURRENT_USER_ID = "<?php echo $user_id; ?>";</script>
  <script src="dashboardPage2.js"></script>
</body>
</html>