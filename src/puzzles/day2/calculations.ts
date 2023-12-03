import inputRaw from './input.txt?raw';

export interface GameSet {
  red: number
  green: number
  blue: number
}

export interface Game {
  data: GameSet[]
  possible: boolean
  mins: GameSet
  cubePower: number
}

const inputData = inputRaw
  .split('\n')
  .filter(s => s.length > 0)
  .map((line) => line.split(':')[1].split(';').map((subset) => {
    const output = {
      red: 0,
      green: 0,
      blue: 0,
    };
    subset.trim().split(',').forEach((part) => {
      const [num, color] = part.trim().split(' ');
      if (color === 'red' || color === 'green' || color === 'blue') {
        output[color] = parseInt(num);
      }
    });
    return output;
  }));

const setIsImpossible = (totals: GameSet) => (set: GameSet): boolean => (
  set.red > totals.red ||
  set.green > totals.green ||
  set.blue > totals.blue
);

const gameIsPossible = (totals: GameSet) => (sets: GameSet[]): boolean => (
  sets.find(setIsImpossible(totals)) === undefined
);

const maxSet = (sets: GameSet[]): GameSet => sets.reduce(
  (output, set) => ({
    red: Math.max(set.red, output.red),
    green: Math.max(set.green, output.green),
    blue: Math.max(set.blue, output.blue),
  }),
  { red: 0, green: 0, blue: 0 },
);

const cubePower = (game: GameSet): number => (
  game.red * game.green * game.blue
);

export const gameData: Game[] = inputData.map((sets) => {
  const mins = maxSet(sets);
  return {
    data: sets,
    possible: gameIsPossible({ red: 12, green: 13, blue: 14 })(sets),
    mins,
    cubePower: cubePower(mins),
  };
});

export const solution2 = gameData
  .reduce((sum, { cubePower }) => sum + cubePower, 0);

export const solution1 = gameData
  .reduce((sum, { possible }, i) => possible ? sum + i + 1 : sum, 0);
