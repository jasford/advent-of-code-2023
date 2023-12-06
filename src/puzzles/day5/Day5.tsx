import DayPage from '../../components/DayPage';
import { lowestSeedLocation2 } from './calculations';

const Day5 = (): JSX.Element => {
  console.log(lowestSeedLocation2);
  return (
    <DayPage day={5}>
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

export default Day5;