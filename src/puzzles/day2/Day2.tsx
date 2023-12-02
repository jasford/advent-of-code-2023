import DayPage from '../../components/DayPage';
import { solution1, solution2 } from './calculations';

const Day2 = (): JSX.Element => {
  return (
    <DayPage day={2}>
      <p>
        Not quite sure what to do for the visualization here. Going to think on it a bit more. I managed to get the right solutions though:
      </p>
      <ul>
        <li>Part 1: <strong>{solution1()}</strong></li>
        <li>Part 2: <strong>{solution2()}</strong></li>
      </ul>
    </DayPage>
  );
};

export default Day2;
