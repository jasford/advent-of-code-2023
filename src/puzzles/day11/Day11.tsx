import DayPage from '../../components/DayPage';
import { getSolutions } from './calculations';

const Day11 = (): JSX.Element => {
  const { p1, p2 } = getSolutions();
  return (
    <DayPage day={11}>
      <p>
        This one uses <a target="_blank" href="https://en.wikipedia.org/wiki/Taxicab_geometry" rel="noreferrer">taxi distances</a> to sum up the distance between each unique pair of stars in the input data. No visualization for today.
      </p>
      <table className="mb-20">
        <tbody>
          <tr>
            <td><strong>Part 1:</strong> Sum of star distances with expansion of 1</td>
            <td>{p1}</td>
          </tr>
          <tr>
            <td><strong>Part 2:</strong> Sum of star distances with expansion of 1M</td>
            <td>{p2}</td>
          </tr>
        </tbody>
      </table>
    </DayPage>
  );
};

export default Day11;
