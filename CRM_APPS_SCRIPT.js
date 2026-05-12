/**
 * GOOGLE APPS SCRIPT FOR SOGNI DIGITALI CRM
 * 
 * Instructions:
 * 1. Open your Google Sheet.
 * 2. Extensions -> Apps Script.
 * 3. Delete any existing code and paste this.
 * 4. Click 'Save' and 'Deploy' -> 'New Deployment'.
 * 5. Select type 'Web App', 'Execute as: Me', 'Who has access: Anyone'.
 * 6. Copy the Web App URL and paste it as the WEBHOOK_URL in your server.ts (or DEFAULT_WEBHOOK_URL).
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName("Leads") || ss.insertSheet("Leads");
    
    // Comprehensive headers for perfect classification
    const headers = [
      "Timestamp", 
      "Source", 
      "Subject", 
      "Name", 
      "Email", 
      "Phone", 
      "Company", 
      "Website", 
      "Business Type", 
      "BOOKING: Type", 
      "BOOKING: Date", 
      "BOOKING: Time",
      "CHECKOUT: Plan", 
      "CHECKOUT: Extras", 
      "CHECKOUT: Promo",
      "CHECKOUT: Maintenance",
      "Budget / Address", 
      "Message / Details", 
      "Affiliate ID"
    ];

    // If the sheet is brand new, append headers and style them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length)
           .setFontWeight("bold")
           .setBackground("#f0f4f8")
           .setVerticalAlignment("middle");
      sheet.setFrozenRows(1);
    }
    
    // Map the incoming payload to the sheet columns
    // We use the new 'classification' keys we set in the React app
    const row = [
      data.timestamp || new Date().toLocaleString('it-IT'),
      data.source || "Website",
      data.pageSubject || "Submission",
      data.name || "",
      data.email || "",
      data.phone || "",
      data.company || "",
      data.website || "",
      data.business || "",
      
      // Booking specific (Booking.tsx)
      data.meeting_type || "",
      data.meeting_date || "",
      data.meeting_time || "",
      
      // Checkout specific (Checkout.tsx)
      data.checkout_plan || "",
      data.checkout_extras || "",
      data.checkout_discount || "",
      data.checkout_maintenance || "",
      
      // Other
      data.budget || data.address || "",
      data.message || data.project_details || data.goals || "",
      data.affiliateId || ""
    ];
    
    sheet.appendRow(row);
    
    // Clean up: Auto-resize columns
    sheet.autoResizeColumns(1, headers.length);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success", "row_added": sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    // Log error for debugging in Apps Script
    console.error("CRM Error: " + err.toString());
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "error": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
