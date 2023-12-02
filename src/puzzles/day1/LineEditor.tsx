import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import Toggle from '../../components/Toggle';
import CalibrationCode from './CalibrationCode';
import { getNum, getFirstNum, answers } from './calculations';

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

const LineEditor = (): JSX.Element => {
  const [line, setLine] = useState('sixrc8tqxd4pkxpfdtwokglvthreenine47rthreezs');
  const [advanced, setAdvanced] = useState(false);
  const firstNum = getFirstNum(advanced)(line);
  const lastNum = getFirstNum(advanced)(line, true);
  return (
    <div>
      <div className="flex">
        <div className="flex-1 mr-4">
          <Editor
            value={line}
            onValueChange={setLine}
            highlight={lineHighlighter({
              firstIndex: firstNum[1] ?? 0,
              lastIndex: lastNum[1] ?? 0,
              advanced,
            })}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              border: '1px solid #aaa',
            }}
          />
        </div>
        <CalibrationCode code={`${firstNum[0]}${lastNum[0]}`} />
      </div>
      <div className="flex">
        <div className="mt-4">
          <Toggle label="Advanced parsing" enabled={advanced} setEnabled={setAdvanced} />
        </div>
        <div className="grow text-sm pt-4 text-right">
          Total from input lines: <strong>{answers[advanced ? 0 : 1]}</strong>
        </div>
      </div>
    </div>
  );
};

export default LineEditor;
