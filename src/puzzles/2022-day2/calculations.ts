import * as d3 from 'd3';
import inputRaw from './input.txt?raw';

enum RPS {
  Rock = 0,
  Paper = 1,
  Scissors = 2,
}

enum Outcome {
  Win,
  Lose,
  Draw,
}

const scoreGame = ([a, b]: RPS[]): Outcome => ({
  0: Outcome.Draw,
  1: Outcome.Win,
  2: Outcome.Lose,
}[(b + 3 - a) % 3] ?? Outcome.Draw);

export interface Game {
  a: RPS
  b: RPS
  outcome: Outcome
}

export const parse1 = (): Game[] => {
  return inputRaw.split('\n')
    .map((game) => game.split(' '))
    .filter((parts) => parts.length === 2)
    .map((game) => game.map(
      (play) => ({
        A: RPS.Rock,
        B: RPS.Paper,
        C: RPS.Scissors,
        X: RPS.Rock,
        Y: RPS.Paper,
        Z: RPS.Scissors,
      }[play] ?? RPS.Rock),
    ))
    .map(([a, b]) => ({
      a,
      b,
      outcome: scoreGame([a, b]),
    }));
};

const choosePlay = (opponent: RPS, outcome: Outcome): RPS => {
  return (opponent + 4 + outcome) % 3;
};

export const parse2 = (): Game[] => {
  return inputRaw.split('\n')
    .map((game) => game.split(' '))
    .filter((parts) => parts.length === 2)
    .map((game) => {
      const a = {
        A: RPS.Rock,
        B: RPS.Paper,
        C: RPS.Scissors,
      }[game[0]] ?? RPS.Rock;
      const outcome = {
        X: Outcome.Lose,
        Y: Outcome.Draw,
        Z: Outcome.Win,
      }[game[1]] ?? Outcome.Lose;
      return {
        a,
        b: choosePlay(a, outcome),
        outcome,
      };
    });
};

const scoreOutcome = (outcome: string): number => (
  { Lose: 0, Draw: 3, Win: 6 }[outcome] ?? 0
);

const scorePlay = (play: string): number => (
  { Rock: 1, Paper: 2, Scissors: 3 }[play] ?? 0
);

export interface CrunchedData {
  score: number
  count: number
  byOutcome: Array<{
    outcome: string
    multiplier: number
    byPlay: Array<{
      play: string
      count: number
      multiplier: number
      score: number
    }>
    count: number
    score: number
  }>
}

export const crunchData = (data: Game[]): CrunchedData => {
  const byOutcome = d3.flatRollup(
    data,
    (g) => ({
      total: g.length,
      groups: d3.flatRollup(
        g,
        g => g.length,
        d => (['Rock', 'Paper', 'Scissors'][d.b]),
      ).map(([play, count]) => {
        return {
          play,
          count,
        };
      }),
    }),
    d => ['Win', 'Lose', 'Draw'][d.outcome],
  ).map(([outcome, { groups, total }]) => {
    const outcomeMultiplier = scoreOutcome(outcome);
    const processedGroups = groups.map(({ play, count }) => {
      const multiplier = (scorePlay(play) + outcomeMultiplier);
      return {
        play,
        count,
        multiplier,
        score: count * multiplier,
      };
    });
    return {
      outcome,
      multiplier: outcomeMultiplier,
      byPlay: processedGroups.sort((a, b) => {
        return scorePlay(a.play) - scorePlay(b.play);
      }),
      count: total,
      score: processedGroups.reduce(
        (sum, group) => sum + group.score,
        0,
      ),
    };
  }).sort((a, b) => {
    return scoreOutcome(b.outcome) - scoreOutcome(a.outcome);
  });
  return {
    count: data.length,
    score: byOutcome.reduce(
      (sum, outcome) => sum + outcome.score,
      0,
    ),
    byOutcome,
  };
};
