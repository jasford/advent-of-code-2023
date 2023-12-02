import ReactMarkdown from 'react-markdown';
import markdown from '../about.md';
import { puzzleList } from '../puzzles';
import { Link } from 'wouter';

const About = (): JSX.Element => {
  return (
    <div className="mb-8">
      <h1 className="text-5xl md:pt-12 pb-2 font-extrabold">Advent of Code</h1>
      <p className="text-2xl text-gray-500 pb-8">2023 Solutions & Visualizations</p>
      <div className="prose mb-16 md:mb-20 prose-slate md:prose-lg lg:prose-xl">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
      <div>
        <div className="flex max-w-3xl flex-col space-y-16">
          {puzzleList.map(({ headline, summary }, i) => (
            <article key={i} className="md:grid md:grid-cols-4 md:items-baseline">
              <div className="md:col-span-3 group relative flex flex-col items-start">
                <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                  <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
                  <Link href={`/day/${i + 1}`}>
                    <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
                    <span className="relative z-10">{headline}</span>
                  </Link>
                </h2>
                <div className="md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5">
                  <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                    <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                  </span>
                  December {i + 1}, 2023
                </div>
                <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">{summary}</p>
                <div aria-hidden="true" className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
                  View solution
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="ml-1 h-4 w-4 stroke-current">
                    <path d="M6.75 5.75 9.25 8l-2.5 2.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="mt-1 hidden md:block relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500">December {i + 1}, 2023</div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
