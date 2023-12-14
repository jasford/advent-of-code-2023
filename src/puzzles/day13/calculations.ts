import { memo, range, sum } from 'radash';
import inputRaw from './input.txt?raw';

type Pattern = boolean[][];

const parseInput = (): Pattern[] => inputRaw.trim().split('\n\n').map(
  lines => lines.split('\n').map(
    line => line.split('').map(c => c === '#'),
  ),
);

const colsIdentical = (pattern: Pattern, a: number, b: number): boolean => {
  return pattern.find(
    (_, y) => pattern[y][a] !== pattern[y][b],
  ) === undefined;
};

const hasVerticalReflection = (pattern: Pattern, col: number): boolean => {
  for (let x = col; x >= 0; x -= 1) {
    const x2 = col + (col - x) + 1;
    if (x2 >= pattern[0].length) continue;
    if (!colsIdentical(pattern, x, x2)) return false;
  }
  return true;
};

const findVerticalReflections = (pattern: Pattern): number[] => (
  pattern[0].slice(0, -1).map((_, x) => x).filter(
    x => hasVerticalReflection(pattern, x),
  )
);

// for (let x = 0; x < pattern[0].length - 1; x += 1) {
//   if (hasVerticalReflection(pattern, x)) return x;
// }
// return null;

const rotatePattern = (pattern: Pattern): Pattern => {
  return pattern[0].map((_, x) => pattern.map((row) => row[x]));
};

interface Reflection {
  horizontal: boolean
  index: number
}

const getReflections = (pattern: Pattern): Reflection[] => ([
  ...findVerticalReflections(pattern).map(index => ({ horizontal: false, index })),
  ...findVerticalReflections(rotatePattern(pattern)).map(index => ({ horizontal: true, index })),
]);

const scoreReflection = (r: Reflection): number => {
  return (r.index + 1) * (r.horizontal ? 100 : 1);
};

const getP1 = (patterns: Pattern[]): number => sum(
  patterns.map(getReflections).map(([r]) => r).map(scoreReflection),
);

const reflectionEquals = (a: Reflection) => (b: Reflection): boolean => (
  a.horizontal === b.horizontal && a.index === b.index
);

const getDesmudgedReflection = (pattern: Pattern): Reflection => {
  const originalReflection = getReflections(pattern)[0];
  for (let x = 0; x < pattern[0].length; x++) {
    for (let y = 0; y < pattern.length; y++) {
      const edited = [
        ...pattern.slice(0, y),
        [...pattern[y].slice(0, x), !pattern[y][x], ...pattern[y].slice(x + 1)],
        ...pattern.slice(y + 1),
      ];
      const reflections = getReflections(edited).filter(r => !reflectionEquals(originalReflection)(r));
      if (reflections.length === 1) return reflections[0];
    }
  }
  throw Error('no smudge found');
};

const getP2 = (patterns: Pattern[]): number => sum(
  patterns.map(getDesmudgedReflection).map(scoreReflection),
);

export const getSolutions = memo((): { p1: number, p2: number } => {
  const patterns = parseInput();
  return {
    p1: getP1(patterns),
    p2: getP2(patterns),
  };
});
