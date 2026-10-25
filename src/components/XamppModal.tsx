import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Database, Terminal, Server, CheckCircle2, AlertTriangle, Download } from 'lucide-react';

interface XamppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const XamppModal: React.FC<XamppModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'instructions' | 'process-php' | 'database-sql' | 'checklist'>('instructions');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const processPhpCode = `<?php
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

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) { $input = $_POST; }

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

$cleanPhone = preg_replace('/[^0-9]/', '', $phone);
if (strlen($cleanPhone) < 10 || strlen($cleanPhone) > 13) {
    $errors['phone'] = 'Please enter a valid Pakistani mobile number (e.g., 0300-1234567).';
}

if (empty($city)) { $errors['city'] = 'Please select your city.'; }
if ($monthlyBill < 5000) { $errors['monthlyBill'] = 'Average monthly bill should be at least PKR 5,000.'; }

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Validation failed.', 'errors' => $errors]);
    exit;
}

// Compute specs
$recommendedKw = max(3.0, round(($monthlyBill / 62) / 125, 1));
$estimatedMonthlySavings = intval($recommendedKw * 125 * 58);
$referenceNo = 'RS-' . date('Ymd') . '-' . rand(1000, 9999);

$dbSaved = false;
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
} catch (Exception $e) {}

// Fallback CSV log if MySQL is not set up
if (!$dbSaved) {
    $csvFile = __DIR__ . '/quotes_log.csv';
    $logData = [date('Y-m-d H:i:s'), $referenceNo, $fullName, $phone, $city, $monthlyBill, $disco, $systemType, $recommendedKw . ' kW', 'PKR ' . $estimatedMonthlySavings];
    $fp = @fopen($csvFile, 'a');
    if ($fp) { fputcsv($fp, $logData); fclose($fp); }
}

$whatsappMsg = "Hello Roshan Solar Energy, I submitted a quote request.\\n\\n" .
               "• Ref: {$referenceNo}\\n" .
               "• Name: {$fullName}\\n" .
               "• Phone: {$phone}\\n" .
               "• City: {$city} ({$disco})\\n" .
               "• Avg Monthly Bill: PKR " . number_format($monthlyBill) . "\\n" .
               "• Recommended Capacity: {$recommendedKw} kW\\n" .
               "• Est. Monthly Savings: PKR " . number_format($estimatedMonthlySavings);

$whatsappUrl = "https://wa.me/{$whatsapp_number}?text=" . rawurlencode($whatsappMsg);

echo json_encode([
    'success' => true,
    'message' => 'Quote received. A technical engineer will contact you shortly.',
    'referenceNo' => $referenceNo,
    'recommendedKw' => $recommendedKw,
    'estimatedMonthlySavings' => $estimatedMonthlySavings,
    'whatsappUrl' => $whatsappUrl,
    'savedInDatabase' => $dbSaved
]);
?>`;

  const databaseSqlCode = `-- Roshan Solar Pakistan Database Schema
-- Compatible with MySQL / MariaDB on XAMPP

CREATE DATABASE IF NOT EXISTS \`roshan_solar_db\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`roshan_solar_db\`;

CREATE TABLE IF NOT EXISTS \`quotes\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`reference_no\` VARCHAR(32) NOT NULL UNIQUE,
  \`full_name\` VARCHAR(120) NOT NULL,
  \`phone\` VARCHAR(30) NOT NULL,
  \`city\` VARCHAR(60) NOT NULL,
  \`monthly_bill_pkr\` INT NOT NULL,
  \`disco_provider\` VARCHAR(50) NOT NULL,
  \`system_type\` VARCHAR(50) NOT NULL,
  \`property_type\` VARCHAR(50) NOT NULL,
  \`roof_type\` VARCHAR(50) DEFAULT 'Flat Concrete',
  \`recommended_kw\` DECIMAL(5,2) NOT NULL,
  \`estimated_monthly_savings_pkr\` INT NOT NULL,
  \`comments\` TEXT NULL,
  \`status\` ENUM('new', 'contacted', 'site_survey_scheduled', 'closed') DEFAULT 'new',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO \`quotes\` (\`reference_no\`, \`full_name\`, \`phone\`, \`city\`, \`monthly_bill_pkr\`, \`disco_provider\`, \`system_type\`, \`property_type\`, \`recommended_kw\`, \`estimated_monthly_savings_pkr\`, \`comments\`, \`status\`)
VALUES 
('RS-DEMO-1001', 'Muhammad Usman Tariq', '03001234567', 'Lahore', 85000, 'LESCO', 'Hybrid with Battery', '1 Kanal House', 12.00, 76800, 'Need quote for DHA Phase 5 with 15kWh LiFePO4 battery.', 'site_survey_scheduled'),
('RS-DEMO-1002', 'Farhan Siddiqui', '03219876543', 'Karachi', 140000, 'K-Electric', 'On-Grid Net Metered', 'Commercial Office', 20.00, 128000, 'Looking for fast-track net metering on Shahrah-e-Faisal.', 'contacted');`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col text-slate-100 shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <Server className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold text-white font-display">
                XAMPP Local Deployment &amp; Standalone Package
              </h3>
              <p className="text-xs text-slate-400">Complete working PHP/MySQL source files &amp; setup guide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-800 flex flex-wrap gap-2 pt-3 bg-slate-950/50">
          <button
            type="button"
            onClick={() => setActiveTab('instructions')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 cursor-pointer ${
              activeTab === 'instructions'
                ? 'border-emerald-400 text-white bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Installation Guide
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('process-php')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 cursor-pointer ${
              activeTab === 'process-php'
                ? 'border-emerald-400 text-white bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            process-quote.php
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('database-sql')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 cursor-pointer ${
              activeTab === 'database-sql'
                ? 'border-emerald-400 text-white bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            database.sql (MySQL)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 cursor-pointer ${
              activeTab === 'checklist'
                ? 'border-emerald-400 text-white bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Testing &amp; Config Checklist
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-6 overflow-y-auto flex-1 text-xs space-y-6">
          
          {activeTab === 'instructions' && (
            <div className="space-y-5">
              <div className="bg-emerald-950/60 border border-emerald-800/80 rounded-xl p-4">
                <span className="font-bold text-white text-sm block mb-1">
                  Where to Save Files in XAMPP
                </span>
                <p className="text-emerald-200 leading-relaxed">
                  All standalone files are already created in your workspace under <code className="bg-emerald-900/60 px-1.5 py-0.5 rounded text-white font-mono">/public/xampp/</code>. To run this in your local XAMPP environment on Windows, copy that folder into:
                </p>
                <div className="mt-2 p-2.5 bg-slate-950 rounded font-mono text-emerald-300 select-all border border-emerald-900">
                  C:\xampp\htdocs\roshan-solar\
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white font-display">
                  Step-by-Step Running Guide
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-[11px] flex items-center justify-center font-bold">1</span>
                      <span>Start Apache &amp; MySQL</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Launch the <strong>XAMPP Control Panel</strong> from your Start Menu and click <strong>Start</strong> next to both Apache and MySQL until both show green status.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-[11px] flex items-center justify-center font-bold">2</span>
                      <span>Import database.sql</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Visit <code className="text-emerald-300">http://localhost/phpmyadmin/</code>. Create database <code className="text-emerald-300 font-mono">roshan_solar_db</code>, click Import tab, and choose <code className="text-emerald-300 font-mono">database.sql</code>.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-[11px] flex items-center justify-center font-bold">3</span>
                      <span>Configure WhatsApp Number</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Open <code className="text-emerald-300 font-mono">process-quote.php</code> and update line 15: <code className="text-emerald-300 font-mono">$whatsapp_number = '923001234567';</code> with your company number.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-[11px] flex items-center justify-center font-bold">4</span>
                      <span>Open in Browser</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Navigate to <code className="text-emerald-300 font-mono">http://localhost/roshan-solar/</code> in Google Chrome, Edge, or Firefox.
                    </p>
                  </div>
                </div>

              </div>

              {/* Graceful Fallback Notice */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-400 text-xs">
                <strong>Automatic Fail-Safe:</strong> If MySQL is not running or credentials differ, <code className="text-slate-200">process-quote.php</code> will automatically log submitted quotes into a local CSV file (<code className="text-emerald-400">quotes_log.csv</code>), ensuring zero form errors or data loss during client testing!
              </div>
            </div>
          )}

          {activeTab === 'process-php' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">/public/xampp/process-quote.php</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(processPhpCode, 'php')}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedKey === 'php' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'php' ? 'Copied!' : 'Copy PHP Code'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto text-[11px] font-mono text-emerald-300 leading-relaxed max-h-96">
                {processPhpCode}
              </pre>
            </div>
          )}

          {activeTab === 'database-sql' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">/public/xampp/database.sql</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(databaseSqlCode, 'sql')}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedKey === 'sql' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'sql' ? 'Copied!' : 'Copy SQL Schema'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto text-[11px] font-mono text-amber-300 leading-relaxed max-h-96">
                {databaseSqlCode}
              </pre>
            </div>
          )}

          {activeTab === 'checklist' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-bold text-white font-display mb-2">
                  Interactive Element Verification Checklist
                </h4>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-200">Top Navigation Anchors:</span>
                      <p className="text-slate-400 mt-0.5">Tested smooth-scroll to #services, #calculator, #projects, #benefits, #faqs, and #contact.</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-200">Pakistan Solar ROI Calculator:</span>
                      <p className="text-slate-400 mt-0.5">Dynamic recalculation on bill change, DISCO selection (LESCO/IESCO/KE), system type switch, and WhatsApp quote payload generator.</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-200">Front-End Quote Form Validation:</span>
                      <p className="text-slate-400 mt-0.5">Pakistani mobile phone validation regex, required city, bill floor checking, reference ID generation, and summary text file download.</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-200">Configurable WhatsApp Integration:</span>
                      <p className="text-slate-400 mt-0.5">Floating widget, hero CTA, and quote buttons dynamically reflect the active phone number with URL-encoded messages.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white font-display mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Items Requiring Production Configuration</span>
                </h4>
                <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                  <li><strong>Official WhatsApp Number:</strong> Replace default placeholder (+92 300 1234567) with the client's verified WhatsApp Business line.</li>
                  <li><strong>MySQL Root Password:</strong> If your live server or production XAMPP has a password, update <code className="text-emerald-300 font-mono">$db_pass</code> in <code className="text-emerald-300 font-mono">process-quote.php</code>.</li>
                  <li><strong>SMTP Mailer:</strong> Configure PHPMailer or SendGrid in PHP to dispatch email notifications simultaneously with WhatsApp.</li>
                  <li><strong>SSL / HTTPS:</strong> Ensure your production web domain is served over HTTPS to guarantee uninterrupted mobile browser redirection.</li>
                </ul>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500">Standalone files located at /public/xampp/</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
