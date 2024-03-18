

export const degToCompass = (num: number): string => {
  const val = Math.floor((num / 22.5) + 0.5);
  const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return arr[(val % 16)];
}

export const kelvinToCelsius = (kelvin: number) => Math.round(kelvin - 273.15);

export const kelvinToFahrenheit = (kelvin: number) => Math.round((kelvin - 273.15) * 9/5 + 32);

export const metersToFeet = (meters: number) => Math.round(meters * 3.281);