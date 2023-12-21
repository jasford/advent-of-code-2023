import DayPage from '../../components/DayPage';
import { getSolutions } from './calculations';

const Day20 = (): JSX.Element => {
  const { p1, p2 } = getSolutions();
  return (
    <DayPage day={20}>
      <p>
        This one was super fun and reminded me of robotic control systems work! I might come back to try to build a visualization or at least an interactive display where you can push a button and see what happens.
      </p>
      <p>
        For part two, I manually looked at my input file and reasoned that there were four Conjunction modules that needed to align to send a low pulse to the output, and hard coded their values into an array which I used to run the lcm on their cycle lengths once I had found them. I could go back and make this more robust, but probably won't.
      </p>
      <table className="mb-20">
        <tbody>
          <tr>
            <td><strong>Part 1:</strong> Pulses sent after 1000 button pushes</td>
            <td>{p1}</td>
          </tr>
          <tr>
            <td><strong>Part 2:</strong> Button pushes needed to turn on the sand machine</td>
            <td>{p2}</td>
          </tr>
        </tbody>
      </table>
    </DayPage>
  );
};

export default Day20;
