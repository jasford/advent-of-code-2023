import DayPage from '../../components/DayPage';
import { getSolutions } from './calculations';

const Day18 = (): JSX.Element => {
  const { p1, p2 } = getSolutions();
  return (
    <DayPage day={18}>
      <p>
        I learned some new math stuff here: <a href="https://en.wikipedia.org/wiki/Pick%27s_theorem" target="_blank" rel="noreferrer">Pick's Theorem</a> and the <a href="https://en.wikipedia.org/wiki/Shoelace_formula" target="_blank" rel="noreferrer">Shoelace Theorem</a>. Maybe I'll come back and visualize the trench later.
      </p>
      <table className="mb-20">
        <tbody>
          <tr>
            <td><strong>Part 1:</strong> Where the instructions make sense and the numbers are small</td>
            <td>{p1}</td>
          </tr>
          <tr>
            <td><strong>Part 2:</strong> Where we extract giant numbers from the hex values</td>
            <td>{p2}</td>
          </tr>
        </tbody>
      </table>
    </DayPage>
  );
};

export default Day18;
