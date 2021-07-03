import { path } from "./coordinates";

describe("path", () => {
  it("calculates an in between range of coordinates", () => {
    expect(path({ lat: 50.0, lng: 10.0 }, { lat: -10.0, lng: 20.0 })).toEqual([
      { lat: 50, lng: 10 },
      { lat: 20, lng: 15 },
      { lat: -10, lng: 20 },
    ]);
  });

  it("calculates an in between range of coordinates (2)", () => {
    expect(
      path(
        { lat: 54.380917, lng: 32.627807 },
        { lat: -31.008524, lng: -0.59735 }
      )
    ).toEqual([
      { lat: 54.380917, lng: 32.627807 },
      { lat: 11.686197, lng: 16.015228 },
      { lat: -31.008524, lng: -0.59735 },
    ]);
  });

  it("calculates an in between range of coordinates (3)", () => {
    expect(
      path(
        { lat: 41.0581527, lng: -74.7526651 },
        { lat: 49.47741, lng: 8.445179999999999 }
      )
    ).toEqual([
      { lat: 41.058153, lng: -74.752665 },
      { lat: 45.267781, lng: -33.153743 },
      { lat: 49.47741, lng: 8.44518 },
    ]);
  });

  fit("calculates an in between range of coordinates (4)", () => {
    console.log(
      path(
        { lat: 34.2367621, lng: -84.4907621 },
        { lat: 19.5345279, lng: -99.19073639999999 }
      )
    );
  });
});
