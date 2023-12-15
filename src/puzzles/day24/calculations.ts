import { memo } from 'radash';
import inputRaw from './input.txt?raw';

const parseInput = (): string[] => {
  return inputRaw.trim().split('\n');
};

export const getSolutions = memo((): { p1: number, p2: number } => {
  const data = parseInput();
  console.log(data);

  const p1 = 0;
  const p2 = 0;
  return { p1, p2 };
});
