-- Use the created database
USE student_resource;

-- Create the admin_students table
CREATE TABLE IF NOT EXISTS admin_students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL, -- Made NOT NULL for consistency
    student_id VARCHAR(50) UNIQUE,
    presence ENUM('Present', 'Absent'),
    teacher_submitted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Added created_at field
);