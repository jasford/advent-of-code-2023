import DayPage from '../../components/DayPage';
import { inputData } from './calculations';

const Day15 = (): JSX.Element => {
  console.log(inputData);
  return (
    <DayPage day={15}>
      <p>
        Let's do this.
      </p>
      <table className="mb-20">
        <tbody>
          <tr>
            <td><strong>Part 1:</strong> where we do something less intense</td>
            <td>1234</td>
          </tr>
          <tr>
            <td><strong>Part 2:</strong> things get a little more serious</td>
            <td>5678</td>
          </tr>
        </tbody>
      </table>
    </DayPage>
  );
};

export default Day15;
