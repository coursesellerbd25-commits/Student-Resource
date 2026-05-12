# Student Resource

A backend-focused full-stack university management platform built with PHP, MySQL, Node.js, Express.js, and Socket.IO, featuring multi-user authentication and real-time communication functionalities for students, teachers, and administrators.

---

## 🌐 Live Demo

🔗 Live Website: https://studentresource.infinityfree.me/

🔗 GitHub Repository: https://github.com/coursesellerbd25-commits/Student-Resource

---

## 📌 Overview

Student Resource is a university-focused full-stack web application designed to manage academic activities through role-based access systems.

The platform supports multiple user roles including:

- Admin
- Teacher
- Student

The system was developed as a backend-focused university project with emphasis on:

- Authentication systems
- Database management
- User role separation
- Real-time communication
- Full-stack application architecture

---

## ✨ Features

### 👨‍🎓 Student Features
- Student registration & login
- Apply for academic activities
- Real-time interaction support

### 👨‍🏫 Teacher Features
- Monitor student participation
- Provide real-time interaction to student, admin and other teachers

### 🛠 Admin Features
- Manage all users
- Control activities and resources
- Database management functionalities

### ⚡ System Features
- Multi-user authentication
- Role-based dashboard system
- Real-time communication using Socket.IO
- MySQL database integration
- Backend-focused architecture
- Responsive interface design

---

## 🛠 Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- PHP
- Node.js
- Express.js
- Socket.IO

### Database
- MySQL

### Hosting
- InfinityFree
- Render

---

## 📷 Screenshots (desktop mode)

### 🔐 Student Authentication System
(login page)

```md
/public/screenshots/studentLogin.png
```

### 🔐 Teacher Authentication System
(login page)

```md
/public/screenshots/teacherLogin.png
```

### 🔐 Admin Authentication System
(login page)

```md
/public/screenshots/adminLogin.png
```

### 👨‍🎓 Student Dashboard
(student panel)

```md
/public/screenshots/studentDashboard.png
```

### 👨‍🏫 Teacher Dashboard
(teacher dashboard)

```md
/public/screenshots/teacherDashboard.png
```

### 🛠 Admin Dashboard
(admin panel)

```md
/public/screenshots/adminDashboard.png
```

### ⚡ Real-Time Features
(socket.io / live interaction feature)

---

## ⚙️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/coursesellerbd25-commits/Student-Resource.git
```

Move into project directory:

```bash
cd Student-Resource
```

---

## 🗄 Database Setup

1. Create a MySQL database
2. Import the provided SQL file
3. Update database configuration:

```php
$host = "localhost";
$user = "root";
$password = "";
$database = "student_resource";
```

---

## ▶️ Run Backend Server

Install Node.js dependencies:

```bash
npm install
```

Run the Express server

```bash
node server.js
```

---

## 📂 Project Structure

```bash
Student-Resource/
|
├── css/
├── js/
├── php/
├── database/
├── socket/
├── server.js
└── README.md
```

---

## 🔐 User Roles

| Role |Permissions |
|------|------------|
| Admin | Full system management |
| Teacher | Activity/resource management |
| Student | Apply and access resources |

---

## 🧩 Challenges Faced

During development, one of the main challenges was integrating multiple technologies into a single full-stack workflow.

Key Challeges Included:

- Managing role-based authentication
- Configuring MySQL relationships
- Handling real-time communication using Socket.IO
- Synchronizing PHP backend logic with Node.js services
- Maintaining session management across multiple user types

---

## 📈 What I Learnt

This project strengthened my understanding of: 

- Full-stack web application architecture
- Backend-focused system design
- MySQL relational database management
- Authentication and authorization systems
- Express.js server handling
- Real-time communication using Socket.IO
- Multi-user dashboard development

---

## 🔮 Future Improvements

- JWT authentication system
- REST API architecture
- Improved UI/UX design
- Notification system
- Better security practices

---

## 👨‍💻 Author

Developed by Sultana Jahan Tahmina

- GitHub: https://github.com/coursesellerbd25-commits
- Portfolio: https://coursesellerbd25-commits.github.io/My-Portfolio-2025/

---

## ⭐ Support 
If you found this project useful, consider giving it a star ⭐ on GitHub.
