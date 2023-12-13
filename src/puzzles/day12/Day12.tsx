import DayPage from '../../components/DayPage';
import { getSolutions } from './calculations';

const Day12 = (): JSX.Element => {
  const { p1, p2 } = getSolutions();
  return (
    <DayPage day={12}>
      <p>
        I really struggled with this one. Got a working algorithm for part 1,
        but it was WAY to slow for part 2. Re-wrote it to be more performance
        (I thought) but it turned out to be even slower!
      </p>
      <p>
        This was the first day this year that I had to look
        at <a href="https://cutonbuminband.github.io/AOC/qmd/2023.html#day-12-hot-springs" target="_blank" rel="noreferrer">someone else's solution</a> to
        see how to get this to perform better. I at least re-wrote it in
        TypeScript and added comments until I understood it.
      </p>
      <table className="mb-20">
        <tbody>
          <tr>
            <td><strong>Part 1:</strong> this part was easier for me</td>
            <td>{p1}</td>
          </tr>
          <tr>
            <td><strong>Part 2:</strong> with "unfolded" inputs, requiring a more efficient algorithm</td>
            <td>{p2}</td>
          </tr>
        </tbody>
      </table>
    </DayPage>
  );
};

export default Day12;
