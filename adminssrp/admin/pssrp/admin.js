// ADMIN PANEL SCRIPT
// Requires storage.js

document.getElementById("saveOfficerBtn").onclick = () => saveOfficer();

function saveOfficer() {
    let name = document.getElementById("officerName").value.trim();
    let badge = document.getElementById("officerBadge").value.trim();
    let rank = document.getElementById("officerRank").value.trim();
    let division = document.getElementById("officerDivision").value;
    let age = document.getElementById("officerAge").value.trim();
    let history = document.getElementById("officerHistory").value.trim();
    let imgFile = document.getElementById("officerImage").files[0];

    let id = document.getElementById("officerID").value.trim();
    if (id === "") id = Math.floor(Math.random() * 90000 + 10000).toString();

    if (!name || !badge || !rank || !division) {
        alert("Missing required fields");
        return;
    }

    // Save officer entry
    const officerData = {
        id,
        name,
        badge,
        rank,
        age,
        division,
        history,
        image: ""
    };

    if (imgFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
            officerData.image = reader.result;
            finishSave(officerData);
        };
        reader.readAsDataURL(imgFile);
    } else {
        finishSave(officerData);
    }
}

function finishSave(officerData) {
    addOfficer(officerData);

    generateProfilePage(officerData);
    updateDivisionRoster(officerData);

    alert("Officer saved successfully!");
}

function generateProfilePage(officer) {
    const html = `
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="/profile/profile.css">
<script src="/profile/profile.js"></script>
</head>
<body>
<div class="profile-wrapper">
    <h1>${officer.name}</h1>
    <img src="${officer.image}">
    <p><strong>Rank:</strong> ${officer.rank}</p>
    <p><strong>Badge:</strong> ${officer.badge}</p>
    <p><strong>Division:</strong> ${officer.division}</p>
    <p><strong>Age:</strong> ${officer.age}</p>
    <h2>Employment History</h2>
    <p>${officer.history.replace(/\n/g,"<br>")}</p>
</div>
</body>
</html>
    `;

    localStorage.setItem("profile_page_" + officer.id, html);
}

function updateDivisionRoster(officer) {
    const key = "division_page_" + officer.division;

    let current = localStorage.getItem(key);
    if (!current) {
        current = `
<h1>${officer.division} Division</h1>
<div class="roster-grid"></div>`;
    }

    const container = document.createElement("div");
    container.innerHTML = current;

    const grid = container.querySelector(".roster-grid");

    const card = document.createElement("div");
    card.className = "officer-card";
    card.innerHTML = `
        <a href="/profile/profile.html?id=${officer.id}">
            <img src="${officer.image}">
            <p>${officer.name}</p>
            <p>${officer.rank}</p>
        </a>
    `;

    grid.appendChild(card);

    localStorage.setItem(key, container.innerHTML);
}
