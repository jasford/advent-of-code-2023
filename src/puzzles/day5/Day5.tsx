import DayPage from '../../components/DayPage';
import { p1, p2 } from './calculations';

const Day5 = (): JSX.Element => {
  return (
    <DayPage day={5}>
      <p>
        I just barely got this one done. Will maybe go back and add a visualization. I have some ideas, but ran out of time to do anything with them.
      </p>
      <table className="mb-20">
        <tbody>
          <tr>
            <td><strong>Part 1:</strong> This part was fairly easy</td>
            <td>{p1}</td>
          </tr>
          <tr>
            <td><strong>Part 2:</strong> OMG this part was hard, especially for day 5!</td>
            <td>{p2}</td>
          </tr>
        </tbody>
      </table>
    </DayPage>
  );
};

export default Day5;
