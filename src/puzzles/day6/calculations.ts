import { range } from 'radash';
import inputRaw from './input.txt?raw';

interface Race {
  time: number
  dist: number
}


const p1Data = (): Race[] => {
  const [times, distances] = inputRaw.trim().split('\n').map(l => l.split(':')[1].trim().split(/[\s]+/).map(v => parseInt(v)));
  return times.map((time, i) => ({
    time,
    dist: distances[i],
  }));
}

const p2Data = (): Race => {
  const [time, dist] = inputRaw.trim().split('\n').map(l => l.split(':')[1].replace(/\s/g, '')).map(v => parseInt(v));
  return {
    time,
    dist,
  };
};

const possibilities = (race: Race): number => {
  let count = 0;
  for (const holdTime of range(1, race.time - 1)) {
    if (holdTime * (race.time - holdTime) > race.dist) {
      count += 1;
    }
  }
  return count;
};

export const p1 = p1Data().map(possibilities).reduce((a, b) => a * b, 1);
export const p2 = possibilities(p2Data());
