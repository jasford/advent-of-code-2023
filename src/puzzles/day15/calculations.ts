import { memo, sum, replaceOrAppend } from 'radash';
import inputRaw from './input.txt?raw';

const parseInput = (): string[] => {
  return inputRaw.trim().split(',');
};

const hash = (s: string): number => (
  s.split('').reduce((res, _, i) => ((res + s.charCodeAt(i)) * 17) % 256, 0)
);

type Box = Lens[];

interface Lens {
  label: string
  value: number
}

interface Step {
  label: string
  value?: number
}

const parseStep = (s: string): Step => {
  if (s[s.length - 1] === '-') return { label: s.slice(0, -1) };
  const parts = s.split('=');
  return { label: parts[0], value: parseInt(parts[1]) };
};

const doStep = (boxes: Box[], step: Step): Box[] => {
  const nBox = hash(step.label);
  const res = boxes.slice();
  res[nBox] = (step.value === undefined)
    ? (boxes[nBox] ?? []).filter(l => l.label !== step.label)
    : (replaceOrAppend(
        boxes[nBox] ?? [],
        step as Lens,
        l => l.label === step.label,
      ));
  return res;
};

const doSteps = (data: string[]): Box[] => {
  const steps = data.map(parseStep);
  return steps.reduce(doStep, []);
};

const focusPower = (box: Box, boxNum: number): number => (
  sum(box.map((lens, slot) => (boxNum + 1) * (slot + 1) * lens.value))
);

export const getSolutions = memo((): { p1: number, p2: number } => {
  const data = parseInput();
  const p1 = sum(data.map(hash));
  const p2 = sum(doSteps(data).map(focusPower));
  return { p1, p2 };
});
