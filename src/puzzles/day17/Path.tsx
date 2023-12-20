import { type XY } from './calculations';

const Path = ({ grid, paths }: {
  grid: number[][]
  paths: XY[][]
}): JSX.Element => {
  const width = (grid[0].length + 1) * 10;
  const height = (grid.length + 1) * 10;
  return (
    <svg
      className="w-full h-full"
      preserveAspectRatio="xMinYMin meet"
      viewBox={`0 0 ${width} ${height}`}
    >
      {grid.map((row, y) => row.map((cell, x) => {
        return (
          <rect
            key={`${y}-${x}`}
            x={(x + 1) * 10}
            y={(y + 1) * 10}
            width={10}
            height={10}
            className="fill-teal-600"
            opacity={cell / 30}
          />
        );
      }))}
      {paths.map((path, i) => (
        <path
          key={i}
          d={`M${path.map(
            ({ x, y }) => `${(x + 1) * 10 + 5} ${(y + 1) * 10 + 5}`,
          ).join(' L')}`}
          fill="none"
          strokeWidth={5}
          strokeLinejoin="round"
          className={i === 0 ? 'stroke-teal-600' : 'stroke-red-600'}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
};

export default Path;
