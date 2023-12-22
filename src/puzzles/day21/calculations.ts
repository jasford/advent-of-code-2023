import { memo, flat, sum } from 'radash';
import inputRaw from './input.txt?raw';

export interface XY {
  x: number
  y: number
}

const xyAdd = (p1: XY) => (p2: XY): XY => ({ x: p1.x + p2.x, y: p1.y + p2.y });

enum Cell {
  Empty,
  Rock,
  Reached,
}

type Grid = Cell[][];

const parseInput = memo((): Cell[][] => flat([1, 2, 3, 4, 5, 6, 7].map(iy => inputRaw.trim().split('\n').map(
  row => flat([1, 2, 3, 4, 5, 6, 7].map(ix => row.split('').map(c => ({
    '#': Cell.Rock,
    S: ix === 4 && iy === 4 ? Cell.Reached : Cell.Empty,
  }[c] ?? Cell.Empty)))),
))));

const getNeighbors = (p: XY): XY[] => [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
].map(xyAdd(p));

const nextGrid = (grid: Grid): Grid => {
  const cells = flat(
    grid.map((row, y) => row.map((cell, x) => ({ pos: { x, y }, cell }))),
  );
  const reachedCells = cells
    .filter(({ cell }) => cell === Cell.Reached)
    .map(({ pos }) => pos);
  const minReached = {
    x: Math.min(...reachedCells.map(({ x }) => x)),
    y: Math.min(...reachedCells.map(({ y }) => y)),
  };
  const maxReached = {
    x: Math.max(...reachedCells.map(({ x }) => x)),
    y: Math.max(...reachedCells.map(({ y }) => y)),
  };
  return grid.map((row, y) => {
    if (y < minReached.y - 1 || y > maxReached.y + 1) return row;
    return row.map((cell, x) => {
      if (cell === Cell.Rock || x < minReached.x - 1 || x > maxReached.x + 1) {
        return cell;
      }
      return getNeighbors({ x, y }).find(
        ({ x, y }) => grid[y]?.[x] === Cell.Reached,
      ) !== undefined
        ? Cell.Reached
        : Cell.Empty;
    });
  });
};

const solveForSteps = (grid: Grid, steps: number): number => {
  let g = grid;
  for (let i = 0; i < steps; i++) g = nextGrid(g);
  return sum(g.map(row => sum(row.map(cell => cell === Cell.Reached ? 1 : 0))));
};

const solveForSteps2 = (grid: Grid, steps: number): number => {
  const gridSize = inputRaw.trim().split('\n').length;
  const target = Math.floor(steps / gridSize);
  const mod = steps % gridSize;
  const inputs = [0, 1, 2].map(i => solveForSteps(grid, mod + i * gridSize));
  const coeff = {
    a: (inputs[0] / 2) - inputs[1] + (inputs[2] / 2),
    b: -3 * (inputs[0] / 2) + 2 * inputs[1] - (inputs[2] / 2),
    c: inputs[0],
  };
  return coeff.a * target * target + coeff.b * target + coeff.c;
};

export const getSolutions = memo((): { p1: number, p2: number } => {
  const grid = parseInput();

  const p1 = solveForSteps(grid, 64);
  const p2 = solveForSteps2(grid, 64);
  return { p1, p2 };
});
