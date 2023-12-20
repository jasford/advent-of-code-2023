import Graph from 'node-dijkstra';
import { memo, sum, assign, range } from 'radash';
import inputRaw from './input.txt?raw';

export interface XY {
  x: number
  y: number
}

const xyAdd = (p1: XY) => (p2: XY): XY => ({ x: p1.x + p2.x, y: p1.y + p2.y });

const origin: XY = { x: 0, y: 0 };

const parseInput = (): number[][] => inputRaw.trim().split('\n').map(
  row => row.split('').map(v => parseInt(v)),
);

const neighbors = (
  grid: number[][],
  pos: XY,
  horizontal:
  boolean,
  min: number,
  max: number,
): Record<string, number> => {
  const res: Record<string, number> = {};
  const axis = horizontal ? 'y' : 'x';
  const steps = Array.from(range(1, max));
  [steps.map(s => s * -1), steps].map(seq => seq.map(n => {
    const p = xyAdd(pos)({ ...origin, [axis]: n });
    return { pos: p, val: grid[p.y]?.[p.x] };
  }).filter(({ val }) => val !== undefined)).forEach(seq => {
    seq.forEach((e, i) => {
      if (i < min - 1) return;
      const key = (e.pos.x === grid[0].length - 1 && e.pos.y === grid.length - 1)
        ? 'end'
        : `${horizontal ? 'V' : 'H'}${e.pos.x},${e.pos.y}`;
      res[key] = sum(seq.slice(0, i + 1).map(({ val }) => val));
    });
  });
  return res;
};

const buildGraph = (grid: number[][], min: number, max: number): Graph => {
  const g = new Graph();
  grid.forEach((row, y) => {
    row.forEach((_, x) => {
      if (x === 0 && y === 0) {
        g.addNode('start', assign(
          neighbors(grid, origin, true, min, max),
          neighbors(grid, origin, false, min, max),
        ));
        return;
      }
      if (x === grid[0].length - 1 && y === grid.length) {
        g.addNode('end', {});
      };
      g.addNode(`H${x},${y}`, neighbors(grid, { x, y }, true, min, max));
      g.addNode(`V${x},${y}`, neighbors(grid, { x, y }, false, min, max));
    });
  });
  return g;
};

interface Solution {
  path: XY[]
  cost: number
}

const solve = memo((grid: number[][], min: number, max: number): Solution => {
  const g = buildGraph(grid, min, max);
  const solution = g.path('start', 'end', { cost: true });
  if (Array.isArray(solution)) return { path: [origin], cost: 0 };
  return {
    path: solution.path.map(s => {
      if (s === 'start') return origin;
      if (s === 'end') return { x: grid[0].length - 1, y: grid.length - 1 };
      const [x, y] = s.substring(1).split(',').map(v => parseInt(v));
      return { x, y };
    }),
    cost: solution.cost,
  };
});

export const getSolutions = memo((): {
  grid: number[][]
  p1: Solution
  p2: Solution
} => {
  const grid = parseInput();
  return {
    grid,
    p1: solve(grid, 1, 3),
    p2: solve(grid, 4, 10),
  };
});
