import { ViewfinderCircleIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import DayPage from '../../components/DayPage';
import { getSolutions, parseInput, rotate90, tiltNorth } from './calculations';
import Grid from './Grid';
import { chain } from 'radash';

const inputGrid = parseInput();

const ArrowButton = ({ classNames = '', Icon, onClick }: {
  classNames?: string
  Icon: typeof ChevronRightIcon
  onClick: () => void
}): JSX.Element => (
  <button
    type="button"
    onClick={onClick}
    className={`relative inline-flex items-center bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 ${classNames}`}
  >
    <span className="sr-only">Previous</span>
    <Icon className="h-5 w-5" aria-hidden="true" />
  </button>
);

const Day14 = (): JSX.Element => {
  const { p1, p2 } = getSolutions();

  const [grid, setGrid] = useState(inputGrid);
  const handleReset = (): void => {
    setGrid(inputGrid);
  };

  const tiltUp = (): void => chain(tiltNorth, setGrid)(grid);

  const tiltLeft = (): void => chain(
    rotate90, tiltNorth, rotate90, rotate90, rotate90, setGrid,
  )(grid);

  const tiltRight = (): void => chain(
    rotate90, rotate90, rotate90, tiltNorth, rotate90, setGrid,
  )(grid);

  const tiltDown = (): void => chain(
    rotate90, rotate90, tiltNorth, rotate90, rotate90, setGrid,
  )(grid);

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'w') tiltUp();
    else if (e.key === 'a') tiltLeft();
    else if (e.key === 's') tiltDown();
    else if (e.key === 'd') tiltRight();
  };

  return (
    <DayPage day={14}>
      <p>
        For this one we are tilting a panel with rocks are fixed (light gray) and ones that can roll (black). The controller below lets you play with tilting the rocks in any direction. Once selected you can also use the keyboard (WASD keys).
      </p>
      <table className="mb-10">
        <tbody>
          <tr>
            <td><strong>Part 1:</strong> just tilt north</td>
            <td>{p1}</td>
          </tr>
          <tr>
            <td><strong>Part 2:</strong> tilt in a circle for a stupid amount of times</td>
            <td>{p2}</td>
          </tr>
        </tbody>
      </table>
      <div onKeyDown={handleKeyDown} className="outline-none" tabIndex={0}>
        <div className="mb-5">
          <div className="flex h-10 ml-9">
            <ArrowButton onClick={tiltUp} Icon={ChevronUpIcon} classNames="rounded-t-md -ml-px -mb-px" />
          </div>
          <div className="isolate inline-flex">
            <ArrowButton onClick={tiltLeft} Icon={ChevronLeftIcon} classNames="rounded-l-md" />
            <ArrowButton onClick={handleReset} Icon={ViewfinderCircleIcon} classNames="-ml-px" />
            <ArrowButton onClick={tiltRight} Icon={ChevronRightIcon} classNames="rounded-r-md -ml-px" />
          </div>
          <div className="flex h-10 ml-9">
            <ArrowButton onClick={tiltDown} Icon={ChevronDownIcon} classNames="rounded-b-md -ml-px -mt-px" />
          </div>
        </div>
        <Grid grid={grid} />
      </div>
    </DayPage>
  );
};

export default Day14;
