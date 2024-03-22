'use server';
import cities from "./city.list.json";
import sqlite3 from "sqlite3";
import type { City } from "./types";


export async function fetchDaily(id: number) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?id=${id}&cnt=10&appid=${process.env.OPENWEATHERMAP_API_KEY}`, {cache: "no-store"});
  if (!response.ok) {
    throw new Error('Did not fetch daily weather data successfully.');
  }
  return response.json();
}


export async function fetchCityFromList(name: string){

  const db = new sqlite3.Database('./mydb.sqlite3', sqlite3.OPEN_READONLY);
  const query = `SELECT * FROM cities WHERE name LIKE '%${name}%' LIMIT 5`;

  return new Promise((resolve) => {
    db.all(query, (err, rows) => {
      if (err) {
        resolve([]);
      }
      resolve(rows);
    });
  })
}



export async function fetchWeatherByCityId(id: number) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${process.env.OPENWEATHERMAP_API_KEY}`, {cache: "no-store"});
  if (!response.ok) {
    throw new Error('Did not fetch city weather data successfully.');
  }
  return response.json();
}

