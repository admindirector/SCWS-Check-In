// Santa Cruz Waldorf School Check-In App

// IMPORTANT: Replace this URL with your Google Apps Script Web App URL
// See README.md for setup instructions
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxqBdoT1t4kemPibbXB2MeS7Hbnpc1bl96OS0iDEiwEqmA55LRpFpkwdfCN7H3xVR0h7A/exec';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('checkinForm');
    const messageDiv = document.getElementById('message');

    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
});

async function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const messageDiv = document.getElementById('message');

    // Get form values
    const visitorType = document.getElementById('visitorType').value;
    const visitorName = document.getElementById('visitorName').value.trim();
    const action = document.getElementById('action').value;

    // Validate
    if (!visitorType || !visitorName || !action) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }

    // Check if Google Script URL is configured
    if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
        showMessage('Google Sheets is not configured yet. See README.md for setup instructions.', 'error');
        return;
    }

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Submitting';

    // Prepare data
    const data = {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        name: visitorName,
        visitorType: visitorType,
        action: action
    };

    try {
        // Send to Google Sheets via Apps Script
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        // With no-cors mode, we can't read the response
        // but the request will still be sent successfully
        showMessage('Successfully recorded! Thank you.', 'success');

        // Return to welcome page after short delay so user sees success message
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);

    } catch (error) {
        console.error('Error:', error);
        showMessage('There was an error. Please try again.', 'error');
    } finally {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        submitBtn.textContent = 'Submit';
    }
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = 'message ' + type;
}

function hideMessage() {
    const messageDiv = document.getElementById('message');
    messageDiv.className = 'message hidden';
}
