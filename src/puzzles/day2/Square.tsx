import { type Game } from './calculations';
import colors from '../../colors';

type RGB = 'red' | 'green' | 'blue';
const rgbs: RGB[] = ['red', 'green', 'blue'];

const Square = ({ game, i }: { game: Game, i: number }): JSX.Element => {
  const rgb = {
    red: (game.mins.red / 20) * 48,
    green: (game.mins.green / 20) * 48,
    blue: (game.mins.blue / 20) * 48,
  };
  const outlineColor = game.possible ? colors.slate[600] : colors.slate[300];
  return (
    <svg preserveAspectRatio="xMinYMin meet" viewBox="0 0 120 120">
      <rect x="2" y="2" width="116" height="116" stroke={outlineColor} strokeWidth="4" fill="none" />
      {rgbs.map((key, i) => (
        <g key={i}>
          <rect x={10 + i * 35} y="10" width="30" height="50" stroke={colors[key][600]} strokeWidth="2" fill="none" />
          <rect x={11 + i * 35} y={11 + (48 - rgb[key])} width="28" height={rgb[key]} fill={colors[key][100]} stroke="none" />
          <rect x={9 + i * 35} y="60" width="32" height="21" fill={colors[key][600]} stroke="none" />
          <text x={25 + i * 35} y="75" fontFamily="'Courier', monospace" fill="white" textAnchor="middle">{game.mins[key]}</text>
        </g>
      ))}
      <text x={60} y="103" fontFamily="'Courier', monospace" fontWeight="bold" textAnchor="middle">Pow {game.cubePower}</text>
      <rect x="2" y="2" width="18" height="18" fill={outlineColor} />
      <text x="11" y="14" fontSize="10" fontWeight="bold" fontFamily="'Courier', monospace" fill="white" textAnchor="middle">{i}</text>
    </svg>
  );
};

export default Square;
