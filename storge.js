function saveOfficer(data) {
    let officers = JSON.parse(localStorage.getItem("officers") || "[]");
    officers.push(data);
    localStorage.setItem("officers", JSON.stringify(officers));
}

function getOfficers() {
    return JSON.parse(localStorage.getItem("officers") || "[]");
}

function getOfficerById(id) {
    return getOfficers().find(x => x.id == id);
}

function getOfficersByDivision(div) {
    return getOfficers().filter(x => x.division === div);
}
