import { memo } from 'radash';
import inputRaw from './input.txt?raw';

interface Pos {
  x: number
  y: number
}

interface ConnectedPos {
  pos: Pos
  connections: Pos[]
}

const parseData = (): string[] => inputRaw.split('\n');

const up = (pos: Pos): Pos => ({ ...pos, y: pos.y - 1 });
const down = (pos: Pos): Pos => ({ ...pos, y: pos.y + 1 });
const left = (pos: Pos): Pos => ({ ...pos, x: pos.x - 1 });
const right = (pos: Pos): Pos => ({ ...pos, x: pos.x + 1 });

const getConnections = (pos: Pos, data: string[]): Pos[] => {
  return {
    '|': [up(pos), down(pos)],
    '-': [left(pos), right(pos)],
    L: [up(pos), right(pos)],
    J: [up(pos), left(pos)],
    7: [left(pos), down(pos)],
    F: [right(pos), down(pos)],
  }[data[pos.y]?.[pos.x]] ?? [];
};

export const findS = (data: string[]): Pos | null => {
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      if (data[row][col] === 'S') return { x: col, y: row };
    }
  }
  return null;
};

const posEq = (p1: Pos, p2: Pos): boolean => p1.x === p2.x && p1.y === p2.y;

const getFirstMove = (s: Pos, data: string[]): ConnectedPos => {
  for (const fn of [up, down, left, right]) {
    const next = fn(s);
    const connections = getConnections(next, data);
    if (connections.length !== 2) continue;
    if (connections.find(p => p.x === s.x && p.y === s.y) !== undefined) {
      return { pos: next, connections };
    }
  }
  return { pos: s, connections: [] };
};

export const loopFromS = (data: string[]): ConnectedPos[] => {
  const sPos = findS(data);
  if (sPos === null) return [];
  const firstMove = getFirstMove(sPos, data);
  const loop = [
    { pos: sPos, connections: [] },
    firstMove,
  ];
  while (true) {
    const last = loop[loop.length - 1];
    const prior = loop[loop.length - 2];
    const next = last.connections.find(p => !posEq(p, prior.pos));
    if (next === undefined || posEq(next, loop[0].pos)) return loop;
    loop.push({ pos: next, connections: getConnections(next, data) });
  }
};

const countInsideTiles = (loop: Pos[], data: string[]): {
  count: number
  history: string[][]
} => {
  const grid = data.map(row => row.split('').map(_c => '.'));
  const history: string[][] = [];
  const saveToHistory = (): void => {
    history.push(grid.map(row => row.join('')));
  };
  loop.forEach(p => {
    grid[p.y][p.x] = data[p.y][p.x];
  });
  // saveToHistory();

  const toSet: Array<{ pos: Pos, char: string }> = [];
  loop.forEach((p, i) => {
    if (data[p.y][p.x] === '|') {
      const down = (loop[i - 1].y < p.y);
      toSet.push({ pos: { ...p, x: p.x - 1 }, char: down ? 'A' : 'B' });
      toSet.push({ pos: { ...p, x: p.x + 1 }, char: down ? 'B' : 'A' });
    }
    if (data[p.y][p.x] === '-') {
      const right = (loop[i - 1].x < p.x);
      toSet.push({ pos: { ...p, y: p.y - 1 }, char: right ? 'B' : 'A' });
      toSet.push({ pos: { ...p, y: p.y + 1 }, char: right ? 'A' : 'B' });
    }
    if (data[p.y][p.x] === 'L') {
      const right = (loop[i - 1].x === p.x);
      toSet.push({ pos: { ...p, y: p.y + 1 }, char: right ? 'A' : 'B' });
      toSet.push({ pos: { ...p, x: p.x - 1 }, char: right ? 'A' : 'B' });
    }
    if (data[p.y][p.x] === 'F') {
      const right = (loop[i - 1].y === p.y);
      toSet.push({ pos: { ...p, y: p.y - 1 }, char: right ? 'A' : 'B' });
      toSet.push({ pos: { ...p, x: p.x - 1 }, char: right ? 'A' : 'B' });
    }
    if (data[p.y][p.x] === 'J') {
      const right = (loop[i - 1].y === p.y);
      toSet.push({ pos: { ...p, y: p.y + 1 }, char: right ? 'A' : 'B' });
      toSet.push({ pos: { ...p, x: p.x + 1 }, char: right ? 'A' : 'B' });
    }
    if (data[p.y][p.x] === '7') {
      const right = (loop[i - 1].x === p.x);
      toSet.push({ pos: { ...p, y: p.y - 1 }, char: right ? 'A' : 'B' });
      toSet.push({ pos: { ...p, x: p.x + 1 }, char: right ? 'A' : 'B' });
    }
  });
  // saveToHistory();
  while (toSet.length > 0) {
    const next = toSet.pop();
    if (next === undefined) continue;
    const { pos, char } = next;
    if (grid[pos.y]?.[pos.x] !== '.') continue;
    grid[pos.y][pos.x] = char;
    [left, right, up, down].forEach(fn => {
      toSet.push({ pos: fn(pos), char });
    });
    // saveToHistory();
  }
  saveToHistory();
  const outside =
    grid[0].find((c => c === 'A' || c === 'B')) ??
    grid.find(row => row[0] === 'A' || row[0] === 'B')?.[0] ?? 'B';
  const inside = outside === 'A' ? 'B' : 'A';
  const count = grid.reduce((count, row) => {
    return row.reduce((c, s) => c + (s === inside ? 1 : 0), count);
  }, 0);
  return { count, history };
};

export const getSolutions = memo((): {
  p1: number
  p2: number
  history: string[][]
} => {
  const data = parseData();
  const loop = loopFromS(data);
  const insideTileCalc = countInsideTiles(loop.map(p => p.pos), data);
  return {
    p1: loop.length / 2,
    p2: insideTileCalc.count,
    history: insideTileCalc.history,
  };
});
