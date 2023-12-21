import DayPage from '../../components/DayPage';
import { getSolutions } from './calculations';

const Day19 = (): JSX.Element => {
  const { p1, p2 } = getSolutions();
  return (
    <DayPage day={19}>
      <p>
        We have a chain of workflows to determine whether a part is acceptable or not. This required a bit of code, but was more of a breeze for me to write, as it required less thinking about optimizing for performance. Not sure how to visualize this one.
      </p>
      <table className="mb-20">
        <tbody>
          <tr>
            <td><strong>Part 1:</strong> sum of accepted parts from list</td>
            <td>{p1}</td>
          </tr>
          <tr>
            <td><strong>Part 2:</strong> count of distinct acceptable parts that are possible</td>
            <td>{p2}</td>
          </tr>
        </tbody>
      </table>
    </DayPage>
  );
};

export default Day19;
