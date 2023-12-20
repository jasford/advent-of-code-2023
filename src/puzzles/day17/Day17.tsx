import DayPage from '../../components/DayPage';
import Path from './Path';
import { getSolutions } from './calculations';

const Day17 = (): JSX.Element => {
  const { p1, p2, grid } = getSolutions();
  return (
    <DayPage day={17}>
      <p>
        It's a pathfinding algorithm! I knew I needed to use Djikstra's algorithm, but didn't really want to code it myself so I used an npm library. The trick was building the nodes and edges for the input graph, accounting for the special rules.
      </p>
      <table className="mb-10">
        <tbody>
          <tr>
            <td>
              <strong>Part 1:</strong> Each move must be 1–3 nodes
              (<strong className="text-teal-600">&mdash;</strong>)
            </td>
            <td>{p1.cost}</td>
          </tr>
          <tr>
            <td>
              <strong>Part 2:</strong> Each move must be 4–10 nodes
              (<strong className="text-red-600">&mdash;</strong>)
            </td>
            <td>{p2.cost}</td>
          </tr>
        </tbody>
      </table>
      <Path grid={grid} paths={[p1.path, p2.path]} />
    </DayPage>
  );
};

export default Day17;
