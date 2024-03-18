import Forecast from "@/ui/Forecast";
import Searchbar from "@/ui/Searchbar";
import { Suspense } from "react";
import CityWeather from "@/ui/CityWeather";

export type SearchParams = {
  city: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const id = +searchParams!.city;

  return (
    <main className="p-24 h-full">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">Yet Another Weather Widget</h1>
      <p>{new Date().toDateString()}</p>
      <Searchbar />
      <Suspense fallback={<p>Loading...</p>}>
        <CityWeather id={id} />
      </Suspense>

      <Suspense fallback={<p>Loading...</p>}>
        <Forecast id={id} />
      </Suspense>

    </main>
  );
}
