import { range, wait } from "./util";
import { rand, randomCity } from "./random";
import { path } from "./coordinates";

const MIN_ZOOM_LEVEL = 4;
const MAX_ZOOM_LEVEL = 16;

const ZOOM_LEVELS = range(MIN_ZOOM_LEVEL, MAX_ZOOM_LEVEL, 1);

const zoom = async (zoomLevels: number[], map: google.maps.Map) => {
  return zoomLevels.reduce(
    async (promise: Promise<unknown | void>, zoomLevel) => {
      await promise;
      setZoom(map, zoomLevel);
      return wait(rand(50, 5000));
    },
    Promise.resolve()
  );
};

const zoomIn = async (map: google.maps.Map) => {
  await zoom(ZOOM_LEVELS, map);
};

const zoomOut = async (map: google.maps.Map) => {
  await zoom([...ZOOM_LEVELS].reverse(), map);
};

const setZoom = (map: google.maps.Map, zoomLevel: number) => {
  try {
    map.setZoom(zoomLevel);
  } catch (error) {
    console.error(error);
  }
};

const panTo = (map: google.maps.Map, coord: google.maps.LatLngLiteral) => {
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
