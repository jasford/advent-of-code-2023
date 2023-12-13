import { sum, memo, range } from 'radash';
import inputRaw from './input.txt?raw';

enum Spring {
  Ok,
  Broken,
  Unknown,
}

interface Row {
  springs: Spring[]
  rollup: number[]
}

const parseData = (): Row[] => {
  return inputRaw.trim().split('\n').map((row) => {
    const [springs, rollup] = row.split(' ');
    return {
      springs: springs.split('').map(s => ({
        '.': Spring.Ok,
        '#': Spring.Broken,
      }[s] ?? Spring.Unknown)),
      rollup: rollup.split(',').map(v => parseInt(v)),
    };
  });
};

const unfoldRow = (row: Row): Row => {
  const arr5 = Array.from(range(4));
  return {
    springs: arr5.reduce<Spring[]>((a) => a.concat([Spring.Unknown, ...row.springs]), []).slice(1),
    rollup: arr5.reduce<number[]>((a) => a.concat(row.rollup), []),
  };
};

// check if it is possible for the first grouping of Broken springs to match
// the given value
const matchBeginning = (springs: Spring[], val: number): boolean => {
  if (springs.slice(0, val).includes(Spring.Ok)) return false;
  return springs.length === val || springs[val] !== Spring.Broken;
};

const count = memo((row: Row): number => {
  // get the total number of broken springs we need
  const total = sum(row.rollup);

  // get the min and max possible number of broken springs given Unknowns
  const minimum = row.springs.filter(s => s === Spring.Broken).length;
  const maximum = row.springs.filter(s => s !== Spring.Ok).length;

  // if it is not possible to hit the goal, there are no solutions
  if (minimum > total || maximum < total) return 0;

  // if we don't need any springs, we count it as one solution
  if (total === 0) return 1;

  // if the first spring is On, we can ignore it
  if (row.springs[0] === Spring.Ok) {
    return count({ ...row, springs: row.springs.slice(1) });
  }

  // if the first spring is Broken
  if (row.springs[0] === Spring.Broken) {
    // get the first value needed
    const val = row.rollup[0];

    // if it is not possible to get the value needed, return 0
    if (!matchBeginning(row.springs, val)) return 0;

    // if we need all the springs to hit the value, there is one solution
    if (val === row.springs.length) return 1;

    // since we know the start of our springs list is the first
    // group, we can remove it and count the possible solutions with
    // that group (and the springs for it) taken out.
    // console.log('f');
    return count({
      springs: row.springs.slice(val + 1),
      rollup: row.rollup.slice(1),
    });
  }

  // at this point we know the first spring is Unknown, so we add up the
  // counts with it being removed (since On at the start is removed) and Broken
  // console.log('g');
  return (
    count({ ...row, springs: row.springs.slice(1) }) +
    count({ ...row, springs: [Spring.Broken, ...row.springs.slice(1)] })
  );
});

export const getSolutions = memo((): { p1: number, p2: number } => {
  const rows = parseData();
  return {
    p1: sum(rows.map(count)),
    p2: sum(rows.map(unfoldRow).map(count)),
  };
});
