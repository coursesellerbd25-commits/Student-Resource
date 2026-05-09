// Function to change language
function changeLanguage() {
  const language = document.getElementById('language-settings').value; // Corrected ID
  const translations = {
    en: {
      welcome: "Welcome to Your Dashboard!",
      coCurriculum: "Co-Curriculum Activities List",
      todaysPresence: "Today's Presence",
      me: "Me",
    },
    bn: {
      welcome: "আপনার ড্যাশবোর্ডে স্বাগতম!",
      coCurriculum: "সহ-কারিকুলাম কার্যক্রমের তালিকা",
      todaysPresence: "আজকের উপস্থিতি",
      me: "আমি",
    },
    zh: {
      welcome: "欢迎来到您的仪表板！",
      coCurriculum: "课外活动列表",
      todaysPresence: "今天的出席",
      me: "我",
    },
    ja: {
      welcome: "あなたのダッシュボードへようこそ！",
      coCurriculum: "課外活動リスト",
      todaysPresence: "今日の出席",
      me: "私",
    },
    ko: {
      welcome: "대시보드에 오신 것을 환영합니다!",
      coCurriculum: "교과 외 활동 목록",
      todaysPresence: "오늘의 출석",
      me: "나",
    },
    ru: {
      welcome: "Добро пожаловать на вашу панель управления!",
      coCurriculum: "Список внеучебных мероприятий",
      todaysPresence: "Сегодняшнее присутствие",
      me: "Я",
    },
    de: {
      welcome: "Willkommen auf Ihrem Dashboard!",
      coCurriculum: "Liste der außerschulischen Aktivitäten",
      todaysPresence: "Heutige Anwesenheit",
      me: "Ich",
    },
    la: {
      welcome: "Salve ad tabulam tuam!",
      coCurriculum: "Index Activitatum Co-Curricularum",
      todaysPresence: "Hodie praesentia",
      me: "Ego",
    },
    fr: {
      welcome: "Bienvenue sur votre tableau de bord !",
      coCurriculum: "Liste des activités parascolaires",
      todaysPresence: "Présence d'aujourd'hui",
      me: "Moi",
    },
  };

  const selectedTranslations = translations[language] || translations.en;

  // Update text content based on selected language
  document.querySelector('h1').textContent = selectedTranslations.welcome;
  document.querySelector('#co-curriculum-link').textContent = selectedTranslations.coCurriculum; // Updated selector
  document.querySelector('#todays-presence-link').textContent = selectedTranslations.todaysPresence; // Updated selector

  // Update navigation items
  document.querySelector('nav ul li:nth-child(1) a').textContent = selectedTranslations.me;
  document.querySelector('nav ul li:nth-child(2) a').textContent = selectedTranslations.coCurriculum;
  document.querySelector('nav ul li:nth-child(3) a').textContent = selectedTranslations.todaysPresence;
}

// Display current time in AM-PM format
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Ensure two digits
    const seconds = now.getSeconds().toString().padStart(2, '0'); // Ensure two digits
    const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    document.getElementById('current-time').textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

// Call updateTime every second
setInterval(updateTime, 1000);
updateTime(); // Initial call to display time immediately

// Logout button functionality
document.getElementById('logout-button').addEventListener('click', function() {
    window.location.href = 'admin_login.php'; // Change to your login page
});


// Function to show the "Me" section and hide others
function showMeSection() {
    document.getElementById('me').style.display = 'block';
    document.getElementById('co-curriculum').style.display = 'none';
    document.getElementById('todays-presence').style.display = 'none';
}

// Function to show the "Co-Curriculum Activities" section and hide others
function showMessagingZone() {
    document.getElementById('co-curriculum').style.display = 'block';
    document.getElementById('me').style.display = 'none';
    document.getElementById('todays-presence').style.display = 'none';
}

// Function to show the "Today's Presence" section and hide others
function showTodaysPresenceSection() {
    document.getElementById('todays-presence').style.display = 'block';
    document.getElementById('me').style.display = 'none';
    document.getElementById('co-curriculum').style.display = 'none';
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

// Function to show the "Co-Curriculum Activities" section and hide others
function showCoCurriculumSection() {
    document.getElementById('co-curriculum').style.display = 'block';
    document.getElementById('me').style.display = 'none';
    document.getElementById('todays-presence').style.display = 'none';
}

// Event listener for the "Co-Curriculum Activities List" link
document.querySelector('#co-curriculum-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    showCoCurriculumSection(); // Show the "Co-Curriculum Activities" section
});

// Function to show the activity form for adding a new activity
document.getElementById('add-activity-btn').addEventListener('click', function() {
    currentEditIndex = null; // Reset edit index
    document.getElementById('form-title').innerText = 'Add New Activity';
    document.getElementById('activity-title').value = '';
    document.getElementById('activity-type').value = '';
    document.getElementById('activity-learn').value = '';
    document.getElementById('activity-deadline').value = '';
    document.getElementById('activity-form').style.display = 'block'; // Show form
});

// Event listener for the "Save Activity" button
document.getElementById('save-activity-btn').addEventListener('click', function() {
    const title = document.getElementById('activity-title').value;
    const type = document.getElementById('activity-type').value;
    const learn = document.getElementById('activity-learn').value;
    const deadline = document.getElementById('activity-deadline').value;

    fetch('add_activityPage6.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 
            `title=${encodeURIComponent(title)}&type=${encodeURIComponent(type)}&learn=${encodeURIComponent(learn)}&deadline=${encodeURIComponent(deadline)}`
    })
    .then(response => response.text())
    .then(data => {
        if(data.trim() === "success") {
            alert("Activity Published Successfully!");
            location.reload();
        } else {
            alert(data);
        }
    });
});

// Event listener for the "Cancel" button
document.getElementById('cancel-btn').addEventListener('click', function() {
    document.getElementById('activity-form').style.display = 'none'; // Hide form
});

let currentEditIndex = null; // To track which activity is being edited

// Function to toggle the visibility of the applied students drawer
function toggleAppliedStudents(activityIndex) {
    const drawer = document.getElementById(`drawer-${activityIndex}`);
    const studentsList = document.getElementById(`applied-students-list-${activityIndex}`);
    studentsList.innerHTML = ''; // Clear existing list
    const students = appliedStudents[activityIndex] || [];
    students.forEach(student => {
        const listItem = document.createElement('li');
        listItem.textContent = student;
        studentsList.appendChild(listItem);
    });
    // Toggle drawer visibility
    if (drawer.style.display === 'none') {
        drawer.style.display = 'block'; // Show drawer
    } else {
        drawer.style.display = 'none'; // Hide drawer
    }
}
// Event listener for the "Close" button in the modal
document.getElementById('close-modal-btn').addEventListener('click', function() {
    document.getElementById('applied-students-modal').style.display = 'none'; // Hide modal
});

// Chatbot button functionality
document.getElementById('chatbot-button').addEventListener('click', function() {

    // Create a simple chatbot interface
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'chatbot-container';
    chatbotContainer.style.position = 'fixed';
    chatbotContainer.style.bottom = '80px'; // Position above the button
    chatbotContainer.style.right = '20px';
    chatbotContainer.style.width = '300px'; // Width of the chatbot
    chatbotContainer.style.height = '400px'; // Height of the chatbot
    chatbotContainer.style.backgroundColor = '#fff'; // Background color
    chatbotContainer.style.border = '1px solid #ccc'; // Border
    chatbotContainer.style.borderRadius = '5px'; // Rounded corners
    chatbotContainer.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)'; // Shadow
    chatbotContainer.style.zIndex = '1000'; // Ensure it appears above other elements

     // Add a header to the chatbot
    const header = document.createElement('div');
    header.style.backgroundColor = '#001f3f'; // Dark navy color
    header.style.color = '#fff'; // White text
    header.style.padding = '10px';
    header.style.textAlign = 'center';
    header.innerText = 'Chatbot';

     // Create a close button
    const closeButton = document.createElement('button');
    closeButton.innerText = '✖'; // Cross symbol
    closeButton.style.position = 'absolute';
    closeButton.style.top = '5px';
    closeButton.style.right = '10px';
    closeButton.style.background = 'none'; // No background
    closeButton.style.border = 'none'; // No border
    closeButton.style.color = '#fff'; // White text
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '16px'; // Adjust size

   // Append close button to header
    header.appendChild(closeButton);
    chatbotContainer.appendChild(header);

    // Add a content area for messages
    const content = document.createElement('div');
    content.style.height = '300px'; // Height for messages
    content.style.overflowY = 'auto'; // Scrollable content
    content.style.padding = '10px';
    chatbotContainer.appendChild(content);

    // Add an input area for user messages
    const inputArea = document.createElement('div');
    inputArea.style.display = 'flex';
    inputArea.style.padding = '10px';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type a message...';
    input.style.flex = '1'; // Take available space
    input.style.padding = '5px';
    input.style.border = '1px solid #ccc';
    input.style.borderRadius = '4px';

    const sendButton = document.createElement('button');
    sendButton.innerText = 'Send';
    sendButton.style.marginLeft = '5px';
    sendButton.style.padding = '5px 10px';
    sendButton.style.border = 'none';
    sendButton.style.borderRadius = '4px';
    sendButton.style.backgroundColor = '#001f3f'; // Match header color
    sendButton.style.color = '#fff'; // White text
    sendButton.style.cursor = 'pointer';

    // Append input and button to the input area
    inputArea.appendChild(input);
    inputArea.appendChild(sendButton);
    chatbotContainer.appendChild(inputArea);

    // Append the chatbot container to the body
    document.body.appendChild(chatbotContainer);

    // Handle send button click
    sendButton.addEventListener('click', function() {
        const userMessage = input.value;
        if (userMessage) {
            // Display user message on the right
            const userMessageElement = document.createElement('div');
            userMessageElement.innerText = `You: ${userMessage}`;
            userMessageElement.style.textAlign = 'right'; // Align text to the right
            userMessageElement.style.margin = '5px 0'; // Add some margin
            content.appendChild(userMessageElement);
            input.value = ''; // Clear input

            // Simulate a bot response (you can replace this with actual bot logic)
            setTimeout(() => {
                const botMessageElement = document.createElement('div');
                botMessageElement.innerText = `Bot: This is a response to "${userMessage}"`;
                botMessageElement.style.textAlign = 'left'; // Align text to the left
                botMessageElement.style.margin = '5px 0'; // Add some margin
                content.appendChild(botMessageElement);
                content.scrollTop = content.scrollHeight; // Scroll to the bottom
            }, 1000);
        }
    });

    // Close button functionality
    closeButton.addEventListener('click', function() {
        document.body.removeChild(chatbotContainer); // Remove the chatbot container from the DOM
    });
});

// Function to show the "Today's Presence" section and hide others
function showTodaysPresenceSection() {
    document.getElementById('todays-presence').style.display = 'block';
    document.getElementById('me').style.display = 'none';
    document.getElementById('co-curriculum').style.display = 'none';
    renderPresenceList(); // Render presence list when section is shown
}

// Event listener for the "Today's Presence" link
document.querySelector('#todays-presence-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    showTodaysPresenceSection(); // Show the "Today's Presence" section
});
