import DayPage from '../../components/DayPage';
import Grid from './Grid';
import { getData } from './calculations';

const Day3 = (): JSX.Element => {
  const { parsedItems, activeItemSum, gearRatioSum, inputRows } = getData();
  return (
    <DayPage day={3}>
      <p>
        This visualization was actually kind of helpful to tell if I was parsing the data correctly. The data below is actaully an SVG image that you can zoom in on to see more detail.
      </p>
      <p>
        For part one, we just need numbers that are one cell away from a symbol. The numbers we ignore for this part are shown grayed out.
      </p>
      <p>
        For part two, we need the sum of "gear ratios" which are the product of two numbers connected to a <code>*</code> symbol with exactly 2 connected numbers. Symbols are all shown as dots on the chart below. The red ones are <code>*</code> symbols, and any that do not have exactly two numbers connected are grayed out. The dark red dots each have a gear ratio, and summing them gets us the answer for part 2.
      </p>
      <table>
        <tbody>
          <tr>
            <td><strong>Part 1:</strong> sum of numbers connected to a symbol</td>
            <td>{activeItemSum}</td>
          </tr>
          <tr>
            <td><strong>Part 2:</strong> sum of gear ratios</td>
            <td>{gearRatioSum}</td>
          </tr>
        </tbody>
      </table>
      <Grid {...parsedItems} rows={inputRows} />
    </DayPage>
  );
};

export default Day3;
