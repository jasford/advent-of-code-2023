import { memo } from 'radash';
import inputRaw from './input.txt?raw';

const digitStrings = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

// given a string, see if it starts with a number and return the number
// if checkStrings is true, consider a string values like "one" to be numbers
export const getNum = (s: string, checkStrings: boolean): [number, string] | null => {
  if (s.length === 0) return null;
  const digit = parseInt(s[0]);
  if (!isNaN(digit)) return [digit, s[0]];
  if (!checkStrings) return null;
  const digitStringIndex = digitStrings.findIndex(ds => s.startsWith(ds));
  if (digitStringIndex === -1) return null;
  return [digitStringIndex + 1, digitStrings[digitStringIndex]];
};

// search through a string to find the first number and return it
// if fromEnd is true, search from back to front
export const getFirstNum = (
  checkStrings: boolean = false,
) => (s: string, fromEnd = false): [number, number | null] => {
  const start = fromEnd ? s.length - 1 : 0;
  const end = fromEnd ? 0 : s.length - 1;
  const inc = fromEnd ? -1 : 1;
  for (let i = start; end + inc !== i; i += inc) {
    const num = getNum(s.slice(i), checkStrings);
    if (num !== null) return [num[0], i];
  }
  return [0, null];
};

export const processLine = (advanced: boolean) => (line: string): number => {
  const fn = getFirstNum(advanced);
  return fn(line)[0] * 10 + fn(line, true)[0];
};

export const getSolutions = memo(() => {
  const inputData = inputRaw.split('\n').filter(s => s.length > 0);

  const answers = [getFirstNum(false), getFirstNum(true)].map(
    fn => inputData
      .map(s => fn(s)[0] * 10 + fn(s, true)[0])
      .reduce((s, v) => s + v, 0),
  );

  return { inputData, p1: answers[0], p2: answers[1] };
});
