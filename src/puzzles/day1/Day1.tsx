import DayPage from '../../components/DayPage';
import LineEditor from './LineEditor';

const Day1 = (): JSX.Element => {
  return (
    <DayPage day={1}>
      <p>
        We've got some scrambled input, and need to extract the first and last
        digit in a string as the calibration code. Here's a simple line editor
        with syntax highlighting to show numbers.
      </p>
      <p>
        For part one, we just care about actual numerical digits, but for part
        two, we also need to take into account spelled out digits like "one",
        "two", etc. The toggle switch turns on advanced parsing for part two.
      </p>
      <LineEditor />
    </DayPage>
  );
};

export default Day1;
