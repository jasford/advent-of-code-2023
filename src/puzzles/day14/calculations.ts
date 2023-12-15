import { sum, chain } from 'radash';
import inputRaw from './input.txt?raw';

export enum Cell {
  Rounded,
  Cube,
  Empty,
}

export const parseInput = (): Cell[][] => (
  inputRaw.trim().split('\n').map(
    row => row.split('').map(
      c => ({ '#': Cell.Cube, O: Cell.Rounded }[c] ?? Cell.Empty),
    ),
  )
);

export const tiltNorth = (grid: Cell[][]): Cell[][] => {
  const newGrid = grid.map(r => r.slice());
  newGrid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === Cell.Rounded) {
        let newY = y;
        while (newGrid[newY - 1]?.[x] === Cell.Empty) newY -= 1;
        if (newY < y) {
          newGrid[y][x] = Cell.Empty;
          newGrid[newY][x] = Cell.Rounded;
        }
      }
    });
  });
  return newGrid;
};

export const rotate90 = (grid: Cell[][]): Cell[][] => {
  const g = grid.slice().reverse();
  return g[0].map((_, x) => g.map((row) => row[x]));
};

const load = (grid: Cell[][]): number => {
  return sum(grid.map((row, y) => {
    return row.filter(cell => cell === Cell.Rounded).length * (grid.length - y);
  }));
};

const gridMatch = (a: Cell[][]) => (b: Cell[][]): boolean => {
  return a.find((row, y) => {
    return row.find((cell, x) => {
      return b[y][x] !== cell;
    }) !== undefined;
  }) === undefined;
};

const cycle = chain(
  tiltNorth,
  rotate90,
  tiltNorth,
  rotate90,
  tiltNorth,
  rotate90,
  tiltNorth,
  rotate90,
);

export const afterNCycles = (n: number) => (grid: Cell[][]): Cell[][] => {
  const history = [grid];
  let g = grid;
  let loopSize = 0;
  let i = n;
  while (i > 0) {
    g = cycle(g);
    if (loopSize === 0) {
      const matchIndex = history.findIndex(gridMatch(g));
      if (matchIndex > -1) {
        loopSize = history.length - matchIndex;
        i = i % loopSize;
      }
      history.push(g);
    }
    i -= 1;
  }
  return g;
};

export const getSolutions = (): { p1: number, p2: number } => {
  const grid = parseInput();
  const p1 = load(tiltNorth(grid));
  const p2 = load(afterNCycles(1000000000)(grid));
  return { p1, p2 };
};
