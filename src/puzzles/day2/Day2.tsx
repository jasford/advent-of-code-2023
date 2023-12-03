import DayPage from '../../components/DayPage';
import { solution1, solution2, gameData } from './calculations';
import Square from './Square';

const Day2 = (): JSX.Element => {
  return (
    <DayPage day={2}>
      <p>
        Struggled to find a good way to visualize this one. Ended up creating these little retro-looking color cards to show each of the games. The RGB values show the values used in the power calculation for part 2, while the "impossible" indexes excluded from part 1 are grayed out.
      </p>
      <table>
        <tbody>
          <tr>
            <td><strong>Part 1:</strong> sum of possible indexes</td>
            <td>{solution1}</td>
          </tr>
          <tr>
            <td><strong>Part 2:</strong> sum of powers</td>
            <td>{solution2}</td>
          </tr>
        </tbody>
      </table>
      <div className="grid grid-cols-5 gap-2">
        {gameData.map((game, i) => (
          <div key={i} className="relative">
            <Square i={i} game={game} />
          </div>
        ))}
      </div>
    </DayPage>
  );
};

export default Day2;
