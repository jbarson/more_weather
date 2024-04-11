'use server';

import Image from "next/image";
import { degToCompass, kelvinToCelsius, metersPerSecondToMilesPerHour } from "@/lib/utils";
import { fetchWeatherByCityId } from "@/lib/data";
import ThermometerIcon from "./icons/Thermometer";
import WindIcon from "./icons/Wind";
import CloudIcon from "./icons/Cloud";
import UmbrellaIcon from "./icons/Umbrella";

export default async function CityWeather({id}: {id: number}) {
  if (!id) return <p className="text-center text-lg">Search for a city above.</p>;
  const data = await fetchWeatherByCityId(id);
  const {weather, main, wind, name} = data;
  const icon = weather[0].icon;

  return (
    <section className="m-auto w-5/6 max-w-100">
    <div className="flex items-center flex-col md:flex-row justify-between gap-4">
      <div className="flex flex-col items-center md:items-start gap-1.5">
      <h2 className="mt-4 text-3xl font-bold leading-none tracking-tight text-gray-900">{name}</h2>
      <p className="text-2xl font-semibold tracking-tight">{weather[0].description}</p>
      <p className="mt-2 text-3xl font-bold flex tracking-tight text-gray-900"><ThermometerIcon className="w-8 h-8 mr-2" />{kelvinToCelsius(main.temp)}&deg;</p>
      </div>
      <div className="flex items-center gap-4">
        <Image
          alt={weather[0].description}
          className="rounded-full overflow-hidden ring"
          height="100"
          src={`https://openweathermap.org/img/wn/${icon}.png`}
          style={{
            aspectRatio: "100/100",
            objectFit: "cover",
          }}
          width="100"
        />
        <div className="grid gap-1.5">
          <p className="flex items-center gap-2">
            <WindIcon className="w-4 h-4 mr-1.5" />
            Wind: {wind.speed} m/s · {degToCompass(wind.deg)}
          </p>
          <p className="flex items-center gap-2">
            <ThermometerIcon className="w-4 h-4 mr-1.5" />
            Feels like: {kelvinToCelsius(main.feels_like)}&deg; C
          </p>
          <p className="flex items-center gap-2">
            <CloudIcon className="w-4 h-4 mr-1.5" />
            Pressure: {main.pressure}kPa
          </p>
          <p className="flex items-center gap-2">
            <UmbrellaIcon className="w-4 h-4 mr-1.5" />
            Humidity: {main.humidity}%
          </p>
        </div>
      </div>
    </div>
    </section>
  )
}


