const socket = io("http://localhost:3000");
socket.emit("register_user", {
  userId: CURRENT_USER_ID,
  userType: "student"
});

// Function to display the current timezone
function displayTimezone() {
  const timezoneElement = document.getElementById('timezone');
  const options = { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  
  setInterval(() => {
    const timeString = new Intl.DateTimeFormat('en-US', options).format(new Date());
    timezoneElement.textContent = `Current Time (BD): ${timeString}`;
  }, 1000);
}

// Function to change language
function changeLanguage() {
  const language = document.getElementById('language').value;
  const translations = {
    en: {
      welcome: "Welcome to Your Dashboard!",
      yourProfile: "Your Profile",
      orderHistory: "Order History",
      appliedActivities: "Applied Activities",
      studentConnect: "Student Connect",
      teacherMessaging: "Teacher Messaging Zone",
      coCurriculum: "Co-Curriculum Portal",
      instantDelivery: "Instant Delivery Form",
      // Add more translations as needed
    },
    bn: {
      welcome: "আপনার ড্যাশবোর্ডে স্বাগতম!",
      yourProfile: "আপনার প্রোফাইল",
      orderHistory: "অর্ডারের ইতিহাস",
      appliedActivities: "আবেদনকৃত কার্যক্রম",
      studentConnect: "ছাত্র সংযোগ",
      teacherMessaging: "শিক্ষক বার্তা অঞ্চল",
      coCurriculum: "সহ-পাঠ্যক্রম পোর্টাল",
      instantDelivery: "তাত্ক্ষণিক ডেলিভারি ফর্ম",
      // Add more translations as needed
    },
    zh: {
      welcome: "欢迎来到您的仪表板！",
      yourProfile: "您的个人资料",
      orderHistory: "订单历史",
      appliedActivities: "申请的活动",
      studentConnect: "学生连接",
      teacherMessaging: "教师消息区",
      coCurriculum: "共同课程门户",
      instantDelivery: "即时交付表单",
      // Add more translations as needed
    },
    ja: {
      welcome: "あなたのダッシュボードへようこそ！",
      yourProfile: "あなたのプロフィール",
      orderHistory: "注文履歴",
      appliedActivities: "申請した活動",
      studentConnect: "学生接続",
      teacherMessaging: "教師メッセージゾーン",
      coCurriculum: "共通カリキュラムポータル",
      instantDelivery: "即時配信フォーム",
      // Add more translations as needed
    },
    ko: {
      welcome: "대시보드에 오신 것을 환영합니다!",
      yourProfile: "내 프로필",
      orderHistory: "주문 내역",
      appliedActivities: "신청한 활동",
      studentConnect: "학생 연결",
      teacherMessaging: "교사 메시지 구역",
      coCurriculum: "공동 커리큘럼 포털",
      instantDelivery: "즉시 배달 양식",
      // Add more translations as needed
    },
    ru: {
      welcome: "Добро пожаловать на вашу панель управления!",
      yourProfile: "Ваш профиль",
      orderHistory: "История заказов",
      appliedActivities: "Поданные заявки",
      studentConnect: "Студенческое соединение",
      teacherMessaging: "Зона сообщений учителей",
      coCurriculum: "Портал совместной учебной программы",
      instantDelivery: "Форма мгновенной доставки",
      // Add more translations as needed
    },
    de: {
      welcome: "Willkommen auf Ihrem Dashboard!",
      yourProfile: "Ihr Profil",
      orderHistory: "Bestellverlauf",
      appliedActivities: "Angewandte Aktivitäten",
      studentConnect: "Studentenverbindung",
      teacherMessaging: "Lehrer-Nachrichtenbereich",
      coCurriculum: "Co-Curriculum-Portal",
      instantDelivery: "Sofortlieferformular",
      // Add more translations as needed
    },
    la: {
      welcome: "Salve ad tabulam tuam!",
      yourProfile: "Tuum profile",
      orderHistory: "Historia ordinum",
      appliedActivities: "Activitates applicatae",
      studentConnect: "Coniunctio discipulorum",
      teacherMessaging: "Zona nuntiorum magistrorum",
      coCurriculum: "Portal co-curriculum",
      instantDelivery: "Forma instantis traditionis",
      // Add more translations as needed
    },
    fr: {
      welcome: "Bienvenue sur votre tableau de bord !",
      yourProfile: "Votre profil",
      orderHistory: "Historique des commandes",
      appliedActivities: "Activités appliquées",
      studentConnect: "Connexion des étudiants",
      teacherMessaging: "Zone de messagerie des enseignants",
      coCurriculum: "Portail de co-curriculum",
      instantDelivery: "Formulaire de livraison instantanée",
      // Add more translations as needed
    },
  };

  const selectedTranslations = translations[language] || translations.en;

  // Update text content based on selected language
  document.querySelector('h1').textContent = selectedTranslations.welcome;
  document.querySelector('h2').textContent = selectedTranslations.yourProfile;
  document.getElementById('order-history').previousElementSibling.textContent = selectedTranslations.orderHistory;
  document.getElementById('applied-activities').previousElementSibling.textContent = selectedTranslations.appliedActivities;
  document.getElementById('student-connect').textContent = selectedTranslations.studentConnect;
  document.getElementById('teacher-messaging').textContent = selectedTranslations.teacherMessaging;
  document.getElementById('co-curriculum').textContent = selectedTranslations.coCurriculum;
  document.getElementById('instant-delivery').textContent = selectedTranslations.instantDelivery;
  // Update other text elements as needed
}
// Function to search content
function searchContent() {
  const query = document.getElementById('search-input').value.toLowerCase();

  // Filter activities
  const activities = document.querySelectorAll('.activity');
  activities.forEach(activity => {
    const title = activity.querySelector('h2').textContent.toLowerCase();
    activity.style.display = title.includes(query) ? 'block' : 'none';
  });

  // Filter students
  const students = document.querySelectorAll('#student-list li');
  students.forEach(student => {
    const studentName = student.textContent.toLowerCase();
    student.style.display = studentName.includes(query) ? 'block' : 'none';
  });

  // Filter teachers
  const teachers = document.querySelectorAll('#teacher-list li');
  teachers.forEach(teacher => {
    const teacherName = teacher.textContent.toLowerCase();
    teacher.style.display = teacherName.includes(query) ? 'block' : 'none';
  });
}

// Display the timezone on page load
document.addEventListener('DOMContentLoaded', displayTimezone);

// Function to toggle the chatbot window
function toggleChatbot() {
  const chatbotWindow = document.getElementById('chatbot-window');
  chatbotWindow.style.display = chatbotWindow.style.display === 'flex' ? 'none' : 'flex';
}

// Function to send a message in the chatbot
function sendMessage() {
  const input = document.getElementById('chatbot-input');
  const message = input.value;
  if (message.trim() === '') return;

  const messagesContainer = document.getElementById('chatbot-messages');
  const userMessage = document.createElement('div');
  userMessage.textContent = `You: ${message}`;
  messagesContainer.appendChild(userMessage);

  // Simulate a response from the chatbot
  const botResponse = document.createElement('div');
  botResponse.textContent = `Chatbot: I'm here to help!`;
  messagesContainer.appendChild(botResponse);

  input.value = '';
  messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
}

//Connect JS to PHP -- User Profile showcase
function loadUserProfile() {
  fetch('dashboardPage2.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'action=getUserProfile&user_id=1'
  })
  .then(res => res.json())
  .then(data => {
    console.log("User data:", data);

    if (!data) return;

    document.getElementById('profile-name').innerText = data.fullname || 'N/A';
    document.getElementById('profile-id').innerText = data.id || 'N/A';
    document.getElementById('profile-email').innerText = data.email || 'N/A';
  })
  .catch(err => console.error("Fetch error:", err));
}

// Connect js - db -- Co-curriculum Portal
document.addEventListener('submit', function(e) {
  if (e.target.classList.contains('apply-form')) {
      e.preventDefault();

      const formData = new FormData(e.target);

      fetch('apply_activityPage2.php', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin'
      })
      .then(res => res.text())
      .then(data => {
        console.log("Server:", data);

        if (data.trim() === "success") {
          alert("Applied successfully!");
            window.location.reload();
        } else if (data.trim() === "exists") {
          alert("You already applied!");
        } else {
          alert("Error: " + data);
        }
      })
      .catch(err => console.error(err));
    }
  });

// Function to show the selected form -- Instant Delivery
function showForm(formType) {

  // Hide both forms initially
  document.getElementById('customer-form').style.display = 'none';
  document.getElementById('delivery-man-form').style.display = 'none';

  // Show the selected form
  if (formType === 'customer') {
    document.getElementById('customer-form').style.display = 'block';
    document.querySelector('.tab-button.active').classList.remove('active'); // Remove active class from the previous button
    document.querySelector('.tab-button:nth-child(1)').classList.add('active'); // Add active class to the customer button
  } else if (formType === 'delivery') {
    document.getElementById('delivery-man-form').style.display = 'block';
    document.querySelector('.tab-button.active').classList.remove('active'); // Remove active class from the previous button
    document.querySelector('.tab-button:nth-child(2)').classList.add('active'); // Add active class to the delivery button
    }
  }


// Connect JS - DB -- Customer Form
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('customerOrderForm');

  if (!form) {
    console.log("Form not found");
    return;
  }

    form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('process_orderPage2.php', {
      method: 'POST',
      body: formData
    })
    .then(res => res.text())
    .then(data => {
      if (data.trim() === "success") {
        document.getElementById('customer-message').textContent = "Order submitted successfully!";
        this.reset();
      } else {
        document.getElementById('customer-message').textContent = "Something went wrong";
        console.log("Server response:", data);
      }
    })
    .catch(err => {
      console.error("Fetch error:", err);
      document.getElementById('customer-message').textContent = "Server error.";
    });
  });
});

// Connect JS - DB -- Delivery Agent Form
document.addEventListener('DOMContentLoaded', () => {
  const deliveryForm = document.getElementById('deliveryManForm');

  if (!deliveryForm) {
    console.log("Delivery form not found");
    return;
  }

    deliveryForm.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log("DELIVERY FORM TRIGGERED");

        const formData = new FormData(this);

        fetch('process_deliveryPage2.php', {
          method: 'POST',
          body: formData 
        })
        .then(res => res.text())
        .then(data => {
          console.log("Server says:", data);

          if (data.trim() === "success") {
            document.getElementById('delivery-message').textContent = "Registered as Delivery Man!";
            this.reset();
          } else {
            document.getElementById('delivery-message').textContent = "Something went wrong";
          }
        })
        .catch(err => {
          console.error(err);
          document.getElementById('delivery-message').textContent = "Server error";
        });
      });
});

// Show the customer form by default when the page loads
document.addEventListener('DOMContentLoaded', () => {
  showForm('customer'); // Show customer form initially
});

// Call checkAttendance when the "Me" section is shown
function showMeSection() {
  // Remove active class from all sections
  document.querySelectorAll('.dashboard-section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Add active class to "Me" section
  const meSection = document.getElementById('me');
  meSection.classList.add('active');

  // Show the "Me" section and hide other sections
  document.getElementById('me-section').style.display = 'block';
  document.getElementById('delivery-forms').style.display = 'none';
  document.getElementById('student-connect-section').style.display = 'none';
  document.getElementById('co-curriculum-section').style.display = 'none';
  document.getElementById('teacher-messaging-section').style.display = 'none';

  // Display applied activities
  displayAppliedActivities();

  // Check attendance status
  checkAttendance();
}

// Display the timezone and show the "Me" section on page load
document.addEventListener('DOMContentLoaded', () => {
  displayTimezone();
  showMeSection(); // Automatically show the "Me" section
  loadUserProfile();
});

// Function to check attendance status
function checkAttendance() {

  // Simulate attendance status (this could be fetched from a server)
  const attendanceCounted = false; // Change this to true or false based on actual attendance data

  const attendanceMessage = document.getElementById('attendance-message');
  const absenceReasonContainer = document.getElementById('absence-reason-container');

  if (attendanceCounted) {
    attendanceMessage.textContent = "Your attendance has been counted.";
    absenceReasonContainer.style.display = 'none'; // Hide the reason input if attendance is counted
  } else {
    attendanceMessage.textContent = "Your attendance was not counted.";
    absenceReasonContainer.style.display = 'block'; // Show the reason input if attendance is not counted
  }
}

// Function to submit the absence reason
function submitAbsenceReason() {
  const reasonInput = document.getElementById('absence-reason');
  const reason = reasonInput.value.trim();

  if (reason) {
    alert(`Your reason for absence has been submitted: ${reason}`);
    reasonInput.value = ''; // Clear the input after submission
  } else {
    alert("Please enter a reason for your absence.");
  }
}

// Function to show the delivery forms
function showDeliveryForms() {

  // Remove active class from all sections
  document.querySelectorAll('.dashboard-section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Add active class to "Instant Delivery Form" section
  const deliverySection = document.getElementById('instant-delivery');
  deliverySection.classList.add('active');

  // Show the delivery forms and hide the "Me" section, student connect, co-curriculum, and teacher messaging
  document.getElementById('me-section').style.display = 'none';
  document.getElementById('delivery-forms').style.display = 'block';
  document.getElementById('student-connect-section').style.display = 'none';
  document.getElementById('co-curriculum-section').style.display = 'none';
  document.getElementById('teacher-messaging-section').style.display = 'none';
}

// Function to show the student connect section
function showStudentConnect() {

  // Remove active class from all sections
  document.querySelectorAll('.dashboard-section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Add active class to "Student Connect" section
  const studentConnectSection = document.getElementById('student-connect');
  studentConnectSection.classList.add('active');

  // Show the student connect section and hide the "Me" section, delivery forms, co-curriculum, and teacher messaging
  document.getElementById('me-section').style.display = 'none';
  document.getElementById('delivery-forms').style.display = 'none';
  document.getElementById('student-connect-section').style.display = 'block';
  document.getElementById('co-curriculum-section').style.display = 'none';
  document.getElementById('teacher-messaging-section').style.display = 'none';
}

// Function to send a chat message to the selected student
function sendChatMessage() {
  if (!selectedStudentId) {
    alert("Select a student first.");
    return;
  }

  const input = document.getElementById("chat-input");
  const message = input.value.trim();

  if (message === "") return;

  socket.emit("private_message", {
    senderType: "student",
    receiverId: selectedStudentId,
    receiverType: "student",
    message: message 
  });

  const chatBox = document.getElementById("chat-messages");
  const msg = document.createElement("div");

  msg.textContent = `You: ${message}`;
  chatBox.appendChild(msg);
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to show the co-curriculum section
function showCoCurriculum() {
  // Remove active class from all sections
  document.querySelectorAll('.dashboard-section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Add active class to "Co-Curriculum Portal" section
  const coCurriculumSection = document.getElementById('co-curriculum');
  coCurriculumSection.classList.add('active');

  // Show the co-curriculum section and hide the "Me" section, delivery forms, student connect, and teacher messaging
  document.getElementById('me-section').style.display = 'none';
  document.getElementById('delivery-forms').style.display = 'none';
  document.getElementById('student-connect-section').style.display = 'none';
  document.getElementById('co-curriculum-section').style.display = 'block';
  document.getElementById('teacher-messaging-section').style.display = 'none';
}

// Function to show the teacher messaging section
function showTeacherMessaging() {
  // Remove active class from all sections
  document.querySelectorAll('.dashboard-section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Add active class to "Teacher Messaging Zone" section
  const teacherMessagingSection = document.getElementById('teacher-messaging');
  teacherMessagingSection.classList.add('active');

  // Show the teacher messaging section and hide the "Me" section, delivery forms, student connect, and co-curriculum
  document.getElementById('me-section').style.display = 'none';
  document.getElementById('delivery-forms').style.display = 'none';
  document.getElementById('student-connect-section').style.display = 'none';
  document.getElementById('co-curriculum-section').style.display = 'none';
  document.getElementById('teacher-messaging-section').style.display = 'block';
}

// Function to select a student for chatting
function selectStudent(name, id) {
  selectedStudentId = id;
  selectedStudentName = name;

  document.getElementById("selected-student-name").textContent = name;
  document.getElementById("chat-messages").innerHTML = "";
}

// Function to select a teacher for chatting
function selectTeacher(name, id, position, dept, phone) {
  document.getElementById('selected-teacher-name').textContent = name;
  const teacherDetails = document.getElementById('teacher-details');
  teacherDetails.innerHTML = `
    <p><strong>ID:</strong> ${id}</p>
    <p><strong>Position:</strong> ${position}</p>
    <p><strong>Department:</strong> ${dept}</p>
    <p><strong>Phone Number:</strong> ${phone}</p>
  `;
  document.getElementById('teacher-chat-messages').innerHTML = ''; // Clear previous messages
  document.getElementById('teacher-chat-history').innerHTML = ''; // Clear previous chat history
}

// Function to send a chat message to the selected teacher
function sendTeacherChatMessage() {
  const input = document.getElementById('teacher-chat-input');
  const message = input.value.trim();

  if (message === '') return;

  socket.emit("send_message", {
    sender:"Student",
    message: message 
  });

  input.value = '';
}

socket.on("receive_message", (data) => {
  const chatBox = document.getElementById("teacher-chat-messages");
  const msg = document.createElement("div");

  msg.textContent = `${data.sender}: ${data.message}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
});

// Receive private message
socket.on("receive_private_message", (data) => {
  const chatBox = document.getElementById("chat-messages");
  const msg = document.createElement("div");

  msg.textContent = `${data.senderId}: ${data.message}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
});

// Display the timezone on page load
document.addEventListener('DOMContentLoaded', displayTimezone);

