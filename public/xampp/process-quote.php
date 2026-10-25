<?php
/**
 * Roshan Solar Pakistan - Quote Processor Script
 * Handles front-end quote form submissions, saves to MySQL (or fallback CSV),
 * and prepares WhatsApp message payload.
 */

header('Content-Type: application/json; charset=utf-8');

// Configuration
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'roshan_solar_db';
$whatsapp_number = '923001234567'; // Configurable WhatsApp sales number

// Ensure request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

// Read JSON input or standard POST data
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

// Sanitize inputs
$fullName     = trim(filter_var($input['fullName'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));
$phone        = trim(filter_var($input['phone'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));
$city         = trim(filter_var($input['city'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));
$monthlyBill  = intval($input['monthlyBill'] ?? 0);
$disco        = trim(filter_var($input['disco'] ?? 'LESCO', FILTER_SANITIZE_SPECIAL_CHARS));
$systemType   = trim(filter_var($input['systemType'] ?? 'On-Grid Net Metered', FILTER_SANITIZE_SPECIAL_CHARS));
$propertyType = trim(filter_var($input['propertyType'] ?? '1 Kanal House', FILTER_SANITIZE_SPECIAL_CHARS));
$roofType     = trim(filter_var($input['roofType'] ?? 'Flat Concrete', FILTER_SANITIZE_SPECIAL_CHARS));
$comments     = trim(filter_var($input['comments'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));

// Validation
$errors = [];
if (strlen($fullName) < 3) {
    $errors['fullName'] = 'Please enter a valid full name (minimum 3 characters).';
}

// Pakistani phone regex: 03xx-xxxxxxx or +923xxxxxxxxx
$cleanPhone = preg_replace('/[^0-9]/', '', $phone);
if (strlen($cleanPhone) < 10 || strlen($cleanPhone) > 13) {
    $errors['phone'] = 'Please enter a valid Pakistani mobile number (e.g., 0300-1234567).';
}

if (empty($city)) {
    $errors['city'] = 'Please select your city.';
}

if ($monthlyBill < 5000) {
    $errors['monthlyBill'] = 'Average monthly bill should be at least PKR 5,000.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Validation failed. Please correct the highlighted fields.',
        'errors'  => $errors
    ]);
    exit;
}

// Estimate system capacity and savings
// Rule of thumb in Pakistan: 1 kW generates approx 125 units/month. Average tariff approx Rs. 62/unit.
$estimatedUnitsNeeded = $monthlyBill / 62;
$recommendedKw = max(3.0, round($estimatedUnitsNeeded / 125, 1));
$estimatedMonthlySavings = intval($recommendedKw * 125 * 58); // conservative ~90% savings

$referenceNo = 'RS-' . date('Ymd') . '-' . rand(1000, 9999);

$dbSaved = false;

// Attempt MySQL connection
try {
    $mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name);
    if (!$mysqli->connect_error) {
        $stmt = $mysqli->prepare("INSERT INTO quotes (reference_no, full_name, phone, city, monthly_bill_pkr, disco_provider, system_type, property_type, roof_type, recommended_kw, estimated_monthly_savings_pkr, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        if ($stmt) {
            $stmt->bind_param("ssssissssdis", 
                $referenceNo, $fullName, $phone, $city, $monthlyBill, 
                $disco, $systemType, $propertyType, $roofType, 
                $recommendedKw, $estimatedMonthlySavings, $comments
            );
            $stmt->execute();
            $stmt->close();
            $dbSaved = true;
        }
        $mysqli->close();
    }
} catch (Exception $e) {
    // If MySQL is not configured yet in XAMPP, smoothly fallback to CSV logging so no data is lost!
}

// Fallback CSV log if database is not initialized yet
if (!$dbSaved) {
    $csvFile = __DIR__ . '/quotes_log.csv';
    $logData = [
        date('Y-m-d H:i:s'),
        $referenceNo,
        $fullName,
        $phone,
        $city,
        $monthlyBill,
        $disco,
        $systemType,
        $propertyType,
        $recommendedKw . ' kW',
        'PKR ' . $estimatedMonthlySavings,
        $comments
    ];
    $fp = @fopen($csvFile, 'a');
    if ($fp) {
        fputcsv($fp, $logData);
        fclose($fp);
    }
}

// Generate pre-filled WhatsApp link
$whatsappMsg = "Hello Roshan Solar Energy, I submitted a quote request.\n\n" .
               "• Ref: {$referenceNo}\n" .
               "• Name: {$fullName}\n" .
               "• Phone: {$phone}\n" .
               "• City: {$city} ({$disco})\n" .
               "• Avg Monthly Bill: PKR " . number_format($monthlyBill) . "\n" .
               "• System Type: {$systemType}\n" .
               "• Recommended Capacity: {$recommendedKw} kW\n" .
               "• Est. Monthly Savings: PKR " . number_format($estimatedMonthlySavings) . "\n\n" .
               "Please share feasibility and schedule a site survey.";

$whatsappUrl = "https://wa.me/{$whatsapp_number}?text=" . rawurlencode($whatsappMsg);

echo json_encode([
    'success' => true,
    'message' => 'Quote request received successfully. A solar technical engineer will contact you shortly.',
    'referenceNo' => $referenceNo,
    'recommendedKw' => $recommendedKw,
    'estimatedMonthlySavings' => $estimatedMonthlySavings,
    'whatsappUrl' => $whatsappUrl,
    'savedInDatabase' => $dbSaved
]);
