import Image from "next/image";
import { fetchWeatherByCity, fetchDaily, fetchCity } from "@/lib/data";
import { degToCompass, kelvinToCelsius } from "@/lib/utils";

import Searchbar from "@/ui/Searchbar";

export default async function Home() {
  const data = await fetchWeatherByCity('Toronto');
  const { main, weather, coord, wind } = data;
  const dailyData = await fetchDaily(coord.lat, coord.lon);
  const icon = weather[0].icon;

  const cityInfo = await fetchCity('Toronto');

  return (
    <main className=" p-24">
      {/* <p>{JSON.stringify(dailyData.list[0])}</p> */}
      {/* <select name="" id="">
      {cityInfo.map((city: {name:string}, idx: number) => <option key={idx}>{city.name}</option>)}
      </select> */}
      <h1>Yet Another Weather Widget</h1>
      <p>{new Date().toDateString()}</p>
      <Searchbar />
      <h2>Toronto</h2>
      <div className="block max-w-sm px-6 py-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
        <p className="text-xl"><Image className="inline" src={`https://openweathermap.org/img/wn/${icon}.png`} alt="weather" width={50} height={50} /> {kelvinToCelsius(main.temp)}&deg; C</p>
        <p className="text-sm font-bold">Feels like {kelvinToCelsius(main.feels_like)}&deg; C. {weather[0].description}</p>
        <div className="text-xs border-blue-700 border-l pl-1">
          <p className="p-1">Wind: {wind.speed}m/s {degToCompass(wind.deg)}</p>
          <p className="p-1">Pressure {main.pressure}kPa</p>
          <p className="p-1">Humidity:  {main.humidity}%</p>
        </div>
      </div>
      <div>
        <h3>10-day forecast</h3>
        <ul className="bg-white p-2 rounded-lg border border-gray-200 shadow">
          {dailyData.list.map((day: {dt: number, temp: {day: number}, weather: {icon: string, description: string}[]}, idx: number) => {
            return <li key={idx} className="flex py-4 items-center  hover:bg-gray-100">
              <Image src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="weather" width={35} height={35} />  &nbsp;  {new Date(day.dt * 1000).toLocaleDateString(undefined, {weekday: "short", month: "short", day: "numeric"})}  &nbsp; {kelvinToCelsius(day.temp.day)}&deg; C &nbsp; {day.weather[0].description}
              </li>
          })}
        </ul>

      </div>
    </main>
  );
}
