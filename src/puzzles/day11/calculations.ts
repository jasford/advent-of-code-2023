import { memo, range } from 'radash';
import inputRaw from './input.txt?raw';

interface Pos {
  x: number
  y: number
}

const getEmpties = (data: string[]): { rows: number[], cols: number[] } => {
  const emptyColumns: number[] = [];
  for (const col of range(data[0].length - 1)) {
    if (data.find((row) => row[col] === '#') === undefined) {
      emptyColumns.push(col);
    }
  }
  const emptyRows = data
    .map((row, i) => ({ row, i }))
    .filter(({ row }) => !row.includes('#'))
    .map(({ i }) => i);
  return { cols: emptyColumns, rows: emptyRows };
};

const getStarCoords = (data: string[]): Pos[] => {
  const res: Pos[] = [];
  data.forEach((row, y) => {
    row.split('').forEach((c, x) => {
      if (c === '#') res.push({ x, y });
    });
  });
  return res;
};

const taxiDist = (a: Pos, b: Pos): number =>
  Math.abs(b.x - a.x) + Math.abs(b.y - a.y);

const numBetween = (a: number, b: number) => (v: number): boolean => {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return v > min && v < max;
};

const distWithExpansion = ({ empties, expansion }: {
  empties: { rows: number[], cols: number[] }
  expansion: number
}) => (a: Pos, b: Pos): number => {
  const dist = taxiDist(a, b);
  const xExpansion = empties.cols.filter(numBetween(a.x, b.x)).length;
  const yExpansion = empties.rows.filter(numBetween(a.y, b.y)).length;
  return dist + (xExpansion + yExpansion) * expansion;
};

const getDistanceSum = (data: string[], expansion: number): number => {
  const stars = getStarCoords(data);
  const empties = getEmpties(data);
  const dist = distWithExpansion({ empties, expansion });
  return stars.reduce(
    (sum, star, i) => {
      const distances = stars.slice(i + 1).map((b) => dist(star, b));
      return distances.reduce((s, v) => s + v, sum);
    },
    0,
  );
};

export const getSolutions = memo((): { p1: number, p2: number } => {
  const data = inputRaw.trim().split('\n');
  return {
    p1: getDistanceSum(data, 1),
    p2: getDistanceSum(data, 999999),
  };
});
