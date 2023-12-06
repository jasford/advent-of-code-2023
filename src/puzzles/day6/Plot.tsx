import { type Race } from './calculations';

const Plot = ({ time, race }: { time: number, race: Race }): JSX.Element => {
  const width = 500;
  const height = 200;
  const p1 = time / race.time;
  const h1 = time * (race.time - time);
  const hMax = 1100000000000000;
  const path = `M0 ${height} L${p1 * width} ${height} L${width} ${height - ((h1 / hMax) * height)}`;
  const distLineY = height - (height * (race.dist / hMax));
  return (
    <svg preserveAspectRatio="xMinYMin meet" viewBox={`-30 0 ${width + 30} ${height + 30}`}>
      <text x={-1 * (height / 2)} y="-8" fill="#777" textAnchor="middle" transform="rotate(-90)">DISTANCE</text>
      <text x={width / 2} y={height + 20} fill="#777" textAnchor="middle">TIME</text>
      <line x1="0" y1={distLineY} x2={width} y2={distLineY} className="stroke-teal-400" strokeDasharray="10 5" />
      <path d={`M0 0 L0 ${height} L${width} ${height}`} fill="none" stroke="#ddd" strokeWidth="1" />
      <path d={path} fill="none" stroke="black" strokeWidth="1" />
    </svg>
  );
};

export default Plot;
