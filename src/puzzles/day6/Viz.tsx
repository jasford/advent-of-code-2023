import { useState } from 'react';
import { type Race } from '../day6/calculations';
import Plot from './Plot';
import Graph from './Graph';

const Viz = ({ race }: { race: Race }): JSX.Element => {
  const [slider, setSlider] = useState(0);
  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSlider(e.target.valueAsNumber);
  };
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <Plot race={race} time={slider} />
        <Graph race={race} time={slider} />
      </div>
      <input
        id="default-range"
        type="range"
        onChange={handleSlider}
        value={slider}
        min={0}
        max={race.time}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500 dark:bg-gray-700"
      />
      <div className="flex">
        <div className="text-sm pt-1 grow">
          Seconds Held: <strong>{slider}</strong>
        </div>
        <div className="text-sm pt-1 text-right">
          Distance: <strong>{slider * (race.time - slider)}</strong>
        </div>
      </div>
    </div>
  );
};

export default Viz;
