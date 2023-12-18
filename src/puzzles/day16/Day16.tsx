import DayPage from '../../components/DayPage';
import Contraption from './Contraption';
import { getSolutions, followBeam, parseInput } from './calculations';

const Day16 = (): JSX.Element => {
  const { p1, p2 } = getSolutions();
  const grid = parseInput();
  const { beam } = followBeam({ grid, start: { pos: { x: -1, y: 0 }, dir: { x: 1, y: 0 } } });
  return (
    <DayPage day={16}>
      <p>
        This one was fun to visualize. I may come back to this one to add an animation showing the beam as it spreads.
      </p>
      <table className="mb-20">
        <tbody>
          <tr>
            <td><strong>Part 1:</strong> The number of cells energized by the beam shown below.</td>
            <td>{p1}</td>
          </tr>
          <tr>
            <td><strong>Part 2:</strong> The maximum number of cells energized by any possible beam.</td>
            <td>{p2}</td>
          </tr>
        </tbody>
      </table>
      <Contraption grid={grid} beam={beam} />
    </DayPage>
  );
};

export default Day16;
