-- Roshan Solar Pakistan Demo Database Schema
-- Compatible with MySQL / MariaDB on XAMPP

CREATE DATABASE IF NOT EXISTS `roshan_solar_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `roshan_solar_db`;

-- Table structure for `quotes`
CREATE TABLE IF NOT EXISTS `quotes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `reference_no` VARCHAR(32) NOT NULL UNIQUE,
  `full_name` VARCHAR(120) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `city` VARCHAR(60) NOT NULL,
  `monthly_bill_pkr` INT NOT NULL,
  `disco_provider` VARCHAR(50) NOT NULL,
  `system_type` VARCHAR(50) NOT NULL,
  `property_type` VARCHAR(50) NOT NULL,
  `roof_type` VARCHAR(50) DEFAULT 'Flat Concrete',
  `recommended_kw` DECIMAL(5,2) NOT NULL,
  `estimated_monthly_savings_pkr` INT NOT NULL,
  `comments` TEXT NULL,
  `status` ENUM('new', 'contacted', 'site_survey_scheduled', 'closed') DEFAULT 'new',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Sample demo entries
INSERT INTO `quotes` (`reference_no`, `full_name`, `phone`, `city`, `monthly_bill_pkr`, `disco_provider`, `system_type`, `property_type`, `recommended_kw`, `estimated_monthly_savings_pkr`, `comments`, `status`)
VALUES 
('RS-DEMO-1001', 'Muhammad Usman Tariq', '03001234567', 'Lahore', 85000, 'LESCO', 'Hybrid with Battery', '1 Kanal House', 12.00, 76800, 'Need quote for DHA Phase 5. Require 15kWh LiFePO4 battery.', 'site_survey_scheduled'),
('RS-DEMO-1002', 'Farhan Siddiqui', '03219876543', 'Karachi', 140000, 'K-Electric', 'On-Grid Net Metered', 'Commercial Office', 20.00, 128000, 'Looking for fast-track net metering on Shahrah-e-Faisal.', 'contacted'),
('RS-DEMO-1003', 'Chaudhry Riaz Ahmed', '03456789012', 'Multan', 220000, 'MEPCO', 'Agricultural Tubewell', 'Farm / Tubewell', 25.00, 180000, '20 HP turbine tubewell running on high diesel cost.', 'new');
