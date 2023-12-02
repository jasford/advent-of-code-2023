import { Route } from 'wouter';
import Layout from './components/Layout';
import About from './components/About';
import Day12022 from './puzzles/2022-day1';
import Day22022 from './puzzles/2022-day2';
import Day1 from './puzzles/day1';
import Day2 from './puzzles/day2';

const App = (): JSX.Element => (
  <Layout>
    <Route path="/"><About /></Route>
    <Route path="/day/1/2022"><Day12022 /></Route>
    <Route path="/day/2/2022"><Day22022 /></Route>
    <Route path="/day/1"><Day1 /></Route>
    <Route path="/day/2"><Day2 /></Route>
  </Layout>
);

export default App;
