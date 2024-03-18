import Image from "next/image";
import { kelvinToCelsius } from "@/lib/utils";
import { fetchDaily } from "@/lib/data";



export default async function Forecast({id}: {id: number}) {
  if (!id) return null;
  const dailyData = await fetchDaily(id);

  return (
    <div>
      <h3 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900">10-day forecast</h3>
        <ul className="bg-white p-2 rounded-lg border border-gray-200 shadow">
          {dailyData.list.map((day: {dt: number, temp: {day: number}, weather: {icon: string, description: string}[]}, idx: number) => {
            return <li key={idx} className="flex py-4 items-center  hover:bg-gray-100">
              <Image src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="weather" width={35} height={35} />  &nbsp;  {new Date(day.dt * 1000).toLocaleDateString(undefined, {weekday: "short", month: "short", day: "numeric"})}  &nbsp; {kelvinToCelsius(day.temp.day)}&deg; C &nbsp; {day.weather[0].description}
              </li>
          })}
          </ul>
    </div>
  )
}

