const STORAGE_KEY = "pssrp_officers_db";

function loadOfficerDB() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
}

function saveOfficerDB(db) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db, null, 2));
}

function addOfficer(officerData) {
    const db = loadOfficerDB();
    db[officerData.id] = officerData;
    saveOfficerDB(db);
}

function getOfficer(id) {
    const db = loadOfficerDB();
    return db[id] || null;
}

function getOfficersByDivision(division) {
    const db = loadOfficerDB();
    return Object.values(db).filter(o => o.division === division);
}
