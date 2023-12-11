import DayPage from '../../components/DayPage';
import Viewer from './Viewer';
import { getSolutions } from './calculations';

const Day10 = (): JSX.Element => {
  const { p1, p2, history } = getSolutions();
  return (
    <DayPage day={10}>
      <p>
        There is a giant loop of pipe hidden in the input data. My image output is of part 2, where we needed to show which empty space was inside the loop vs. outside. The gray dots are outside and the red ones are in.
      </p>
      <table className="mb-20">
        <tbody>
          <tr>
            <td><strong>Part 1:</strong> Find the length of the loop and return the mid point</td>
            <td>{p1}</td>
          </tr>
          <tr>
            <td><strong>Part 2:</strong> Count the red dots in the image below</td>
            <td>{p2}</td>
          </tr>
        </tbody>
      </table>
      <Viewer grid={history[history.length - 1]} />
    </DayPage>
  );
};

export default Day10;
