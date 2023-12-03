import { getFirstNum, inputData } from './calculations';
import lineHighlighter from './lineHighlighter';

const createCumulativeSummer = (sum: number) => (value: number) => {
  sum += value;
  return sum;
};

const Sheet = ({ advanced }: { advanced: boolean }): JSX.Element => {
  const cumulativeSum = createCumulativeSummer(0);
  const list = inputData.map((line) => {
    const firstNum = getFirstNum(advanced)(line);
    const lastNum = getFirstNum(advanced)(line, true);
    const value = firstNum[0] * 10 + lastNum[0];
    const highlighted = lineHighlighter({
      firstIndex: firstNum[1] ?? 0,
      lastIndex: lastNum[1] ?? 0,
      advanced,
    })(line);
    return {
      line,
      highlighted,
      value,
      cumulative: cumulativeSum(value),
    };
  });
  return (
    <div className="mt-20">
      <div className="flex text-sm font-bold uppercase min-width-0 py-2">
        <div className="flex-1">Line</div>
        <div className="text-right w-20">Value</div>
        <div className="text-right w-20">Total</div>
      </div>
      {list.map(({ value, highlighted, cumulative }, i) => (
        <div key={i} className="py-2 border-t flex text-xs min-width-0">
          <div className="flex-1">{highlighted}</div>
          <div className="text-right w-20">{value}</div>
          <div className="text-right w-20">{cumulative}</div>
        </div>
      ))}
    </div>
  );
};

export default Sheet;
