'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'
import { useState, useRef } from 'react'
import { fetchCityFromList } from '@/lib/data'

export type City = {
  id: number
  name: string
  country: string
  state?: string
  coord: {
    lat: number
    lon: number
  }
}


export default function Searchbar() {
  const [cities, setCities] = useState([])
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = useDebouncedCallback((term: string) => {
    fetchCityFromList(term).then((data) => {
      setCities(data)
    })
  }, 300)

  const handleSelect = (id: number) => {
   const params = new URLSearchParams(searchParams)
    params.set('city', id.toString())
    replace(`${pathname}?${params}`)

    setCities([])
    inputRef.current && (inputRef.current.value = '')
  }
  return (
    <>
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        ref={inputRef}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder="Search for a city"
        id="citySearch"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      <br />

    </div>
    <ul>
    {cities.map((city: City, idx: number) => (
      <li key={city.id} onClick={()=>handleSelect(city.id)}>{city.name} {city.state} {city.country}</li>
    ))}
  </ul>
  </>
  );
}