import { Cell, type Beam, posEq } from './calculations';

const Contraption = ({ grid, beam }: {
  grid: Cell[][]
  beam: Beam[]
}): JSX.Element => {
  const width = (grid[0].length + 1) * 10;
  const height = (grid.length + 1) * 10;
  return (
    <svg className="w-full h-full" preserveAspectRatio="xMinYMin meet" viewBox={`0 0 ${width} ${height}`}>
      {grid.map((row, y) => row.map((_, x) => {
        const energized = beam.find(
          ({ pos }) => posEq(pos)({ x, y }),
        ) !== undefined;
        if (!energized) return null;
        return (
          <rect
            key={`${y}-${x}`}
            x={(x + 1) * 10 - 5}
            y={(y + 1) * 10 - 5}
            width={10}
            height={10}
            strokeWidth={0}
            fill="red"
            opacity={0.1}
          />
        );
      }))}
      {beam.map(({ pos, dir }, i) => {
        // if (Math.abs(b.x - a.x) + Math.abs(b.y - a.y) > 1) console.log(a, b);
        return (
          <line
            key={i}
            x1={(pos.x + 1) * 10}
            x2={(pos.x + dir.x + 1) * 10}
            y1={(pos.y + 1) * 10}
            y2={(pos.y + dir.y + 1) * 10}
            strokeLinecap='round'
            stroke="red"
            strokeWidth="1"
          />
        );
      })}
      {grid.map((row, y) => row.map((cell, x) => {
        if (cell === Cell.Empty) return null;
        const coords = {
          [Cell.MirrorR]: [{ x: 1, y: 1 }, { x: -1, y: -1 }],
          [Cell.MirrorL]: [{ x: 1, y: -1 }, { x: -1, y: 1 }],
          [Cell.SplitterH]: [{ x: -1, y: 0 }, { x: 1, y: 0 }],
          [Cell.SplitterV]: [{ x: 0, y: -1 }, { x: 0, y: 1 }],
        }[cell];
        const amp = (cell === Cell.MirrorR || cell === Cell.MirrorL)
          ? 1.6
          : 2;
        return (
          <line
            key={`${y}-${x}`}
            x1={(x + 1) * 10 + coords[0].x * amp}
            x2={(x + 1) * 10 + coords[1].x * amp}
            y1={(y + 1) * 10 + coords[0].y * amp}
            y2={(y + 1) * 10 + coords[1].y * amp}
            strokeLinecap='round'
            stroke="black"
            strokeWidth="1"
          />
        );
      }))}
      <rect
        x={0.5}
        y={0.5}
        width={width - 1}
        height={height - 1}
        strokeWidth={1}
        stroke="black"
        fill="none"
      />
    </svg>
  );
};

export default Contraption;
