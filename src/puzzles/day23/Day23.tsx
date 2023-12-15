import DayPage from '../../components/DayPage';
import { getSolutions } from './calculations';

const Day23 = (): JSX.Element => {
  const { p1, p2 } = getSolutions();
  return (
    <DayPage day={23}>
      <p>
        Let's do this.
      </p>
      <table className="mb-20">
        <tbody>
          <tr>
            <td><strong>Part 1:</strong></td>
            <td>{p1}</td>
          </tr>
          <tr>
            <td><strong>Part 2:</strong></td>
            <td>{p2}</td>
          </tr>
        </tbody>
      </table>
    </DayPage>
  );
};

export default Day23;
