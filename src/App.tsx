import { Route, useLocation } from 'wouter';
import Layout from './components/Layout';
import About from './components/About';
import Day12022 from './puzzles/2022-day1';
import Day22022 from './puzzles/2022-day2';
import Day1 from './puzzles/day1';
import Day2 from './puzzles/day2';
import Day3 from './puzzles/day3';
import Day4 from './puzzles/day4';
import Day5 from './puzzles/day5';
import Day6 from './puzzles/day6';
import Day7 from './puzzles/day7';
import Day8 from './puzzles/day8';
import Day9 from './puzzles/day9';
import Day10 from './puzzles/day10';
import Day11 from './puzzles/day11';
import Day12 from './puzzles/day12';
import Day13 from './puzzles/day13';
import Day14 from './puzzles/day14';
import Day15 from './puzzles/day15';
import Day16 from './puzzles/day16';
import Day17 from './puzzles/day17';
import Day18 from './puzzles/day18';
import Day19 from './puzzles/day19';
import Day20 from './puzzles/day20';
import Day21 from './puzzles/day21';
import Day22 from './puzzles/day22';
import Day23 from './puzzles/day23';
import Day24 from './puzzles/day24';
import Day25 from './puzzles/day25';
import { useEffect } from 'react';

const App = (): JSX.Element => {
  const [pathname] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Layout>
      <Route path="/"><About /></Route>
      <Route path="/day/1/2022"><Day12022 /></Route>
      <Route path="/day/2/2022"><Day22022 /></Route>
      <Route path="/day/1"><Day1 /></Route>
      <Route path="/day/2"><Day2 /></Route>
      <Route path="/day/3"><Day3 /></Route>
      <Route path="/day/4"><Day4 /></Route>
      <Route path="/day/5"><Day5 /></Route>
      <Route path="/day/6"><Day6 /></Route>
      <Route path="/day/7"><Day7 /></Route>
      <Route path="/day/8"><Day8 /></Route>
      <Route path="/day/9"><Day9 /></Route>
      <Route path="/day/10"><Day10 /></Route>
      <Route path="/day/11"><Day11 /></Route>
      <Route path="/day/12"><Day12 /></Route>
      <Route path="/day/13"><Day13 /></Route>
      <Route path="/day/14"><Day14 /></Route>
      <Route path="/day/15"><Day15 /></Route>
      <Route path="/day/16"><Day16 /></Route>
      <Route path="/day/17"><Day17 /></Route>
      <Route path="/day/18"><Day18 /></Route>
      <Route path="/day/19"><Day19 /></Route>
      <Route path="/day/20"><Day20 /></Route>
      <Route path="/day/21"><Day21 /></Route>
      <Route path="/day/22"><Day22 /></Route>
      <Route path="/day/23"><Day23 /></Route>
      <Route path="/day/24"><Day24 /></Route>
      <Route path="/day/25"><Day25 /></Route>
    </Layout>
  );
};

export default App;
