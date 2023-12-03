import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import Toggle from '../../components/Toggle';
import { getFirstNum, answers } from './calculations';
import lineHighlighter from './lineHighlighter';

const LineEditor = ({ advanced, setAdvanced }: {
  advanced: boolean
  setAdvanced: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => {
  const [line, setLine] = useState('sixrc8tqxd4pkxpfdtwokglvthreenine47rthreezs');
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
        <div className="grid grid-cols-2 divide-x outline outline-1 outline-slate-600 my-px w-12 text-xs font-bold flex ">
          {[firstNum, lastNum].map(([i]) => (
            <div key={i} className={`flex items-center justify-center ${i === 0 ? 'text-teal-600' : 'text-pink-600'}`}>
              {i ?? ''}
            </div>
          ))}
        </div>
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
