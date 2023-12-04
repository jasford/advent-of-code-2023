import { useLocation } from 'wouter';
import { puzzleList } from '../puzzles';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';

const DayPage = ({ day, children }: React.PropsWithChildren<{ day: number }>): JSX.Element => {
  const [, setLocation] = useLocation();
  const prevDay = (day > 1)
    ? (): void => { setLocation(`/day/${day - 1}`) }
    : null;
  const nextDay = (day < puzzleList.length)
    ? (): void => { setLocation(`/day/${day + 1}`) }
    : null;

  return (
    <div className="lg:mt-28 mb-20">
      <div className="flex items-center justify-between">
        {prevDay !== null && (
          <button
              type="button"
              onClick={prevDay}
              aria-label="Previous Day"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700" />
          </button>
        )}
        <div className="flex items-center text-base text-zinc-400">
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 hidden lg:block" />
          <span className="lg:ml-3">December {day}, 2023</span>
        </div>
        {nextDay == null
          ? <div className="w-10" />
          : (
          <button
              type="button"
              onClick={nextDay}
              aria-label="Next Day"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition lg:absolute lg:-right-5 lg:-mt-2 lg:mb-0"
            >
              <ArrowRightIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700" />
          </button>
            )}
      </div>
      <h1 className="text-3xl mb-6 md:text-4xl lg:text-5xl pt-6 pb-2 font-extrabold">
        {puzzleList[day - 1]?.headline ?? `Day ${day}`}
      </h1>
      <div className="prose prose-slate lg:prose-lg">
        {children}
      </div>
    </div>
  );
};

export default DayPage;
