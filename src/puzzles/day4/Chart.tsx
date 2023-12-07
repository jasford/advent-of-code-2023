import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import colors from '../../colors';
import { getData } from './calculations';
import Toggle from '../../components/Toggle';

const Chart = (): JSX.Element => {
  const svgRef = useRef(null);
  const { winCounts, cardCopies } = getData();

  const [logScale, setLogScale] = useState(true);

  const data = d3.zip(winCounts, cardCopies);

  useEffect(() => {
    if (data.length === 0) return;

    const width = 500;
    const height = 220;

    const svg = d3.select(svgRef.current)
      .append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g');

    const plotCardCopies = (): void => {
      const x = d3.scaleBand()
        .range([30, width])
        .domain(data.map((_, i) => `${i}`))
        .padding(0.25);

      const y = logScale ? d3.scaleSymlog() : d3.scaleLinear();
      const max = d3.max(data.map(d => d[1])) ?? 0;
      y.domain([0, max]);
      y.range([height, 30]);

      svg.append('g')
        .selectAll()
        .data(data)
        .join('rect')
        .attr('fill', colors.slate[300])
        .attr('x', (_d, i) => x(`${i}`) ?? 0)
        .attr('y', d => y(d[1]))
        .attr('height', (d) => y(0) - y(d[1]))
        .attr('width', x.bandwidth());
    };
    plotCardCopies();

    const plotWinCounts = (): void => {
      const x = d3.scaleBand()
        .range([30, width])
        .domain(data.map((_, i) => `${i}`))
        .padding(0.25);

      const max = d3.max(data.map(d => d[0])) ?? 0;
      const y = d3.scaleLinear()
        .domain([0, max + 1])
        .range([22, 1]);

      const line = d3.line().x((_d, i) => x(`${i}`) ?? 0).y(d => y(d[0]));

      svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', colors.teal[400])
        .attr('stroke-width', 1.5)
        .attr('d', line as any);
    };
    plotWinCounts();

    svg.append('text')
      .attr('x', -25)
      .attr('y', 7)
      .attr('transform', 'rotate(-90)')
      .attr('font-size', '9px')
      .attr('font-weight', 'bold')
      .attr('fill', '#555')
      .text('WINS');

    svg.append('text')
      .attr('x', -160)
      .attr('y', 7)
      .attr('transform', 'rotate(-90)')
      .attr('font-size', '9px')
      .attr('font-weight', 'bold')
      .attr('fill', '#555')
      .text('CARD COPIES');

    return () => {
      d3.select(svgRef.current).selectAll('*').remove();
    };
  }, [data]);

  return (
    <div>
      <div className="mb-4" ref={svgRef}></div>
      <div className="float-right">
        <Toggle label="logarithmic scale" enabled={logScale} setEnabled={setLogScale} />
      </div>
    </div>
  );
};

export default Chart;
