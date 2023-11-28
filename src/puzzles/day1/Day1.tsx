import DayPage from '../../components/DayPage';
import { parse } from './calculations';

const Day1 = (): JSX.Element => {
  const data = parse();
  console.log(data);
  return (
    <DayPage day={1}>
      <p>
        Day 1. Ready to go.
      </p>
    </DayPage>
  );
};

export default Day1;
