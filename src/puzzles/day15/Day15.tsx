import DayPage from '../../components/DayPage';
import { getSolutions } from './calculations';

const Day15 = (): JSX.Element => {
  const { p1, p2 } = getSolutions();
  return (
    <DayPage day={15}>
      <p>
        This one was relatively easy for me and lent itself well to functional composition.
      </p>
      <table className="mb-20">
        <tbody>
          <tr>
            <td><strong>Part 1:</strong> get the hash function working</td>
            <td>{p1}</td>
          </tr>
          <tr>
            <td><strong>Part 2:</strong> do a series of steps to align lenses</td>
            <td>{p2}</td>
          </tr>
        </tbody>
      </table>
    </DayPage>
  );
};

export default Day15;
