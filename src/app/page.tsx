import Image from "next/image";

export default function Home() {
  const myName = "Jon Barson"
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Yet Another Weather Widget</h1>
      <p>{new Date().toDateString()}</p>
      <nav>
        <input type="search" placeholder="Search City" />
        <button>Search</button>
        <button>Geolocate</button>
        <input type="radio" id="metric" name="units" value="metric" checked />
        <label htmlFor="metric">Metric</label>
        <input type="radio" id="imperial" name="units" value="imperial" />
        <label htmlFor="imperial">Imperial</label>
      </nav>
      <h2>City Name</h2>
      <div>
        <p><span>icon</span> 10📜 C</p>
        <p>Weather</p>
        Feels like 3°C. Clear sky. Strong breeze
        11.8m/s ENE
        1019hPa
        Humidity:
        62%
        UV:
        2
        Dew point:
        1°C
        Visibility:
        10.0km
      </div>
      <div>
        8-day forecast

        Fri, Mar 08
        8 / 4°C
        light rain
        Sat, Mar 09
        8 / 5°C
        moderate rain
        Sun, Mar 10
        4 / 0°C
        light rain
        Mon, Mar 11
        7 / 0°C
        clear sky
        Tue, Mar 12
        8 / 3°C
        few clouds
        Wed, Mar 13
        7 / 4°C
        overcast clouds
        Thu, Mar 14
        10 / 6°C
        light rain
        Fri, Mar 15
        10 / 6°C
        light rain

      </div>
    </main>
  );
}
