type Range = { min: number; max: number };

export const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const remap = (n: number, input: Range, output: Range) =>
  ((n - input.min) * (output.max - output.min)) / (input.max - input.min) +
  output.min;

export const minMax = (tuple: [number, number]) =>
  [...tuple].sort((a: number, b: number) => a - b);
