import colors from '../../colors';
import { type NumItem, type SymItem } from './calculations';

const Grid = ({ numbers, symbols, rows }: {
  numbers: NumItem[]
  symbols: SymItem[]
  rows: string[]
}): JSX.Element => {
  const width = rows[0].length;
  const height = rows.length;
  return (
    <svg preserveAspectRatio="xMinYMin meet" viewBox={`0 0 ${width * 10} ${height * 10}`}>
      <rect x="0" y="0" fill="#f8f8f8" width={width * 10} height={height * 10} />
      {numbers.map((item, i) => (
        <g key={i}>
          <rect fill="#f8f8f8" x={item.pos.x * 10} y={item.pos.y * 10} width={(item.endX - item.pos.x + 1) * 10} height="10" />
          {item.chars.split('').map((c, ci) => {
            const x = ((item.pos.x + ci) + 0.5) * 10;
            const y = (item.pos.y + 0.5) * 10;
            return <text opacity={item.symbols.length > 0 ? 1 : 0.2} fill="black" textAnchor="middle" fontSize={9} key={ci} x={x} y={y + 3}>{c}</text>;
          })}
        </g>
      ))}
      {symbols.map((sym, i) => (
        <circle key={i} fill={sym.char === '*' ? (sym.gearRatio !== null ? colors.red[600] : colors.red[100]) : colors.slate[200]} cx={(sym.pos.x + 0.5) * 10} cy={(sym.pos.y + 0.5) * 10} r={3} />
      ))}
    </svg>
  );
};

export default Grid;
