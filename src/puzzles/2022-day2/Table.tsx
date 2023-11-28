import { Fragment } from 'react';
import { type CrunchedData } from './calculations';
import colors from '../../colors';

const percent = (val: number): string => {
  return `${Math.floor(val * 100)}%`;
};

const Table = ({ data }: { data: CrunchedData }): JSX.Element => {
  return (
    <div className="grid grid-cols-4 gap-1 sm:gap-4">
      <div />
      {['Rock', 'Paper', 'Scissors'].map((label, i) => (
        <div key={label} className="uppercase text-sm text-center">
          <strong className="font-bold ">{label}</strong> (+{i + 1})
        </div>
      ))}
      {data.byOutcome.map((outcomeData) => {
        return (
          <Fragment key={outcomeData.outcome}>
            <div className="flex flex-col justify-center items-center">
              <div className="uppercase text-sm">
                <strong className="font-bold">{outcomeData.outcome}</strong> (+{outcomeData.multiplier})
              </div>
              <div className="text-4xl font-light">{percent(outcomeData.count / data.count)}</div>
            </div>
            {outcomeData.byPlay.map((playData) => (
              <div
                key={playData.play}
                className="md:h-40 h-28 flex flex-col justify-center items-center"
                style={{
                  background: colors.slate[(Math.floor((playData.count ?? 0) / 150) * 100) + 100],
                }}
              >
                <div className="text-xs"><strong className="font-bold inline">{playData.count}</strong> &times; {playData.multiplier} =</div>
                <div className="text-2xl">{playData.score}</div>
              </div>
            ))}
          </Fragment>
        );
      })}
      <div />
      <div className="col-span-3 h-20 bg-slate-600 text-2xl sm:text-3xl text-white flex justify-center items-center">
        Total Score:
        <strong className="text-white ml-3">{data.score}</strong>
      </div>
    </div>
  );
};

export default Table;
