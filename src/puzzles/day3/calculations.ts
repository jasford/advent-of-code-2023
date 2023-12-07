import { memo } from 'radash';
import inputRaw from './input.txt?raw';

// symbols are always active and have parsed=null
export interface NumItem {
  pos: Pos
  endX: number
  chars: string
  symbols: Pos[]
  parsed: number
}

export interface SymItem {
  pos: Pos
  char: string
  gearRatio: number | null
}

export const inputRows = memo(() => inputRaw.trim().split('\n'));

const isNum = (c: string): boolean =>
  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(c);

const classifyChar = (c: string | undefined): 'number' | 'symbol' | null => (
  (c === undefined || c === '.')
    ? null
    : (isNum(c) ? 'number' : 'symbol')
);

export interface Pos {
  x: number
  y: number
}

// given the row and start/end for a number, return the coordinates of the
// symbol(s) it touches
const nearbySymbols = (
  pos: Pos,
  endX: number,
): Pos[] => {
  const output: Pos[] = [];
  const rowData = inputRows();
  for (let i = pos.x - 1; i <= endX + 1; i++) {
    if (classifyChar(rowData[pos.y - 1]?.[i]) === 'symbol') output.push({ x: i, y: pos.y - 1 });
    if (classifyChar(rowData[pos.y + 1]?.[i]) === 'symbol') output.push({ x: i, y: pos.y + 1 });
  }
  if (classifyChar(rowData[pos.y]?.[pos.x - 1]) === 'symbol') output.push({ x: pos.x - 1, y: pos.y });
  if (classifyChar(rowData[pos.y]?.[endX + 1]) === 'symbol') output.push({ x: endX + 1, y: pos.y });
  return output;
};

// given the start and end pos for a number, parse it and see if it is active
// (touching a symbol)
const processNumber = (pos: Pos, endX: number): NumItem => {
  const chars = inputRows()[pos.y].slice(pos.x, endX + 1);
  return {
    pos,
    endX,
    chars,
    symbols: nearbySymbols(pos, endX),
    parsed: parseInt(chars),
  };
};

const parseItems = (): { numbers: NumItem[], symbols: SymItem[] } => {
  const numbers: NumItem[] = [];
  const symbols: SymItem[] = [];

  // iterate through each row to pull out numbers and symbols
  inputRows().forEach((row, r) => {
    // null if we are not parsing a number, else the start i for the number
    let numStart: number | null = null;

    // iterate through the characters in the row
    for (let i = 0; i < row.length; i++) {
      const charType = classifyChar(row[i]);

      // if we are not parsing a number, but got a digit, start parsing one
      if (numStart === null && charType === 'number') {
        numStart = i;
      }

      // if we were parsing a number but it's over, record it to items list
      if (numStart !== null && charType !== 'number') {
        numbers.push(processNumber({ x: numStart, y: r }, i - 1));
        numStart = null;
      }

      // if this is a symbol, record it
      if (charType === 'symbol') {
        symbols.push({ pos: { y: r, x: i }, char: row[i], gearRatio: null });
      }
    }
    if (numStart !== null) {
      numbers.push(processNumber({ y: r, x: numStart }, row.length - 1));
      numStart = null;
    }
  });

  // iterate through the symbols to find the gears
  symbols.filter(({ char }) => char === '*').forEach((symbol) => {
    const attachedNumbers = numbers.filter((num) => {
      return num.symbols.find((s) => s.x === symbol.pos.x && s.y === symbol.pos.y);
    });
    if (attachedNumbers.length === 2) {
      symbol.gearRatio = attachedNumbers[0].parsed * attachedNumbers[1].parsed;
    }
  });
  return { numbers, symbols };
};

export const getData = memo(() => {
  const parsedItems = parseItems();

  const gearRatioSum = parsedItems.symbols.reduce((sum, s) => sum + (s.gearRatio ?? 0), 0);

  const activeItemSum = parsedItems.numbers.reduce(
    (sum, item) => sum + ((item.symbols.length > 0) ? item.parsed : 0),
    0,
  );

  return { parsedItems, gearRatioSum, activeItemSum, inputRows: inputRows() };
});
