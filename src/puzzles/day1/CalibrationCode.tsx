const CalibrationCode = ({ code }: { code: string }): JSX.Element => (
  <div className="grid grid-cols-2 divide-x outline outline-1 outline-slate-600 my-px w-12 text-xs font-bold flex ">
    {[0, 1].map((i) => (
      <div key={i} className={`flex items-center justify-center ${i === 0 ? 'text-teal-600' : 'text-pink-600'}`}>
        {code[i] ?? ''}
      </div>
    ))}
  </div>
);

export default CalibrationCode;
