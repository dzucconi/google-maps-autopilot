import { range, wait } from "./util";
import { rand, randomCity } from "./random";
import { path } from "./coordinates";

export const MIN_ZOOM_LEVEL = 4;
export const MAX_ZOOM_LEVEL = 16;
export const ZOOM_LEVELS = range(MIN_ZOOM_LEVEL, MAX_ZOOM_LEVEL, 1);

export const zoom = async (
  map: google.maps.Map,
  zoomLevels: number[],
  minWait = 50,
  maxWait = 5000
) => {
  return zoomLevels.reduce(
    async (promise: Promise<unknown | void>, zoomLevel) => {
      await promise;
      setZoom(map, zoomLevel);
      return wait(rand(minWait, maxWait));
    },
    Promise.resolve()
  );
};

export const zoomIn = async (
  map: google.maps.Map,
  minWait = 50,
  maxWait = 5000
) => {
  await zoom(map, ZOOM_LEVELS, minWait, maxWait);
};

export const zoomOut = async (
  map: google.maps.Map,
  minWait = 50,
  maxWait = 5000
) => {
  await zoom(map, [...ZOOM_LEVELS].reverse(), minWait, maxWait);
};

export const setZoom = (map: google.maps.Map, zoomLevel: number) => {
  try {
    map.setZoom(zoomLevel);
  } catch (error) {
    console.error(error);
  }
};

export const panTo = (
  map: google.maps.Map,
  coord: google.maps.LatLngLiteral
) => {
  try {
    map.panTo(coord);
  } catch (error) {
    console.error(error);
  }
};

export const simulate = async (
  map: google.maps.Map,
  coord: google.maps.LatLngLiteral = randomCity()
) => {
  panTo(map, coord);

  await zoomIn(map);
  await wait(rand(1000, 10000));
  await zoomOut(map);
  await wait(rand(1000, 10000));

  const nextCoord = randomCity();

  await path(coord, nextCoord).reduce(
    async (promise: Promise<unknown | void>, coord) => {
      await promise;
      panTo(map, coord);
      return wait(rand(50, 1000));
    },
    Promise.resolve()
  );

  await simulate(map, nextCoord);
};
