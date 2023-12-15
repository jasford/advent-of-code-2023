import { Cell } from './calculations';

const Grid = ({ grid }: { grid: Cell[][] }): JSX.Element => {
  const width = (grid[0].length + 1) * 10;
  const height = (grid.length + 1) * 10;
  return (
    <svg className="w-full h-full" preserveAspectRatio="xMinYMin meet" viewBox={`0 0 ${width} ${height}`}>
      <rect
        x={0.5}
        y={0.5}
        width={width - 1}
        height={height - 1}
        strokeWidth={1}
        stroke="black"
        fill="none"
      />
      {grid.map((row, y) => row.map((cell, x) => {
        if (cell === Cell.Empty) return null;
        return (
          <circle
            key={`${y}-${x}`}
            cx={(x + 1) * 10}
            cy={(y + 1) * 10}
            r="3"
            fill={cell === Cell.Cube ? '#ddd' : 'black'}
          />
        );
      }))}
    </svg>
  );
};

export default Grid;
