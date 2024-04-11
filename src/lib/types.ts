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

export type SearchParams = {
  city: string;
  units?: 'metric' | 'imperial';
}
