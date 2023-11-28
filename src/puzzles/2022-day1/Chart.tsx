import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import colors from '../../colors';
import Toggle from '../../components/Toggle';

const Chart = ({ data, highlight }: {
  data: number[][]
  highlight: number
}): JSX.Element => {
  const svgRef = useRef(null);

  const [sorted, setSorted] = useState(false);

  const processed = data.map((items, i) => [i, d3.sum(items)]);
  const sortedData = processed.slice(0).sort((a, b) => d3.descending(a[1], b[1]));
  const highlighted = sortedData.slice(0, highlight).map(([i]) => i);
  const max = sortedData[0][1];

  useEffect(() => {
    if (data.length === 0) return;

    const width = 500;
    const height = 200;

    const svg = d3.select(svgRef.current)
      .append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g');

    const x = d3.scaleBand()
      .range([0, width])
      .domain(processed.map((_d, i) => `${i}`))
      .padding(0.25);

    const y = d3.scaleLinear()
      .domain([0, max])
      .range([height, 0]);

    svg.append('g')
      .selectAll()
      .data(sorted ? sortedData : processed)
      .join('rect')
      .attr('fill', ([i]) => highlighted.includes(i) ? colors.orange[400] : colors.slate[200])
      .attr('x', (_d, i) => x(`${i}`) ?? 0)
      .attr('y', d => y(d[1]))
      .attr('height', (d) => y(0) - y(d[1]))
      .attr('width', x.bandwidth());

    return () => {
      d3.select(svgRef.current).selectAll('*').remove();
    };
  }, [data, sorted]);

  const label = highlight === 1
    ? 'Max calories held by an elf'
    : `Total calories held by top ${highlight} elves`;

  const value = d3.sum(sortedData.slice(0, highlight).map(([_i, v]) => v));

  return (
    <div>
      <div className="mb-2" ref={svgRef}></div>
      <div className="flex">
        <div className="flex-1 text-sm">{label}: <strong>{value}</strong></div>
        <Toggle label="Sort Elves" enabled={sorted} setEnabled={setSorted} />
      </div>
    </div>
  );
};

export default Chart;
