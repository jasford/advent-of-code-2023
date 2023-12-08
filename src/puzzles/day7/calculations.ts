import { counting, omit } from 'radash';
import inputRaw from './input.txt?raw';

enum HandKind {
  HighCard,
  OnePair,
  TwoPair,
  ThreeOfKind,
  FullHouse,
  FourOfKind,
  FiveOfKind,
}

interface Hand {
  cards: number[]
  kind: HandKind
  kind2: HandKind
  bid: number
}

const cardNum = (s: string): number => ({
  T: 10, J: 11, Q: 12, K: 13, A: 14,
}[s] ?? parseInt(s));

const isFullHouse = (counts: number[], jackCount: number): boolean => {
  if (counts[0] === 3 && counts[1] + jackCount >= 2) return true;
  if (counts[0] === 2 && counts[1] + jackCount >= 3) return true;
  return (counts[0] === 1 && jackCount >= 3);
};

// with Jacks wild
const handKind = (
  { jacksWild }: { jacksWild: boolean },
) => (cards: number[]): HandKind => {
  const countsByCard = counting(cards, c => c);
  const jackCount = jacksWild ? (countsByCard[11] ?? 0) : 0;
  const counts = Object.values(jacksWild ? omit(countsByCard, [11]) : countsByCard).sort((a, b) => b - a);
  if (jackCount === 5 || counts[0] + jackCount >= 5) return HandKind.FiveOfKind;
  if (counts[0] + jackCount >= 4) return HandKind.FourOfKind;
  if (isFullHouse(counts, jackCount)) return HandKind.FullHouse;
  if (counts[0] + jackCount >= 3) return HandKind.ThreeOfKind;
  if (counts[0] === 2) {
    if (jackCount === 2 || counts[1] + jackCount >= 2) return HandKind.TwoPair;
    return HandKind.OnePair;
  }
  if (jackCount >= 3) return HandKind.TwoPair;
  if (jackCount >= 1) return HandKind.OnePair;
  return HandKind.HighCard;
};

// reduce the value of jacks to -1 (least valuable card)
const jackAdjusted = (card: number): number => (card === 11) ? -1 : card;

const compareHands = (
  { jacksWild }: { jacksWild: boolean },
) => (a: Hand, b: Hand): number => {
  const kindComparison = jacksWild ? a.kind2 - b.kind2 : a.kind - b.kind;
  if (kindComparison !== 0) return kindComparison;
  for (let i = 0; i < 5; i++) {
    const cardComparison = jacksWild
      ? jackAdjusted(a.cards[i]) - jackAdjusted(b.cards[i])
      : a.cards[i] - b.cards[i];
    if (cardComparison !== 0) return cardComparison;
  }
  return 0;
};

const parseHand = () => (line: string): Hand => {
  const parts = line.split(' ');
  const cards = parts[0].split('').map(cardNum);
  return {
    cards,
    kind: handKind({ jacksWild: false })(cards),
    kind2: handKind({ jacksWild: true })(cards),
    bid: parseInt(parts[1]),
  };
};

export const parseData = (): Hand[] =>
  inputRaw.trim().split('\n').map(parseHand());
export const getSolutions = (): { p1: number, p2: number } => {
  const inputData = parseData();
  return {
    p1: inputData
      .sort(compareHands({ jacksWild: false })).map((hand, i) => hand.bid * (i + 1))
      .reduce((sum, v) => sum + v),
    p2: inputData
      .sort(compareHands({ jacksWild: true })).map((hand, i) => hand.bid * (i + 1))
      .reduce((sum, v) => sum + v),
  };
};
