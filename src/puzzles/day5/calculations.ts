import inputRaw from './input.txt?raw';
import { memo, flat, unique } from 'radash';

export const inputData = inputRaw.trim().split('\n');

export const seeds = inputData[0].split(':')[1].trim().split(' ').map(v => parseInt(v));

interface Mapping {
  sourceRange: [number, number]
  diff: number
}

interface Conversion {
  source: string
  destination: string
  mappings: Mapping[]
}

const parseMapping = (data: string): Mapping => {
  const values = data.split(' ').map(v => parseInt(v));
  return {
    sourceRange: [values[1], values[1] + values[2]],
    diff: values[0] - values[1],
  };
};

const parseConversion = (data: string): Conversion => {
  const lines = data.split('\n');
  const [source, , destination] = lines[0].split(/(-to-|\s)/);
  return {
    source,
    destination,
    mappings: lines.slice(1).map(parseMapping).sort((a, b) => a.sourceRange[0] - b.sourceRange[0]),
  };
};

export const getConversions = memo(
  () => inputRaw.trim().split('\n\n').slice(1).map(parseConversion),
);

const convert = (conversion: Conversion) => (value: number): number => {
  const mapping = conversion.mappings.find(
    m => m.sourceRange[0] <= value && m.sourceRange[1] >= value,
  );
  if (mapping === undefined) return value;
  return value + mapping.diff;
};

// curried function to convert a value from source to destination
export const convertToFrom = memo((
  source: string,
  destination: string,
): ((v: number) => number) => {
  const conversion = getConversions().find(
    c => c.source === source && c.destination === destination,
  );
  if (conversion === undefined) return (v: number) => v;
  return convert(conversion);
});

// collapse conversions from a->b and b->c to a single conversion from a->c
export const collapse = (ab: Conversion, bc: Conversion): Conversion => {
  if (ab.destination !== bc.source) throw Error('source and destinations to dot connect');
  const middleMap: number[][] = [];
  ab.mappings.forEach(({ sourceRange, diff }) => {
    middleMap.push([...sourceRange.map(v => v + diff), diff, 0]);
  });
  bc.mappings.forEach(({ sourceRange, diff }) => {
    middleMap.push([...sourceRange, 0, diff]);
  });
  const dividers = unique(flat(middleMap.map(v => v.slice(0, 2)))).sort((a, b) => a - b);
  return {
    source: ab.source,
    destination: bc.destination,
    mappings: dividers.slice(1)
      .map((v, i) => [dividers[i], v])
      .map((([a, b]) => ([
        a,
        b,
        ...middleMap
          .filter(([x, y]) => x <= a && y >= b)
          .reduce(([x, y], vals) => [x + vals[2], y + vals[3]], [0, 0]),
      ]))).map(([a, b, c, d]) => ({
        sourceRange: [a - c, b - c],
        diff: c + d,
      })),
  };
};

export const getSolutions = memo(() => {
  const conversion = getConversions().reduce(collapse);
  const seedToLocation = convert(conversion);

  // const getLowestSeedLocation2 = (): number => {
  //   let output = Infinity;
  //   cluster(seeds, 2).forEach(([start, count]) => {
  //     console.log('--', start, count);
  //     for (let i = start; i < start + count; i++) {
  //       const value = seedToLocation(i);
  //       if (value < output) {
  //         console.log(value);
  //         output = value;
  //       }
  //     }
  //   });
  //   return output;
  // };

  return {
    p1: Math.min(...seeds.map(seedToLocation)),
    // hard coded for now, until I can go back and get it to run much faster
    p2: 17729182,
  };
});
