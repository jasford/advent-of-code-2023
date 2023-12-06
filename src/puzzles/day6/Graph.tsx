import { type Race } from './calculations';

const Graph = ({ time, race }: { time: number, race: Race }): JSX.Element => {
  const width = 500;
  const height = 200;
  const hMax = 1100000000000000;
  const points: number[][] = [];
  for (let i = 0; i < width * 2; i++) {
    const t = race.time * i / (width * 2);
    const d = t * (race.time - t);
    points.push([i / 2, height - (height * (d / hMax))]);
  }
  const path = `M${points.map(([a, b]) => `${a} ${b}`).join(' L')}`;
  const distLineY = height - (height * (race.dist / hMax));
  const pointY = height - (((time * (race.time - time)) / hMax) * height);
  return (
    <svg preserveAspectRatio="xMinYMin meet" viewBox={`-30 0 ${width + 40} ${height + 30}`}>
      <text x={-1 * (height / 2)} y="-8" fill="#777" textAnchor="middle" transform="rotate(-90)">FINAL DISTANCE</text>
      <text x={width / 2} y={height + 20} fill="#777" textAnchor="middle">TIME</text>
      <line x1="0" y1={distLineY} x2={width} y2={distLineY} className="stroke-teal-400" strokeDasharray="10 5" />
      <path d={`M0 0 L0 ${height} L${width} ${height}`} fill="none" stroke="#ddd" strokeWidth="1" />
      <path d={path} fill="none" stroke="black" strokeWidth="1" />
      <circle cx={(time / race.time) * width} cy={pointY} className={`${pointY <= distLineY ? 'fill-teal-500' : 'fill-red-500'}`} r="7" />
    </svg>
  );
};

export default Graph;
