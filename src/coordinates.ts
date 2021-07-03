import { minMax, remap } from "./util";

const range = (tuple: [number, number], steps: number) => {
  const [min, max] = minMax(tuple);
  const interval = (max - min) / steps;
  const length = (max - min) / interval + 1;
  const _range = Array.from({ length }, (_, i) =>
    parseFloat((min + i * interval).toFixed(6))
  );

  return tuple[0] === min ? _range : _range.reverse();
};

/**
 * Calculates a path of in-between coordinates between two given coordinates.
 *
 * @param fromCoord google.maps.LatLngLiteral
 * @param toCoord google.maps.LatLngLiteral
 * @returns google.maps.LatLngLiteral[]
 */
export const path = (
  fromCoord: google.maps.LatLngLiteral,
  toCoord: google.maps.LatLngLiteral
): google.maps.LatLngLiteral[] => {
  const maxDistance = Math.max(
    Math.abs(fromCoord.lat - toCoord.lat),
    Math.abs(fromCoord.lng - toCoord.lng)
  );

  const steps = Math.round(
    remap(maxDistance, { min: 0, max: 360 }, { min: 0, max: 10 })
  );

  if (steps === 0) {
    return [fromCoord, toCoord];
  }

  const latRange = range([fromCoord.lat, toCoord.lat], steps);
  const lngRange = range([fromCoord.lng, toCoord.lng], steps);

  const coords = latRange.map((lat, i) => ({ lat, lng: lngRange[i] }));

  return coords;
};
