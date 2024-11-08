// Dummy user data for authentication
let registeredUser = { username: "", password: "" };
let isSignedIn = false;

// Toggle between Sign Up and Sign In
function toggleAuth() {
    const authTitle = document.getElementById("authTitle");
    authTitle.innerText = authTitle.innerText === "Sign Up" ? "Sign In" : "Sign Up";
}

document.getElementById("authForm").onsubmit = function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (registeredUser.username && registeredUser.username === username && registeredUser.password === password) {
        isSignedIn = true;
        displayDashboard(username);
    } else if (document.getElementById("authTitle").innerText === "Sign Up") {
        registeredUser = { username, password };
        alert("Sign up successful! Please sign in.");
        toggleAuth();
    } else {
        alert("Incorrect username or password.");
    }
};

function displayDashboard(username) {
    document.getElementById("authContainer").style.display = "none";
    document.getElementById("dashboardContainer").style.display = "block";
    document.getElementById("userDisplayName").innerText = username;
    document.getElementById("profileInitial").innerText = username.charAt(0).toUpperCase();
}

// Initialize Chart.js
let balanceChart;
function initializeChart() {
    const ctx = document.getElementById("balanceChart").getContext("2d");
    balanceChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Total Given", "Total Taken", "Remaining Balance"],
            datasets: [{
                label: "Financial Overview",
                data: [0, 0, 0],
                backgroundColor: ["#4CAF50", "#FF5733", "#3B8DBC"]
            }]
        }
    });
}

// Add Entry
let entries = [];
function addEntry() {
    const date = document.getElementById("date").value;
    const name = document.getElementById("name").value;
    const amountGiven = parseFloat(document.getElementById("amountGiven").value);
    const amountTaken = parseFloat(document.getElementById("amountTaken").value);

    entries.push({ date, name, amountGiven, amountTaken });
    displayEntries();
    updateChart();
}

// Display Entries and Update Chart
function displayEntries() {
    const entriesSection = document.getElementById("entriesSection");
    entriesSection.innerHTML = "";
    entries.forEach(entry => {
        const entryCard = document.createElement("div");
        entryCard.className = "entry-card";
        entryCard.innerHTML = `<strong>${entry.name}</strong><br>Date: ${entry.date}<br>Amount Given: ${entry.amountGiven}<br>Amount Taken: ${entry.amountTaken}`;
        entriesSection.appendChild(entryCard);
    });
}

function updateChart() {
    const totalGiven = entries.reduce((acc, entry) => acc + entry.amountGiven, 0);
    const totalTaken = entries.reduce((acc, entry) => acc + entry.amountTaken, 0);
    const remainingBalance = totalGiven - totalTaken;

    balanceChart.data.datasets[0].data = [totalGiven, totalTaken, remainingBalance];
    balanceChart.update();
}

// Initialize chart on page load
window.onload = initializeChart;
