-- Create the database
CREATE DATABASE IF NOT EXISTS student_resource;

-- Use the created database
USE student_resource;

-- Create the users table
CREATE TABLE IF NOT EXISTS studentusers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    remember_token VARCHAR(64),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);