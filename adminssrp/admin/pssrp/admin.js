const form = document.getElementById("officerForm");
const list = document.getElementById("officerDisplay");

function loadOfficers() {
  const officers = JSON.parse(localStorage.getItem("pssrpOfficers") || "[]");
  list.innerHTML = "";

  officers.forEach(officer => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${officer.name}</strong> — ${officer.rank}  
      <br>
      <a href="profile.html?id=${officer.serial}">View Profile</a>
    `;
    list.appendChild(li);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const officers = JSON.parse(localStorage.getItem("pssrpOfficers") || "[]");

  const file = document.getElementById("image").files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      saveOfficer(reader.result);
    };
    reader.readAsDataURL(file);
  } else {
    saveOfficer(null);
  }
});

function saveOfficer(imageData) {
  const officers = JSON.parse(localStorage.getItem("pssrpOfficers") || "[]");

  const newOfficer = {
    name: document.getElementById("name").value,
    badge: document.getElementById("badge").value,
    serial: document.getElementById("serial").value,
    rank: document.getElementById("rank").value,
    division: document.getElementById("division").value,
    age: document.getElementById("age").value,
    history: document.getElementById("history").value,
    image: imageData
  };

  officers.push(newOfficer);
  localStorage.setItem("pssrpOfficers", JSON.stringify(officers));

  form.reset();
  loadOfficers();
}

loadOfficers();
