/**
 * MEDHAA'S RAINBOW SCHOOL — Admissions Form Backend
 * Google Apps Script Web App
 * 
 * HOW TO DEPLOY:
 * 1. Go to https://sheets.google.com → Create a new spreadsheet
 *    Name it: "Medhaa Rainbow School - Admissions 2026-27"
 * 2. Click Extensions → Apps Script
 * 3. Delete all existing code and paste THIS entire file
 * 4. Click Save (💾)
 * 5. Click Deploy → New Deployment
 *    - Type: Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Click Deploy → Copy the Web App URL
 * 7. Paste that URL into admissions.html where it says PASTE_YOUR_SCRIPT_URL_HERE
 */

// ── Sheet Setup ──────────────────────────────────────────────────────────────
const SHEET_NAME = "Admissions";

const HEADERS = [
  "Timestamp",
  "Student Name",
  "Date of Birth",
  "Gender",
  "Class Applying For",
  "Father's Name",
  "Mother's Name",
  "Contact Number",
  "Alternate Number",
  "Email",
  "Residential Address",
  "Previous School",
  "Medium",
  "Status"
];

// ── Entry Point ───────────────────────────────────────────────────────────────
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();
    appendRow(sheet, data);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: "Application saved!" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Allow CORS preflight (OPTIONS) requests
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "Admissions API is running ✅" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Add bold header row
    const headerRow = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRow.setValues([HEADERS]);
    headerRow.setFontWeight("bold");
    headerRow.setBackground("#FFD726");
    headerRow.setFontColor("#1a1a1a");
    sheet.setFrozenRows(1);
    // Auto-resize columns
    sheet.autoResizeColumns(1, HEADERS.length);
  }

  return sheet;
}

function appendRow(sheet, data) {
  const now = new Date();
  const timestamp = Utilities.formatDate(now, Session.getScriptTimeZone(), "dd-MM-yyyy HH:mm:ss");

  const row = [
    timestamp,
    data.studentName   || "",
    data.dob           || "",
    data.gender        || "",
    data.classApplied  || "",
    data.fatherName    || "",
    data.motherName    || "",
    data.phone         || "",
    data.altPhone      || "",
    data.email         || "",
    data.address       || "",
    data.prevSchool    || "",
    data.medium        || "English Medium",
    "New"   // Default status — can be changed to "Contacted", "Admitted" etc.
  ];

  sheet.appendRow(row);

  // Alternate row colouring for easy reading
  const lastRow = sheet.getLastRow();
  if (lastRow % 2 === 0) {
    sheet.getRange(lastRow, 1, 1, HEADERS.length).setBackground("#fff9d6");
  }
}
