document.addEventListener("DOMContentLoaded", () => {
  
  const form = {
    name: document.getElementById("name"),
    badge: document.getElementById("badge"),
    serial: document.getElementById("serial"),
    rank: document.getElementById("rank"),
    division: document.getElementById("division"),
    email: document.getElementById("email"),
    age: document.getElementById("age"),
    height: document.getElementById("height"),
    weight: document.getElementById("weight"),
    joined: document.getElementById("joined"),
    photoUpload: document.getElementById("photoUpload"),
    employment: document.getElementById("employment"),
    pay: document.getElementById("pay")
  };

  const saveBtn = document.getElementById("saveOfficer");
  const officerList = document.getElementById("officerList");

  let editingSerial = null;

  function updateOfficerList() {
    officerList.innerHTML = "";
    const all = getAllOfficers();

    if (all.length === 0) {
      officerList.innerHTML = "<p>No officers saved yet.</p>";
      return;
    }

    all.forEach(officer => {
      const el = document.createElement("div");
      el.className = "bg-zinc-800 p-4 rounded flex justify-between items-center";

      el.innerHTML = `
        <div>
          <h2 class="text-xl font-bold">${officer.name}</h2>
          <p>${officer.rank} — ${officer.division}</p>
          <p class="text-gray-400">Badge: ${officer.badge} | Unit: ${officer.serial}</p>
        </div>

        <div class="flex gap-4">
          <button class="px-4 py-2 bg-orange-500 rounded editBtn" data-id="${officer.serial}">Edit</button>
          <button class="px-4 py-2 bg-red-500 rounded deleteBtn" data-id="${officer.serial}">Delete</button>
        </div>
      `;

      officerList.appendChild(el);
    });

    document.querySelectorAll(".editBtn").forEach(btn =>
      btn.addEventListener("click", () => loadOfficer(btn.dataset.id))
    );

    document.querySelectorAll(".deleteBtn").forEach(btn =>
      btn.addEventListener("click", () => {
        deleteOfficer(btn.dataset.id);
        updateOfficerList();
      })
    );
  }

  function loadOfficer(serial) {
    const officer = getOfficer(serial);
    editingSerial = serial;

    form.name.value = officer.name;
    form.badge.value = officer.badge;
    form.serial.value = officer.serial;
    form.rank.value = officer.rank;
    form.division.value = officer.division;
    form.email.value = officer.email;
    form.age.value = officer.age;
    form.height.value = officer.height;
    form.weight.value = officer.weight;
    form.joined.value = officer.joined;
    form.employment.value = officer.employment;
    form.pay.value = JSON.stringify(officer.pay, null, 2);

    window.scrollTo(0, 0);
  }

  saveBtn.addEventListener("click", async () => {
    const reader = new FileReader();

    function saveWithPhoto(photo) {
      const officer = {
        name: form.name.value,
        badge: form.badge.value,
        serial: form.serial.value,
        rank: form.rank.value,
        division: form.division.value,
        email: form.email.value,
        age: form.age.value,
        height: form.height.value,
        weight: form.weight.value,
        joined: form.joined.value,
        employment: form.employment.value,
        pay: JSON.parse(form.pay.value || "{}"),
        photo: photo
      };

      saveOfficerData(officer);
      updateOfficerList();
    }

    if (form.photoUpload.files.length > 0) {
      reader.onload = e => saveWithPhoto(e.target.result);
      reader.readAsDataURL(form.photoUpload.files[0]);
    } else {
      const existing = getOfficer(form.serial.value);
      saveWithPhoto(existing ? existing.photo : "/headshots/default.png");
    }
  });

  updateOfficerList();
});
