import DayPage from '../../components/DayPage';
import { parse } from './calculations';
import Chart from './Chart';

const Day1 = (): JSX.Element => {
  const data = parse();
  return (
    <DayPage day={1}>
      <p>
        Ok. We're adding up the calorie count of all the items being held by
        each elf. Let's parse my input and graph the calories held by each elf,
        highlighting the one with the most calories:
      </p>
      <Chart data={data} highlight={1} />
      <p>Sweet. That got us the part 1 answer.</p>
      <h2>Part 2</h2>
      <p>For part two, we need to sum the top three elves:</p>
      <Chart data={data} highlight={3} />
      <p>And there is our answer for part 2! Pretty straightforward start to this year.</p>
    </DayPage>
  );
};

export default Day1;
