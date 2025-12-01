// DIVISION PAGE SCRIPT

function getDivisionNameFromURL() {
    const parts = window.location.pathname.split("/");
    return parts[parts.length - 2]; // the folder name
}

window.onload = () => {
    const division = getDivisionNameFromURL();

    document.getElementById("divisionName").textContent =
        division.replace(/-/g, " ").toUpperCase();

    const officers = getOfficersByDivision(division);
    const grid = document.getElementById("rosterGrid");

    if (officers.length === 0) {
        grid.innerHTML = "<p>No officers assigned yet.</p>";
        return;
    }

    officers.forEach(o => {
        const card = document.createElement("div");
        card.className = "officer-card";
        card.innerHTML = `
            <a href="/profile/profile.html?id=${o.id}">
                <img src="${o.image}">
                <h3>${o.name}</h3>
                <p>${o.rank}</p>
            </a>
        `;
        grid.appendChild(card);
    });
};
