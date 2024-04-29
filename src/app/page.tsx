import { Suspense } from "react";
import Forecast from "@/ui/Forecast";
import CityWeather from "@/ui/CityWeather";
import type { SearchParams } from "@/lib/types"
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
