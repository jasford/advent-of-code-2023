import DayPage from '../../components/DayPage';
import Chart from './Chart';
import { points, cardTotal } from './calculations';

const Day4 = (): JSX.Element => (
  <DayPage day={4}>
    <p>
      Finally a data set that lends itself to some nice graphing!
    </p>
    <table className="mb-20">
      <tbody>
        <tr>
          <td><strong>Part 1</strong> is a simple power of 2 calculation on the win count (the teal line below).</td>
          <td>{points}</td>
        </tr>
        <tr>
          <td><strong>Part 2</strong> makes copies of cards that seem to grow exponentially before collapsing back to zero every so often. It's easier to see the pattern wiht a logorithmic scale.</td>
          <td>{cardTotal}</td>
        </tr>
      </tbody>
    </table>
    <Chart />
  </DayPage>
);

export default Day4;
