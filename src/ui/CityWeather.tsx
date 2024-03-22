'use server';

import Image from "next/image";
import { degToCompass, kelvinToCelsius } from "@/lib/utils";
import { fetchWeatherByCityId } from "@/lib/data";

export default async function CityWeather({id}: {id: number}) {
  if (!id) return null;
  const {weather, main, wind, name} = await fetchWeatherByCityId(id);
  const icon = weather[0].icon;

  return (
    <>
      <h2 className="mb-4 mt-4 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl">{name}</h2>
      <div className="block max-w-sm px-6 py-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
        <p className="text-xl"><Image className="inline" src={`https://openweathermap.org/img/wn/${icon}.png`} alt="weather" width={50} height={50} /> {kelvinToCelsius(main.temp)}&deg; C</p>
        <p className="text-sm font-bold">Feels like {kelvinToCelsius(main.feels_like)}&deg; C. {weather[0].description}</p>
        <div className="text-xs border-blue-700 border-l pl-1">
          <p className="p-1">Wind: {wind.speed}m/s {degToCompass(wind.deg)}</p>
          <p className="p-1">Pressure {main.pressure}kPa</p>
          <p className="p-1">Humidity:  {main.humidity}%</p>
        </div>
      </div>
    </>
  )
}

