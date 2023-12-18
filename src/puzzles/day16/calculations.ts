import { memo, flat, sum, unique } from 'radash';
import inputRaw from './input.txt?raw';

export enum Cell {
  Empty,
  MirrorL,
  MirrorR,
  SplitterH,
  SplitterV,
}

export enum Dir { L, R, U, D }

export interface Pos { x: number, y: number }

export const posEq = (p1: Pos) => (p2: Pos): boolean => p1.x === p2.x && p1.y === p2.y;

const posAdd = (p1: Pos) => (p2: Pos): Pos => ({ x: p1.x + p2.x, y: p1.y + p2.y });

export interface Beam {
  pos: Pos
  dir: Pos
}

const beamToString = (beam: Beam): string =>
  [beam.pos.x, beam.pos.y, beam.dir.x, beam.dir.y].join(',');

const beamFromString = (s: string): Beam => {
  const [x, y, dx, dy] = s.split(',').map(v => parseInt(v));
  return { pos: { x, y }, dir: { x: dx, y: dy } };
};

export const parseInput = memo((): Cell[][] => {
  return inputRaw.trim().split('\n').map(row => row.split('').map(char => ({
    '|': Cell.SplitterV,
    '-': Cell.SplitterH,
    '/': Cell.MirrorL,
    '\\': Cell.MirrorR,
  }[char] ?? Cell.Empty)));
});

export const followBeam = memo(({ grid, start }: {
  grid: Cell[][]
  start: Beam
}): {
  beam: Beam[]
  exits: Beam[]
} => {
  const res = new Set<string>();
  const exits = new Set<string>();
  const todo = [start];
  while (todo.length > 0) {
    const next = todo.pop() as Beam;
    while (!res.has(beamToString(next))) {
      res.add(beamToString(next));
      next.pos = posAdd(next.pos)(next.dir);
      const cell = grid[next.pos.y]?.[next.pos.x];
      if (cell === undefined) {
        exits.add(beamToString(next));
        break;
      }

      if (cell === Cell.MirrorL) {
        next.dir = { x: -next.dir.y, y: -next.dir.x };
      } else if (cell === Cell.MirrorR) {
        next.dir = { x: next.dir.y, y: next.dir.x };
      } else if (cell === Cell.SplitterV && next.dir.x !== 0) {
        next.dir = { x: 0, y: 1 };
        todo.push({ ...next, dir: { x: 0, y: -1 } });
      } else if (cell === Cell.SplitterH && next.dir.y !== 0) {
        next.dir = { x: 1, y: 0 }
        todo.push({ ...next, dir: { x: -1, y: 0 } });
      }
    }
  }
  return {
    beam: Array.from(res.values()).map(beamFromString),
    exits: Array.from(exits.values()).map(beamFromString),
  };
});

const energyFromBeam = (beam: Beam[]): number => unique(
  beam.map(({ pos }) => `${pos.x},${pos.y}`),
).length;

const getP2 = (): number => {
  const grid = parseInput();
  let toCheck: Beam[] = [
    ...flat(grid[0].map((_, x) => ([
      { pos: { x, y: -1 }, dir: { x: 0, y: 1 } },
      { pos: { x, y: grid.length }, dir: { x: 0, y: -1 } },
    ]))),
    ...flat(grid.map((_, y) => ([
      { pos: { y, x: -1 }, dir: { y: 0, x: 1 } },
      { pos: { y, x: grid[0].length }, dir: { y: 0, x: -1 } },
    ]))),
  ];
  let maxEnergy = 0;
  while (toCheck.length > 0) {
    const start = toCheck.pop() as Beam;
    const { beam, exits } = followBeam({ grid, start });
    toCheck = toCheck.filter(({ pos }) => {
      return exits.find((exit) => posEq(pos)(exit.pos)) === undefined;
    });
    const energy = energyFromBeam(beam);
    if (energy > maxEnergy) maxEnergy = energy;
  }
  return maxEnergy;
};

export const getSolutions = memo((): { p1: number, p2: number } => {
  const grid = parseInput();
  const p1 = energyFromBeam(followBeam({
    grid,
    start: { pos: { x: -1, y: 0 }, dir: { x: 1, y: 0 } },
  }).beam);
  const p2 = getP2();
  return { p1, p2 };
});

// 8300 (down)
// 8325 (up)
// 8349 (right) - too low
// 8350 (guess) - too low
// 8329 (left)
