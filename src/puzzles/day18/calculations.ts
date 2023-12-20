import { memo, sum } from 'radash';
import inputRaw from './input.txt?raw';

export interface XY {
  x: number
  y: number
}

const xyAdd = (p1: XY) => (p2: XY): XY => ({ x: p1.x + p2.x, y: p1.y + p2.y });

const xyMult = ({ x, y }: XY) => (v: number): XY => ({ x: x * v, y: y * v });

const origin: XY = { x: 0, y: 0 };

interface Step {
  p1: XY
  p2: XY
}

const dirs: Record<string, XY> = {
  R: { x: 1, y: 0 },
  D: { x: 0, y: 1 },
  L: { x: -1, y: 0 },
  U: { x: 0, y: -1 },
};

const dirMap: Record<string, string> = {
  0: 'R', 1: 'D', 2: 'L', 3: 'U',
};

const parseInput = (): Step[] => {
  return inputRaw.trim().split('\n').map(row => {
    const [d, v, h] = row.split(' ');
    const p1Val = parseInt(v);
    const p1 = xyMult(dirs[d] ?? origin)(p1Val);
    const hex = h.substring(2, h.length - 1);
    const p2 = xyMult(dirs[dirMap[hex[5]]])(parseInt(hex.substring(0, 5), 16));
    return { p1, p2 };
  });
};

const shoelace = (points: XY[]): number => sum(
  points.slice(1).map((b, i) => {
    const a = points[i];
    return a.x * b.y - b.x * a.y;
  }),
) * 0.5;

const getPoints = (dirs: XY[]): XY[] => {
  const res: XY[] = [origin];
  dirs.forEach(dir => {
    res.push(xyAdd(res[res.length - 1])(dir));
  });
  return res;
};

const getPerimeter = (points: XY[]): number => sum(
  points.map(p => Math.abs(p.x) + Math.abs(p.y)),
);

const getAns = (dirs: XY[]): number => {
  const points = getPoints(dirs);
  const area = shoelace(points);
  const perimeter = getPerimeter(dirs);
  const interior = area - (perimeter / 2) + 1;
  return interior + perimeter;
};

export const getSolutions = memo((): { p1: number, p2: number } => {
  const data = parseInput();
  const p1 = getAns(data.map(({ p1 }) => p1));
  const p2 = getAns(data.map(({ p2 }) => p2));
  return { p1, p2 };
});
