import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const degToCompass = (num: number): string => {
  const val = Math.floor((num / 22.5) + 0.5);
  const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return arr[(val % 16)];
}

export const kelvinToCelsius = (kelvin: number) => Math.round(kelvin - 273.15);

export const kelvinToFahrenheit = (kelvin: number) => Math.round((kelvin - 273.15) * 9/5 + 32);

export const metersPerSecondToMilesPerHour = (mps: number) => Math.round(mps * 2.237);