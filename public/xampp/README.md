# Roshan Solar Pakistan Demo - XAMPP Deployment Guide

This folder contains the complete, standalone HTML, CSS, JavaScript, PHP, and MySQL files for running the Roshan Solar website demo locally in XAMPP.

---

## 1. Directory Structure in XAMPP

Copy all files from this `xampp/` directory directly into your XAMPP web root:

```text
C:\xampp\htdocs\roshan-solar\
├── index.php          (or index.html) - Main semantic homepage
├── process-quote.php  - Server-side quote validator and database processor
├── database.sql       - MySQL table schema and demo records
├── style.css          - Complete standalone CSS stylesheet
├── app.js             - Interactive ROI calculator, validation, and WhatsApp logic
├── quotes_log.csv     - (Auto-created fallback if MySQL is not yet configured)
└── README.md          - This deployment documentation
```

---

## 2. Step-by-Step Installation Instructions

### Step 1: Start XAMPP Services
1. Open the **XAMPP Control Panel** (`xampp-control.exe`).
2. Click **Start** next to **Apache**.
3. Click **Start** next to **MySQL**.
4. Verify both display green status indicators.

### Step 2: Place the Website Files
1. Navigate to your XAMPP installation directory: `C:\xampp\htdocs\`
2. Create a folder named: `roshan-solar`
3. Copy all files (`index.php`, `process-quote.php`, `database.sql`, `style.css`, `app.js`) into `C:\xampp\htdocs\roshan-solar\`.

### Step 3: Create & Import the MySQL Database
1. Open your browser and go to: `http://localhost/phpmyadmin/`
2. Click on the **Databases** tab.
3. Enter database name: `roshan_solar_db` and click **Create**.
4. Click on the **Import** tab at the top.
5. Click **Choose File** and select `C:\xampp\htdocs\roshan-solar\database.sql`.
6. Scroll down and click **Import** (or **Go**).
7. You should see the `quotes` table created with 3 sample demo records.

*Note:* If you skip this step or test without MySQL, `process-quote.php` will automatically log submitted quotes into `quotes_log.csv` without throwing errors!

### Step 4: Access the Website
Open your browser and navigate to:
```text
http://localhost/roshan-solar/
```

---

## 3. Configuration & Customization

### Configuring Your WhatsApp Number
- In `process-quote.php` (line 15):
  ```php
  $whatsapp_number = '923001234567'; // Change to your company WhatsApp number
  ```
- In `app.js` (line 3):
  ```javascript
  const WHATSAPP_NUMBER = '923001234567'; // Enter your 12-digit number without '+'
  ```

### Database Credentials
If your MySQL has a password or custom user, edit `process-quote.php` (lines 10-14):
```php
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';          // Add your password if set
$db_name = 'roshan_solar_db';
```

---

## 4. Testing Checklist for Links & Interactive Elements

| Element / Flow | Test Procedure | Expected Outcome |
| :--- | :--- | :--- |
| **Top Navigation** | Click `Services`, `Solar Calculator`, `Projects`, `Why Us`, `FAQ`, `Contact` | Smooth scrolls to the respective semantic section on page |
| **WhatsApp Buttons** | Click "Chat on WhatsApp" in Hero, Header, and Floating widget | Opens WhatsApp Web or WhatsApp App with prefilled introductory text |
| **Solar ROI Calculator** | Adjust monthly bill slider (e.g., PKR 75,000) and change DISCO | Instantly recalculates suggested system size (kW), monthly savings (PKR), and payback period |
| **Calculator -> WhatsApp** | Click "Send This Estimate to WhatsApp" in Calculator | WhatsApp opens with the calculated kW, estimated savings, and selected city pre-filled |
| **Project Filters** | Click `All`, `Residential`, `Commercial`, `Agricultural` tabs | Live filters project cards without reloading the page |
| **FAQ Accordions** | Click on any question | Smoothly expands the answer while collapsing or co-existing cleanly |
| **Quote Request Form** | Submit blank fields | Shows inline error messages on Name, Pakistani Phone (`03xx-xxxxxxx`), City, and Bill |
| **Quote Request Form** | Fill valid data and click "Submit Inquiry" | Sends AJAX POST to `process-quote.php`, writes to MySQL/CSV, and presents receipt modal with reference ID |
| **Mobile Navigation** | Resize browser to mobile (< 768px) and tap hamburger button | Responsive mobile menu drawer opens; clicking any link scrolls and closes drawer |

---

## 5. Items Requiring Production Configuration

Before deploying live on a commercial hosting server (cPanel, AWS, VPS):
1. **Domain & SSL**: Install an SSL certificate (HTTPS) so geolocation and WhatsApp deep links work seamlessly.
2. **Real WhatsApp Number**: Update `923001234567` with the business official WhatsApp number.
3. **Database Security**: Change MySQL username and password from default `root` with no password.
4. **Email SMTP Setup**: Optionally configure PHPMailer in `process-quote.php` to receive instant email notifications for new inquiries.
5. **Real Company Address & NTN**: Replace demo addresses and NTN/GST placeholder credentials.
