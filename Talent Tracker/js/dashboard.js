// js/dashboard.js

document.addEventListener('DOMContentLoaded', function() {
    const csvData = localStorage.getItem('talentData');

    if (!csvData) {
        alert("No data found. Please upload a CSV file first.");
        window.location.href = 'index.html'; // Go back to home
        return;
    }

    // Simple CSV parsing
    const rows = csvData.trim().split('\n');
    const headers = rows.shift().split(','); // Assumes first row is headers

    // Find the index for name, performance, and potential columns
    // ADJUST THESE TO MATCH YOUR CSV HEADERS
    const nameIndex = headers.indexOf('Employee Name');
    const perfIndex = headers.indexOf('Performance');
    const potIndex = headers.indexOf('Potential');

    rows.forEach(rowString => {
        const employee = rowString.split(',');
        const name = employee[nameIndex];
        const performance = parseInt(employee[perfIndex], 10); // e.g., 1, 2, or 3
        const potential = parseInt(employee[potIndex], 10); // e.g., 1, 2, or 3

        createEmployeePill(name, performance, potential);
    });
});

function createEmployeePill(name, performance, potential) {
    const pill = document.createElement('div');
    pill.className = 'employee-pill'; // Style this class in your CSS
    pill.textContent = name;

    // **ADJUST THIS LOGIC TO MATCH YOUR GRID**
    // This example assumes Performance & Potential are scored 1 (Poor), 2 (Average), 3 (High)
    let targetBoxId = '';

    // This logic maps the 9-box grid based on Performance and Potential scores (1=Low, 2=Medium, 3=High)
    if (potential === 3 && performance === 3) {
        targetBoxId = 'star-performer'; // Top Right
    } else if (potential === 3 && performance === 2) {
        targetBoxId = 'high-achiever';   // Top Middle
    } else if (potential === 3 && performance === 1) {
        targetBoxId = 'potential-leader';// Top Left
    } else if (potential === 2 && performance === 3) {
        targetBoxId = 'solid-contributor';// Middle Right
    } else if (potential === 2 && performance === 2) {
        targetBoxId = 'steady-performer'; // Center
    } else if (potential === 2 && performance === 1) {
        targetBoxId = 'growth-prospect';  // Middle Left
    } else if (potential === 1 && performance === 3) {
        targetBoxId = 'emerging-talent';  // Bottom Right
    } else if (potential === 1 && performance === 2) {
        targetBoxId = 'development-opportunity'; // Bottom Middle
    } else if (potential === 1 && performance === 1) {
        targetBoxId = 'improvement-focus';// Bottom Left
    } else {
        // If data is invalid, don't place the pill
        return; 
    }

    const targetBox = document.getElementById(targetBoxId);
    if (targetBox) {
        targetBox.appendChild(pill);
    }
}