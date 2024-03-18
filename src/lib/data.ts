'use server';

import cities from "./city.list.json";


export async function fetchDaily(id: number) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?id=${id}&cnt=10&appid=${process.env.OPENWEATHERMAP_API_KEY}`, {cache: "no-store"});
  if (!response.ok) {
    throw new Error('Did not fetch daily weather data successfully.');
  }
  return response.json();
}


export async function fetchCityFromList(name: string) {
  return cities.filter((city: {mame: string}) => city.name.toLowerCase().includes(name.toLowerCase())).slice(0, 5);
}

export async function fetchWeatherByCityId(id: number) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${process.env.OPENWEATHERMAP_API_KEY}`, {cache: "no-store"});
  if (!response.ok) {
    throw new Error('Did not fetch city weather data successfully.');
  }
  return response.json();
}
