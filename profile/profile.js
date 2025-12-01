document.getElementById("addOfficerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const officer = {
        id: Date.now(),
        name: document.getElementById("name").value,
        rank: document.getElementById("rank").value,
        badge: document.getElementById("badge").value,
        serial: document.getElementById("serial").value,
        email: document.getElementById("email").value,
        age: document.getElementById("age").value,
        height: document.getElementById("height").value,
        weight: document.getElementById("weight").value,
        joined: document.getElementById("joined").value,
        division: document.getElementById("division").value,
        photo: document.getElementById("photoUrl").value,
        history: JSON.parse(document.getElementById("history").value || "[]"),
        payroll: {
            "2024": [],
            "2023": [],
            "2022": []
        }
    };

    saveOfficer(officer);

    alert("Officer Added Successfully!");

    this.reset();
});
