import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import colors from '../../colors';

interface DataEntry {
  label: string
  value: number
}

const PieChart = ({ data }: { data: DataEntry[] }): JSX.Element => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 450;
    const height = 450;
    const margin = 0;

    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select(svgRef.current).append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const pie = d3.pie<DataEntry>().value(d => d.value);
    const pieData = pie(data);

    svg
      .selectAll('path')
      .data(pieData)
      .enter()
      .append('path')
      .attr('d', d3.arc<d3.PieArcDatum<DataEntry>>()
        .innerRadius(radius / 2)
        .outerRadius(radius),
      )
      .attr('fill', (_d, i) => [colors.orange[400], colors.teal[400], colors.sky[400]][i])
      .attr('stroke', 'white')
      .style('stroke-width', '5px')
      .style('opacity', 0.7);

    const midAngle = (d: d3.PieArcDatum<DataEntry>): number => {
      return d.startAngle + (d.endAngle - d.startAngle) / 2 - Math.PI / 2;
    };

    const texts = svg.selectAll('text').data(pieData)
      .enter()
      .append('text')
      .attr('x', d => Math.cos(midAngle(d)) * (radius * 0.75))
      .attr('y', d => Math.sin(midAngle(d)) * (radius * 0.75));

    texts
      .append('tspan')
      .attr('text-anchor', 'middle')
      .attr('font-size', '1em')
      .attr('fill', 'white')
      .attr('x', d => Math.cos(midAngle(d)) * (radius * 0.75))
      .attr('dy', -5)
      .text(d => d.data.label);

    texts
      .append('tspan')
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '1.2em')
      .attr('font-weight', 'bold')
      .attr('x', d => Math.cos(midAngle(d)) * (radius * 0.75))
      .attr('dy', 20)
      .text(d => d.data.value);

    return () => {
      d3.select(svgRef.current).selectAll('*').remove();
    };
  }, [data]);

  return (
    <div>
      <div className="mb-2" ref={svgRef}></div>
    </div>
  );
};

export default PieChart;
