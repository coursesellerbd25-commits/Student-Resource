const socket = io("https://student-resource-25-tzfm.onrender.com");

// Function to change language
function changeLanguage() {
  const language = document.getElementById('language').value;
  const translations = {
    en: {
      welcome: "Welcome to Your Dashboard!",
      messagingZone: "Messaging Zone",
      todaysPresence: "Today's Presence",
      me: "Me",
      orderHistory: "Order History",
      appliedActivities: "Applied Activities",
      studentConnect: "Student Connect",
      teacherMessaging: "Teacher Messaging Zone",
      coCurriculum: "Co-Curriculum Portal",
      instantDelivery: "Instant Delivery Form",
    },
    bn: {
      welcome: "আপনার ড্যাশবোর্ডে স্বাগতম!",
      messagingZone: "বার্তা অঞ্চল",
      todaysPresence: "আজকের উপস্থিতি",
      me: "আমি",
      orderHistory: "অর্ডারের ইতিহাস",
      appliedActivities: "আবেদনকৃত কার্যক্রম",
      studentConnect: "ছাত্র সংযোগ",
      teacherMessaging: "শিক্ষক বার্তা অঞ্চল",
      coCurriculum: "সহ-পাঠ্যক্রম পোর্টাল",
      instantDelivery: "তাত্ক্ষণিক ডেলিভারি ফর্ম",
    },
    zh: {
      welcome: "欢迎来到您的仪表板！",
      messagingZone: "消息区",
      todaysPresence: "今天的出席",
      me: "我",
      orderHistory: "订单历史",
      appliedActivities: "申请的活动",
      studentConnect: "学生连接",
      teacherMessaging: "教师消息区",
      coCurriculum: "共同课程门户",
      instantDelivery: "即时交付表单",
    },
    ja: {
      welcome: "あなたのダッシュボードへようこそ！",
      messagingZone: "メッセージゾーン",
      todaysPresence: "今日の出席",
      me: "私",
      orderHistory: "注文履歴",
      appliedActivities: "申請した活動",
      studentConnect: "学生接続",
      teacherMessaging: "教師メッセージゾーン",
      coCurriculum: "共通カリキュラムポータル",
      instantDelivery: "即時配信フォーム",
    },
    ko: {
      welcome: "대시보드에 오신 것을 환영합니다!",
      messagingZone: "메시지 구역",
      todaysPresence: "오늘의 출석",
      me: "나",
      orderHistory: "주문 내역",
      appliedActivities: "신청한 활동",
      studentConnect: "학생 연결",
      teacherMessaging: "교사 메시지 구역",
      coCurriculum: "공동 커리큘럼 포털",
      instantDelivery: "즉시 배달 양식",
    },
    ru: {
      welcome: "Добро пожаловать на вашу панель управления!",
      messagingZone: "Зона сообщений",
      todaysPresence: "Сегодняшнее присутствие",
      me: "Я",
      orderHistory: "История заказов",
      appliedActivities: "Поданные заявки",
      studentConnect: "Студенческое соединение",
      teacherMessaging: "Зона сообщений учителей",
      coCurriculum: "Портал совместной учебной программы",
      instantDelivery: "Форма мгновенной доставки",
    },
    de: {
      welcome: "Willkommen auf Ihrem Dashboard!",
      messagingZone: "Nachrichtenbereich",
      todaysPresence: "Heutige Anwesenheit",
      me: "Ich",
      orderHistory: "Bestellverlauf",
      appliedActivities: "Angewandte Aktivitäten",
      studentConnect: "Studentenverbindung",
      teacherMessaging: "Lehrer-Nachrichtenbereich",
      coCurriculum: "Co-Curriculum-Portal",
      instantDelivery: "Sofortlieferformular",
    },
    la: {
      welcome: "Salve ad tabulam tuam!",
      messagingZone: "Zona nuntiorum",
      todaysPresence: "Hodie praesentia",
      me: "Ego",
      orderHistory: "Historia ordinum",
      appliedActivities: "Activitates applicatae",
      studentConnect: "Coniunctio discipulorum",
      teacherMessaging: "Zona nuntiorum magistrorum",
      coCurriculum: "Portal co-curriculum",
      instantDelivery: "Forma instantis traditionis",
    },
    fr: {
      welcome: "Bienvenue sur votre tableau de bord !",
      messagingZone: "Zone de messagerie",
      todaysPresence: "Présence d'aujourd'hui",
      me: "Moi",
      orderHistory: "Historique des commandes",
      appliedActivities: "Activités appliquées",
      studentConnect: "Connexion des étudiants",
      teacherMessaging: "Zone de messagerie des enseignants",
      coCurriculum: "Portail de co-curriculum",
      instantDelivery: "Formulaire de livraison instantanée",
    },
  };

  const selectedTranslations = translations[language] || translations.en;

  // Update text content based on selected language
  document.querySelector('h1').textContent = selectedTranslations.welcome;
  document.querySelector('#messaging-zone h2').textContent = selectedTranslations.messagingZone;
  document.querySelector('#todays-presence h2').textContent = selectedTranslations.todaysPresence;

  // Update navigation items
  document.querySelector('nav ul li:nth-child(1) a').textContent = selectedTranslations.me;
  document.querySelector('nav ul li:nth-child(2) a').textContent = selectedTranslations.messagingZone;
  document.querySelector('nav ul li:nth-child(3) a').textContent = selectedTranslations.todaysPresence;
}

// Function to update the current time
function updateTime() {
    const now = new Date();
    const options = { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }; // Set hour12 to true for 12-hour format
    const timeString = now.toLocaleTimeString([], options);
    document.getElementById('current-time').innerText = `Current Time: ${timeString}`;
}

// Update the time every second
setInterval(updateTime, 1000);

// Initial call to display the time immediately
updateTime();

// Function to show the "Me" section and hide others
function showMeSection() {
    document.getElementById('me').style.display = 'block';
    document.getElementById('messaging-zone').style.display = 'none';
    document.getElementById('todays-presence').style.display = 'none';
}

// Function to show the "Messaging Zone" section and hide others
function showMessagingZone() {
    document.getElementById('messaging-zone').style.display = 'block';
    document.getElementById('me').style.display = 'none';
    document.getElementById('todays-presence').style.display = 'none';
}

// Function to show the "Today's Presence" section and hide others
function showTodaysPresenceSection() {
    document.getElementById('todays-presence').style.display = 'block';
    document.getElementById('me').style.display = 'none';
    document.getElementById('messaging-zone').style.display = 'none';
}

// Event listener for the "Me" link
document.querySelector('nav ul li:nth-child(1) a').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    showMeSection(); // Show the "Me" section
});

// Function to show the edit profile form
function showEditProfileForm() {
    document.getElementById('edit-profile-form').style.display = 'block'; // Show the edit form
    document.getElementById('profile-info').style.display = 'none'; // Hide the profile info
}

// Function to save the profile changes
function saveProfileChanges() {
    // Get values from the form
    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    const department = document.getElementById('department').value;
    const position = document.getElementById('position').value;
    const phone = document.getElementById('phone').value;
    const profilePic = document.getElementById('profile-pic-input').value;

    // Update the profile info displayed
    document.getElementById('profile-name').textContent = name;
    document.getElementById('profile-id').textContent = id;
    document.getElementById('profile-department').textContent = department;
    document.getElementById('profile-position').textContent = position;
    document.getElementById('profile-phone').textContent = phone;
    document.getElementById('profile-pic').src = profilePic; // Update profile picture

    // Hide the edit form and show the profile info
    document.getElementById('edit-profile-form').style.display = 'none';
    document.getElementById('profile-info').style.display = 'block';
}

// Event listener for the "Edit Profile" button
document.getElementById('edit-profile-btn').addEventListener('click', showEditProfileForm);

// Event listener for the "Save Changes" button
document.getElementById('save-profile-btn').addEventListener('click', saveProfileChanges);

// Event listener for the "Cancel" button
document.getElementById('cancel-edit-btn').addEventListener('click', function() {
    document.getElementById('edit-profile-form').style.display = 'none'; // Hide the edit form
    document.getElementById('profile-info').style.display = 'block'; // Show the profile info
});

// Event listener for the "Messaging Zone" link
document.getElementById('messaging-zone-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    showMessagingZone(); // Show the "Messaging Zone" section
});

// Function to send a message from teacher to teacher
document.getElementById('send-teacher-message').addEventListener('click', function() {
    const messageInput = document.getElementById('teacher-message-input');
    const message = messageInput.value.trim();

    if (message === '') return;

    socket.emit("send_message", {
        sender: "Teacher",
        message: message 
    });

    messageInput.value = '';
});

// Function to send a message from teacher to student
document.getElementById('send-student-message').addEventListener('click', function() {
    const messageInput = document.getElementById('student-message-input');
    const message = messageInput.value.trim();

    if (message === '') return;

    socket.emit("send_message", {
        sender: "Teacher",
        message: message 
    });

    messageInput.value = '';
});

// Function to add messages to chat history
function addToChatHistory(sender, message) {
    const chatHistoryContent = document.getElementById('chat-history-content');
    const historyElement = document.createElement('div');
    historyElement.textContent = `${sender}: ${message}`;
    chatHistoryContent.appendChild(historyElement);
}

// Call the function to populate the messaging zone on page load
window.onload = function() {
    showMeSection(); // Show the "Me" section when the page loads
};


  // Function to toggle the chatbot visibility
    function toggleChatbot() {
        const chatbot = document.getElementById('chatbot');
        const chatbotIcon = document.getElementById('chatbot-icon');

        if (chatbot.style.display === 'none' || chatbot.style.display === '') {
            chatbot.style.display = 'flex'; // Show the chatbox
            chatbotIcon.style.display = 'none'; // Hide the chatbot icon
        } else {
            chatbot.style.display = 'none'; // Hide the chatbox
            chatbotIcon.style.display = 'block'; // Show the chatbot icon
        }
    }

   // Function to send a message
function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    if (message) {
        displayMessage('You: ' + message, 'you');
        input.value = ''; // Clear input field
        // Simulate a response from the chatbot
        setTimeout(() => {
            displayMessage('Chatbot: ' + getChatbotResponse(message), 'chatbot');
        }, 1000);
    }
}

// Function to display messages in the chat
function displayMessage(message, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = `message message-${sender}`; // Apply class based on sender
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
}

// Function to get a simple chatbot response
function getChatbotResponse(message) {
    // Simple responses based on user input
    if (message.toLowerCase().includes('hello')) {
        return 'Hello! How can I assist you today?';
    } else if (message.toLowerCase().includes('help')) {
        return 'Sure! What do you need help with?';
    } else {
        return 'I am here to help! Please ask me anything.';
    }
}

// Event listeners for sending messages
document.getElementById('send-message').addEventListener('click', sendMessage);
document.getElementById('chatbot-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
   onclick="togglechatbot('close')"

// Event listener for the "Today's Presence" link
document.getElementById('todays-presence-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    showTodaysPresenceSection(); // Show the "Today's Presence" section
});

// Function to display absence reasons
function displayAbsenceReasons() {
    const absenceReasonList = document.getElementById('absence-reason-list');
    absenceReasonList.innerHTML = ''; // Clear existing reasons

    // Sample absence reasons (for demonstration)
    const absenceReasons = [
        "Student 1: Sick",
        "Student 2: Family Emergency",
        // Add more sample reasons as needed
    ];

    if (absenceReasons.length > 0) {
        absenceReasons.forEach(reason => {
            const reasonDiv = document.createElement('div');
            reasonDiv.textContent = reason;
            absenceReasonList.appendChild(reasonDiv);
        });
    } else {
        absenceReasonList.textContent = 'No absence reasons submitted yet.';
    }
}

// Receive live messages
socket.on("receive_message", (data) => {
    const teacherChat = document.getElementById("teacher-chat");
    const studentChat = document.getElementById("student-chat");
    const messageElement = document.createElement("div");

    messageElement.textContent = `${data.sender}: ${data.message}`;
    
    teacherChat.appendChild(messageElement.cloneNode(true));
    studentChat.appendChild(messageElement);

    teacherChat.scrollTop = teacherChat.scrollHeight;
    studentChat.scrollTop = studentChat.scrollHeight;
});


// Consolidate all onload functions
window.onload = function() {
    populateMessagingZone();
    showMeSection(); // Show the "Me" section when the page loads
     displayAbsenceReasons();
};
