import { CITIES } from "./cities";

export const rand = (from: number, to: number, fixed = 0) =>
  parseFloat((Math.random() * (to - from) + from).toFixed(fixed));

export const randomLat = () => rand(-90, 90, 6);

export const randomLng = () => rand(-180, 180, 6);

export const randomZoom = () => rand(2, 15);

export const randomZoomIn = () => rand(18, 18);

export const randomZoomOut = () => rand(6, 6);

export const randomCoord = (): google.maps.LatLngLiteral => ({
  lat: randomLat(),
  lng: randomLng(),
});

export const randomCity = () =>
  CITIES[Math.floor(Math.random() * CITIES.length)];
