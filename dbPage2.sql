-- Use the created database
USE student_resource;

-- Table for attendance
CREATE TABLE IF NOT EXISTS studentattendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    attendance_counted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES studentusers(id) ON DELETE CASCADE -- Corrected to reference studentusers
);

-- Table for absence reasons
CREATE TABLE IF NOT EXISTS studentabsence_reasons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    reason TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES studentusers(id) ON DELETE CASCADE -- Related to those registered students
);

-- Table for orders
CREATE TABLE IF NOT EXISTS studentorders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_details TEXT NOT NULL,
    order_status ENUM('Pending', 'In Progress', 'Delivered', 'Cancelled') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES studentusers(id) ON DELETE CASCADE -- Related to those registered students
);

-- Table for Delivery Man
CREATE TABLE IF NOT EXISTS delivery_agents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    availability VARCHAR(255) NOT NULL,
    areas VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES studentusers(id) ON DELETE CASCADE -- Related to those registered students
);

-- Table for activities (co-curricular)
CREATE TABLE IF NOT EXISTS studentactivities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(100) NOT NULL,
    deadline DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for applied activities
CREATE TABLE IF NOT EXISTS studentapplied_activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    activity_id INT NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES studentusers(id) ON DELETE CASCADE, -- Corrected to reference studentusers
    FOREIGN KEY (activity_id) REFERENCES studentactivities(id) ON DELETE CASCADE -- Corrected to reference studentactivities
);