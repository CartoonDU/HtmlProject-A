function loadDB() {
  return JSON.parse(localStorage.getItem("pssrp-db") || "{}");
}

function saveDB(db) {
  localStorage.setItem("pssrp-db", JSON.stringify(db));
}

function saveOfficerData(officer) {
  const db = loadDB();

  if (!db.officers) db.officers = {};

  db.officers[officer.serial] = officer;
  saveDB(db);
}

function deleteOfficer(serial) {
  const db = loadDB();
  if (db.officers && db.officers[serial]) {
    delete db.officers[serial];
  }
  saveDB(db);
}

function getOfficer(serial) {
  const db = loadDB();
  return db.officers ? db.officers[serial] : null;
}

function getAllOfficers() {
  const db = loadDB();
  return db.officers ? Object.values(db.officers) : [];
}
