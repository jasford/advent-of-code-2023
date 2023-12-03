import React from 'react';
import { getNum } from './calculations';

const lineHighlighter = ({ advanced, firstIndex, lastIndex }: {
  advanced: boolean
  firstIndex: number
  lastIndex: number
}) => {
  // eslint-disable-next-line react/display-name
  return (line: string): JSX.Element => {
    if (line.length === 0) return <> </>;
    const spans: Array<{ key: string, el: JSX.Element }> = [];
    let cursor = 0;
    while (cursor < line.length) {
      const num = getNum(line.slice(cursor), advanced);
      if (num === null) {
        spans.push({ key: `${cursor}`, el: <span className="text-gray-300">{line[cursor]}</span> });
      } else {
        const color = cursor === firstIndex
          ? 'text-teal-600 font-bold'
          : cursor === lastIndex
            ? 'text-pink-600 font-bold'
            : 'text-yellow-400';
        const el = (num === null)
          ? <span className="text-gray-300">{line[cursor]}</span>
          : <span className={color}>{num[1]}</span>;
        spans.push({ key: `${cursor}`, el });
      }
      cursor += (num === null) ? 1 : num[1].length;
    }
    return (
      <>
        {spans.map(({ el, key }) => (
          <React.Fragment key={key}>{el}</React.Fragment>
        ))}
      </>
    );
  };
};

export default lineHighlighter;
