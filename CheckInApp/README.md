# Santa Cruz Waldorf School Check-In App

A simple, tablet-friendly visitor check-in system that logs entries to Google Sheets.

## Quick Start

1. Open `index.html` in a web browser to see the welcome page
2. Follow the Google Sheets setup below to enable data logging

---

## Google Sheets Setup (One-time setup, ~10 minutes)

### Step 1: Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Name it "Visitor Check-In Log" (or any name you prefer)
4. In the first row, add these headers in columns A through E:
   - A1: `Date`
   - B1: `Time`
   - C1: `Name`
   - D1: `Visitor Type`
   - E1: `Action`

### Step 2: Create the Apps Script

1. In your Google Sheet, click **Extensions** > **Apps Script**
2. Delete any code in the editor
3. Copy and paste this entire script:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);

    // Append a new row with the data
    sheet.appendRow([
      data.date,
      data.time,
      data.name,
      data.visitorType,
      data.action
    ]);

    // Return success
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Required for CORS
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 'result': 'success', 'message': 'Check-In API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Click **File** > **Save** (or Ctrl+S)
5. Name the project "Check-In Script" when prompted

### Step 3: Deploy as Web App

1. Click **Deploy** > **New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Fill in:
   - **Description**: "Visitor Check-In"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
4. Click **Deploy**
5. Click **Authorize access** and follow the prompts:
   - Choose your Google account
   - Click "Advanced" > "Go to Check-In Script (unsafe)"
   - Click "Allow"
6. **Copy the Web app URL** - it looks like: `https://script.google.com/macros/s/ABC123.../exec`

### Step 4: Connect to the App

1. Open `js/app.js` in a text editor
2. Find this line at the top:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
3. Replace `YOUR_GOOGLE_SCRIPT_URL_HERE` with your Web app URL
4. Save the file

---

## Testing

1. Open `index.html` in a browser
2. Click "Sign In"
3. Fill out the form and click Submit
4. Check your Google Sheet - a new row should appear!

---

## Deployment Options

### Option 1: Local Use (Simplest)
Just open `index.html` directly in a browser on your tablet/computer.

### Option 2: GitHub Pages (Free hosting)
1. Create a GitHub account and repository
2. Upload all files
3. Enable GitHub Pages in repository settings
4. Access via `https://yourusername.github.io/repositoryname`

### Option 3: Any Web Host
Upload the files to any web hosting service (Netlify, Vercel, etc.)

---

## Troubleshooting

**Form shows "Google Sheets is not configured"**
- Make sure you replaced the URL in `js/app.js`

**Data not appearing in Google Sheet**
- Check that the Apps Script is deployed correctly
- Try re-deploying with a new version
- Check the Apps Script execution logs

**Apps Script authorization issues**
- Make sure you selected "Anyone" for who has access
- Try deploying again and re-authorizing

---

## Customization

### Change Colors
Edit `css/styles.css` - look for the gradient colors in the `body` and `.btn-primary` sections.

### Add School Logo
Add an `<img>` tag in `index.html` before the `<h1>` tag.

### Change Visitor Types
Edit the `<select id="visitorType">` options in `checkin.html`.
