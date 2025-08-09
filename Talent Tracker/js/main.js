// js/main.js

document.getElementById('csvUploader').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) {
        return; // No file selected
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        const csvContent = e.target.result;
        // Store the CSV content in the browser's temporary storage
        localStorage.setItem('talentData', csvContent);

        // Redirect to the dashboard page
        window.location.href = 'dashboard.html';
    };

    reader.readAsText(file);
});