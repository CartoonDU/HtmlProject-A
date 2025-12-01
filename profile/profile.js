document.addEventListener("DOMContentLoaded", () => {
  const serial = new URLSearchParams(window.location.search).get("id");
  const o = getOfficer(serial);

  if (!o) return;

  document.getElementById("officer-name").textContent = o.name;
  document.getElementById("officer-rank").textContent = o.rank;
  document.getElementById("officer-division").textContent = o.division;
  document.getElementById("officer-division-link").href = "/division.html?name=" + o.division;
  document.getElementById("officer-email").textContent = o.email;
  document.getElementById("officer-email").href = "mailto:" + o.email;

  document.getElementById("officer-serial").textContent = o.serial;
  document.getElementById("officer-badge").textContent = o.badge;
  document.getElementById("officer-age").textContent = o.age;
  document.getElementById("officer-height").textContent = o.height;
  document.getElementById("officer-weight").textContent = o.weight;
  document.getElementById("officer-joined").textContent = o.joined;

  document.getElementById("officer-photo").src = o.photo;

  const employmentDiv = document.getElementById("employment-history");

  employmentDiv.innerHTML = o.employment
    .split("\n")
    .map(line => {
      const parts = line.split("|").map(x => x.trim());
      return `
        <div class="odd:bg-[#D7D2C4] p-2 md:grid grid-cols-5 gap-x-2 text-sm">
          <div>${parts[0] || ""}</div>
          <div>${parts[1] || ""}</div>
          <div>${parts[2] || ""}</div>
          <div>${parts[3] || ""}</div>
          <div>${parts[4] || ""}</div>
        </div>`;
    })
    .join("");

  for (let year of [2024, 2023, 2022]) {
    const ul = document.getElementById("payroll-" + year);
    const p = o.pay[year];
    if (p) {
      ul.innerHTML = `
        <li><strong>Regular:</strong> $${p.Regular}</li>
        <li><strong>Bonus:</strong> $${p.Bonus}</li>
        <li><strong>Total:</strong> $${p.Total}</li>
      `;
    }
  }
});
