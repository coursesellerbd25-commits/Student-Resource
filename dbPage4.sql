-- Use the existing database
USE student_resource;

-- Create the teacher absence reasons table
CREATE TABLE IF NOT EXISTS teacher_absence_reasons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id INT NOT NULL, -- Changed to teacher_id for clarity
    reason TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES teacher_login_register(id) ON DELETE CASCADE -- Assuming you have a teachers table
);