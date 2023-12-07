import { range, memo } from 'radash';
import inputRaw from './input.txt?raw';

export interface Race {
  time: number
  dist: number
}

export const parseData = memo((): { p1Data: Race[], p2Data: Race } => {
  const [times, distances] = inputRaw.trim().split('\n').map(l => l.split(':')[1].trim().split(/[\s]+/).map(v => parseInt(v)));
  const [time, dist] = inputRaw.trim().split('\n').map(l => l.split(':')[1].replace(/\s/g, '')).map(v => parseInt(v));
  return {
    p1Data: times.map((time, i) => ({
      time,
      dist: distances[i],
    })),
    p2Data: {
      time,
      dist,
    },
  };
});

export const getSolutions = memo(() => {
  const { p1Data, p2Data } = parseData();

  const possibilities = (race: Race): number => {
    let count = 0;
    for (const holdTime of range(1, race.time - 1)) {
      if (holdTime * (race.time - holdTime) > race.dist) {
        count += 1;
      }
    }
    return count;
  };

  return {
    p1: p1Data.map(possibilities).reduce((a, b) => a * b, 1),
    p2: possibilities(p2Data),
  };
});
