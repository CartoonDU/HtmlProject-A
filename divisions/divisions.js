document.addEventListener("DOMContentLoaded", () => {
  const name = new URLSearchParams(window.location.search).get("name");

  const list = document.getElementById("divisionList");
  const all = getAllOfficers();

  const filtered = all.filter(o => o.division === name);

  list.innerHTML = filtered
    .map(
      o => `
    <a href="/profile.html?id=${o.serial}" class="inline-block text-center mr-4 mb-4">
        <img src="${o.photo}" class="w-[100px] h-[100px] object-cover rounded" />
        <br>${o.name}
    </a>`
    )
    .join("");
});
