import DayPage from '../../components/DayPage';
import { p1, p2 } from './calculations';

const Day6 = (): JSX.Element => {
  return (
    <DayPage day={6}>
      <p>
        This one was so much easier than the prior days! And it should be fun to visualize as well.
      </p>
      <table className="mb-20">
        <tbody>
          <tr>
            <td><strong>Part 1:</strong> a few smaller races, with the score multiplied together</td>
            <td>{p1}</td>
          </tr>
          <tr>
            <td><strong>Part 2:</strong> one big long race</td>
            <td>{p2}</td>
          </tr>
        </tbody>
      </table>
    </DayPage>
  );
};

export default Day6;
