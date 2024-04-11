import Forecast from "@/ui/Forecast";
import Searchbar from "@/ui/Searchbar";
import { Suspense } from "react";
import CityWeather from "@/ui/CityWeather";
import type { SearchParams } from "@/lib/types"
import SunriseIcon from "@/ui/icons/Sunrise";
import Header from "@/ui/Header";

export default async function Home({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const id = +searchParams!.city;

  return (

      <>
        <Suspense fallback={<p>Loading...</p>}>
          <CityWeather id={id} />
        </Suspense>

        <Suspense fallback={<p>Loading...</p>}>
          <Forecast id={id} />
        </Suspense>
      </>
  );
}
