'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'
import { useState, useRef, useEffect } from 'react'
import {fetchCityFromList } from '@/lib/data'
import type { City } from '@/lib/types'
import { cn } from "@/lib/utils"

export default function Searchbar() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [cities, setCities] = useState<City[]>([]);
  const { replace } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useDebouncedCallback(async (term: string) => {
    const response = await fetchCityFromList(term) as City[];
    if (term === '') return;
    setCities(response);
  }, 300);


  const handleSelect = (id: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('city', id.toString());
    replace(`${pathname}?${params}`);

    setCities([]);
    inputRef.current && (inputRef.current.value = '');
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setCities([]);
      inputRef.current && (inputRef.current.value = '');
    }
  };

  useEffect(() => {

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="ml-auto max-w-xs w-full">
      <div className="rounded-md bg-gray-100">
        <input
          title='search'
          className={cn(
            "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          )}
          ref={inputRef}
          id="citySearch"
          placeholder="Enter your location" type="text"
          onChange={(e) => handleSearch(e.target.value)}
        />
    </div>
    <div id="dropdown" className={cn("absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-80", !cities.length  && "hidden")}>
      <ul className="py-2 text-sm text-gray-700 ">
      {cities.map((city: City) => (
          <li key={city.id} onClick={()=>handleSelect(city.id)}
          className="block w-full px-4 py-2 hover:bg-gray-100 cursor-pointer">{city.name} {city.state} {city.country}</li>
        ))}

      </ul>
    </div>
  </div>
  );
}