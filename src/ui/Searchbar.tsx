'use client';
import { fetchCityByCoords } from '@/lib/data';
import { useState, useEffect } from 'react'

export type City = {
  name: string,
  local_names: {
    [key: string]: string
  },

  lat: number,
  lon: number,
  country: string,
  state: string
}

export default function Searchbar() {
  const [units, setUnits] = useState('metric')
  const [city, setCity] = useState({} as City)
  const buttonText = units === 'metric' ? 'Metric' : 'Imperial';
  const toggleUnits = () => {
    document.cookie = `units=${units}; expires=Fri, 31 Dec 3000 23:59:59 GMT`;
    setUnits(units === 'metric' ? 'imperial': 'metric')
  }
  const updateQueryParam = () => {

  }

  const locate = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const response = await fetchCityByCoords(position.coords.latitude, position.coords.longitude);
      setCity(response[0]);
    }, (err) => {
      console.error(err);
    });
  }

  // Runs once when the component is mounted
  useEffect(() => {
    locate();
  }, [])

  // Runs when the units state changes
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('units', units);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.replaceState(null, '', newUrl);
  }, [units])


  return (
    <nav>
      <input type="search" placeholder="Search City" id="citySearch" />
      <button onClick={()=>alert('search')} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Search</button>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={locate}>Geolocate</button>
      <button onClick={toggleUnits} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>{buttonText}</button>
      <br />
      {/* <p>{JSON.stringify(coords)}</p> */}
      <p>{JSON.stringify(city)}</p>
    </nav>
  )
}
