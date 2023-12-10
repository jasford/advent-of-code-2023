import { memo } from 'radash';
import inputRaw from './input.txt?raw';

const parseData = (): number[][] => {
  return inputRaw.trim().split('\n').map((line) => line.split(' ').map(v => parseInt(v)));
};

const differentiate = (sequence: number[]): number[] => {
  return sequence.slice(1).map((v, i) => v - sequence[i]);
};

const getDerivatives = (sequence: number[]): number[][] => {
  const res: number[][] = [sequence];
  while (res[res.length - 1].find(v => v !== 0) !== undefined) {
    res.push(differentiate(res[res.length - 1]));
  }
  return res;
};

const extrapolate = (sequence: number[]): number => {
  const derivatives = getDerivatives(sequence).reverse();
  derivatives[0].push(0);
  derivatives.slice(1).forEach((line, i) => {
    const lastVal = line[line.length - 1];
    const derivative = derivatives[i];
    const diff = derivative[derivative.length - 1];
    line.push(lastVal + diff);
  });
  const lastLine = derivatives[derivatives.length - 1];
  return lastLine[lastLine.length - 1];
};

export const getSolutions = memo((): { p1: number, p2: number } => {
  const inputData = parseData();
  return {
    p1: inputData.reduce((sum, seq) => sum + extrapolate(seq), 0),
    p2: inputData.reduce((sum, seq) => sum + extrapolate(seq.reverse()), 0),
  };
});
