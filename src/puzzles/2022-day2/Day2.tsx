import DayPage from '../../components/DayPage';
import { parse1, parse2, crunchData } from './calculations';
import PieChart from './PieChart';
import Table from './Table';

const Day2 = (): JSX.Element => {
  const data1 = crunchData(parse1());
  const pieData1 = data1.byOutcome.map((outcomeData) => ({
    label: outcomeData.outcome,
    value: outcomeData.count,
  }));
  const data2 = crunchData(parse2());
  const pieData2 = data2.byOutcome.map((outcomeData) => ({
    label: outcomeData.outcome,
    value: outcomeData.count,
  }));

  return (
    <DayPage day={2}>
      <p>
        Ok - let's go with a heat map to visualize the scoring for our Rock,
        Paper, Scissors game. For part 1, the scores look like this:
      </p>
      <Table data={data1} />
      <p className="pt-8">
        So there's our answer for part one. And just for fun, here's a pie
        chart showing the outcomes. It turns out the part one approach results
        in a loss or draw for most of the Rock, Paper, Scissors games.
      </p>
      <div className="px-10 sm:px-30 md:px-30">
        <PieChart data={pieData1} />
      </div>
      <h2>Part 2</h2>
      <p>
        For part 2, we can use the same visualization, but we interpret the
        input data differently. Here's the table and score:
      </p>
      <Table data={data2} />
      <p className="pt-8">
        And thankfully, we are losing the minority of games using this new appraoch
      </p>
      <div className="px-10 sm:px-30 md:px-30">
        <PieChart data={pieData2} />
      </div>

    </DayPage>
  );
};

export default Day2;
