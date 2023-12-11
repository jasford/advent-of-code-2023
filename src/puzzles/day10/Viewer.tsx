import { flat } from 'radash';
import { loopFromS } from './calculations';

const sPath = (grid: string[]): string => {
  const loop = loopFromS(grid);
  const path = [
    `M${loop[0].pos.x * 10 + 10},${loop[0].pos.y * 10 + 10}`,
    loop.slice(1).map(({ pos }) => `L${pos.x * 10 + 10},${pos.y * 10 + 10}`),
  ].join(' ');
  return path;
};

const Viewer = ({ grid }: { grid: string[] }): JSX.Element => {
  const height = (grid.length + 1) * 10;
  const width = (grid[0].length + 1) * 10;
  const dots = flat(grid.map(
    (row, y) => row.split('').map((char, x) => ({ char, pos: { x, y } })),
  )).filter(({ char }) => char === 'A' || char === 'B' || char === '.');
  return (
    <svg preserveAspectRatio="xMinYMin meet" viewBox={`0 0 ${width} ${height}`}>
      <path d={sPath(grid)} fill="none" stroke="black" strokeWidth="1" />
      {dots.map(({ char, pos }, i) => (
        <circle
          key={i}
          cx={pos.x * 10 + 10}
          cy={pos.y * 10 + 10}
          r="2"
          fill={`${{ '.': '#eee', A: '#eee', B: 'red' }[char]}`}
        />
      ))}
    </svg>
  );
};

export default Viewer;
