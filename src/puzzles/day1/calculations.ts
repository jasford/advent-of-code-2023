import inputRaw from './input.txt?raw';

export const parse = (): number[][] => {
  return inputRaw.split('\n\n').map(
    (elf) => elf.split('\n').map((item) => parseInt(item)),
  );
};
