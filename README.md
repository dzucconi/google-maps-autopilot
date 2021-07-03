# google-maps-autopilot

A library that randomly selects cities and navigates to them — zooming in, zooming out, then, choosing a new random city: repeats.

### Installation

```
yarn add google-maps-autopilot
```

### Usage

```ts
import { simulate } from "google-maps-autopilot";

const map = new google.maps.Map(document.getElementById("example"), {
  // ...
});

simulate(map);
```
