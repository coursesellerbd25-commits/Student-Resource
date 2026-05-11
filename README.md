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
-InfinityFree
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
