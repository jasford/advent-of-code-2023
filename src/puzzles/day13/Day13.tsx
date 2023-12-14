import DayPage from '../../components/DayPage';
import { getSolutions } from './calculations';

const Day13 = (): JSX.Element => {
  const { p1, p2 } = getSolutions();
  return (
    <DayPage day={13}>
      <p>
        Didn't have time to create a visualization for this one.
      </p>
      <table className="mb-20">
        <tbody>
          <tr>
            <td><strong>Part 1:</strong> reflections</td>
            <td>{p1}</td>
          </tr>
          <tr>
            <td><strong>Part 2:</strong> reflections with smudges corrected</td>
            <td>{p2}</td>
          </tr>
        </tbody>
      </table>
    </DayPage>
  );
};

export default Day13;
