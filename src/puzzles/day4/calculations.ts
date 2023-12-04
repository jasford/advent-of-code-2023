import inputRaw from './input.txt?raw';

// parse input data into a list of win counts for each line
export const winCounts = inputRaw.trim().split('\n').map((line) => {
  const [lottery, chosen] = line.split(/[:|]+/).slice(1).map(section => {
    return section.trim().split(/[ ]+/).map(s => parseInt(s));
  });
  return chosen.reduce((total, n) => total + (lottery.includes(n) ? 1 : 0), 0);
});

// answer for part 1
export const points = winCounts.reduce(
  (total, w) => total + (w === 0 ? 0 : Math.pow(2, w - 1)),
  0,
);

// answer for part 2
export const cardCopies = winCounts.reduce<number[]>(
  (copies, v, i) => {
    copies[i] = (copies[i] ?? 0) + 1;
    for (let j = i; j < i + v; j++) {
      copies[j + 1] = (copies[j + 1] ?? 0) + copies[i];
    }
    return copies;
  },
  [],
);

export const cardTotal = cardCopies.reduce((s, v) => s + v, 0);
