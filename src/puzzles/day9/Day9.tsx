import DayPage from '../../components/DayPage';
import { getSolutions } from './calculations';

const Day9 = (): JSX.Element => {
  const { p1, p2 } = getSolutions();
  return (
    <DayPage day={9}>
      <p>
        Let's do this.
      </p>
      <table className="mb-20">
        <tbody>
          <tr>
            <td><strong>Part 1:</strong> where we do something less intense</td>
            <td>{p1}</td>
          </tr>
          <tr>
            <td><strong>Part 2:</strong> things get a little more serious</td>
            <td>{p2}</td>
          </tr>
        </tbody>
      </table>
    </DayPage>
  );
};

export default Day9;
