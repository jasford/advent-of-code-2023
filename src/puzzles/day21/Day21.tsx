import DayPage from '../../components/DayPage';
import { getSolutions } from './calculations';

const Day21 = (): JSX.Element => {
  const { p1, p2 } = getSolutions();
  return (
    <DayPage day={21}>
      <p>
        Well I did not like this one at all. Part 1 was super easy and part 2 was WAY beyond me. I understand the code I wrote, and the idea of using Lagrange to calculate a quadratic, but I would NEVER have come up with this approach on my own. Had to resort to Redit to get the idea.
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

export default Day21;
