import inputRaw from './input.txt?raw';

interface GameSet {
  red: number
  green: number
  blue: number
}

type Game = GameSet[];

export const parse = (): Game[] => (
  inputRaw.split('\n').filter(s => s.length > 0).map((line) => {
    return line.split(':')[1].split(';').map((subset) => {
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
    });
  })
);

const setIsImpossible = (totals: GameSet) => (set: GameSet): boolean => (
  set.red > totals.red ||
  set.green > totals.green ||
  set.blue > totals.blue
);

const gameIsPossible = (totals: GameSet) => (sets: GameSet[]): boolean => (
  sets.find(setIsImpossible(totals)) === undefined
);

const minSet = (sets: GameSet[]): GameSet => sets.reduce(
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

export const solution2 = (): number => (
  parse()
    .map(minSet)
    .map(cubePower)
    .reduce((sum, v) => sum + v, 0)
);

export const solution1 = (): number => (
  parse()
    .map(gameIsPossible({ red: 12, green: 13, blue: 14 }))
    .reduce((sum, possible, i) => possible ? sum + i + 1 : sum, 0)
);
