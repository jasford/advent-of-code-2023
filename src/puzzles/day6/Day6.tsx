import DayPage from '../../components/DayPage';
import { getSolutions } from './calculations';
import Viz from './Viz';

const Day6 = (): JSX.Element => {
  const { p1, p2, p2Data } = getSolutions();
  return (
    <DayPage day={6}>
      <p>
        This one was so much easier than the prior days! And it was super fun to visualize as well. The interactive plots below show part 2 of my input data.
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
      <Viz race={p2Data} />
    </DayPage>
  );
};

export default Day6;
