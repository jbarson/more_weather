'use server';
export async function fetchWeatherByCity(city: string) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}`, {cache: "no-store"});
  if (!response.ok) {
    throw new Error('Did not fetch weather data successfully.');
  }
  return response.json();
}

// export function getCities(city: string) {
//   return `You searched for ${city}`;
// }

export async function fetchDaily(lat: number, lon: number) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=10&appid=${process.env.OPENWEATHERMAP_API_KEY}`, {cache: "no-store"});
  if (!response.ok) {
    throw new Error('Did not fetch weather data successfully.');
  }
  return response.json();
}

export async function fetchCity(name: string) {
  const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${process.env.OPENWEATHERMAP_API_KEY}`);
  return response.json();
}

export async function fetchCityByCoords(lat: number, lon: number) {
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${process.env.OPENWEATHERMAP_API_KEY}`);
  return response.json();
}
