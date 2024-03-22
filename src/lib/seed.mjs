import sqlite3 from "sqlite3";
import fs from "fs";

function loadDatabase() {
  const db = new sqlite3.Database('./mydb.sqlite3', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
  });
  // Create table (if not exists)
  db.run(`CREATE TABLE IF NOT EXISTS cities (id INTEGER PRIMARY KEY, name TEXT, country TEXT, coord_lat REAL, coord_lon REAL)`, (err) => {
    if (err) {
      console.error(err.message);
    }
  }
  );

  // Read JSON file
  let rawdata = fs.readFileSync('src/lib/city.list.json');
  let cities = JSON.parse(rawdata.toString());

  // Insert each item from the JSON file
  cities.forEach((city) => {
    db.run(`INSERT INTO cities(id, name, country, coord_lat, coord_lon) VALUES(?, ?, ?, ?, ?)`, [city.id, city.name, city.country, city.coord.lat, city.coord.lon], (err) => {
      if (err) {
        console.error(err.message);
      }
    })

  });

  // Close the database connection
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}

function readDatabase(){
  const db = new sqlite3.Database('./mydb.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
  });

  db.all(`SELECT COUNT(*) FROM cities`, (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    console.log(rows);
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}

loadDatabase()