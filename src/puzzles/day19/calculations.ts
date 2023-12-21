import { memo, sum } from 'radash';
import inputRaw from './input.txt?raw';

interface Rule {
  key: number
  lt: boolean
  val: number
  dest: string
}

interface Workflow {
  rules: Rule[]
  fallback: string
}

const keyFromStr = memo((s: string): number => {
  return 'xmas'.split('').indexOf(s);
});

type Workflows = Record<string, Workflow>;

type Part = number[];

const parseRule = (data: string): Rule => {
  const ltParts = data.split('<');
  if (ltParts.length === 2) {
    const [val, dest] = ltParts[1].split(':');
    return {
      key: keyFromStr(ltParts[0]),
      lt: true,
      val: parseInt(val),
      dest,
    };
  } else {
    const gtParts = data.split('>');
    const [val, dest] = gtParts[1].split(':');
    return {
      key: keyFromStr(gtParts[0]),
      lt: false,
      val: parseInt(val),
      dest,
    };
  }
};

const parseWorkflow = (data: string): Workflow => {
  const dataParts = data.split(',');
  return {
    rules: dataParts.slice(0, -1).map(parseRule),
    fallback: dataParts[dataParts.length - 1],
  };
};

const parseWorkflows = (data: string): Workflows => {
  const res: Record<string, Workflow> = {};
  data.split('\n').forEach(row => {
    const [key, remainder] = row.split('{');
    res[key] = parseWorkflow(remainder.substring(0, remainder.length - 1));
  });
  return res;
};

const parsePart = (data: string): Part => {
  return data.slice(1, -1).split(',').map(v => parseInt(v.split('=')[1]));
};

const parseInput = (): { workflows: Workflows, parts: Part[] } => {
  const [a, b] = inputRaw.trim().split('\n\n');
  return {
    workflows: parseWorkflows(a),
    parts: b.split('\n').map(parsePart),
  };
};

const runWorkflow = (workflow: Workflow, part: Part): string => {
  return workflow.rules.find(rule => {
    const v = part[rule.key];
    return (rule.lt && v < rule.val) || (!rule.lt && v > rule.val);
  })?.dest ?? workflow.fallback;
};

const processPart = (workflows: Workflows) => (part: Part): boolean => {
  let workflow = 'in';
  let outcome: boolean | null = null;
  while (outcome === null) {
    workflow = runWorkflow(workflows[workflow], part);
    if (workflow === 'A') outcome = true;
    if (workflow === 'R') outcome = false;
  }
  return outcome;
};

interface Range {
  min: number
  max: number
}

type Filter = Range[];

const validFilter = (filter: Filter): boolean => {
  return filter.find(({ min, max }) => max < min) === undefined;
};

const filterSize = (filter: Filter): number => {
  return filter.map(range => {
    return Math.max(0, range.max + 1 - range.min);
  }).reduce((res, v) => res * v, 1);
};

const updateRange = (range: Range, key: 'min' | 'max', val: number): Range => {
  const newVal = key === 'min'
    ? Math.max(range.min, val)
    : Math.min(range.max, val);
  return { ...range, [key]: newVal };
};

const addRuleToFilter = (filter: Filter, rule: Rule, required: boolean): Filter => {
  const minMax = (rule.lt && !required) || (!rule.lt && required) ? 'min' : 'max';
  return filter.with(
    rule.key,
    updateRange(
      filter[rule.key],
      minMax,
      rule.val + (required ? 1 : 0) * (minMax === 'min' ? 1 : -1),
    ),
  );
};

const filterFromWorkflow = ({ workflows, filter, key }: {
  workflows: Workflows
  filter: Filter
  key: string
}): Filter[] => {
  if (key === 'R' || !validFilter(filter)) return [];
  if (key === 'A') return [filter];
  const res: Filter[] = [];
  const workflow = workflows[key];
  workflow.rules.forEach((rule, i) => {
    const f = workflow.rules.slice(0, i).reduce<Filter>(
      (f, r) => addRuleToFilter(f, r, false),
      addRuleToFilter(filter, rule, true),
    );
    res.push(...filterFromWorkflow({
      workflows,
      filter: f,
      key: rule.dest,
    }));
  });
  res.push(...filterFromWorkflow({
    workflows,
    filter: workflow.rules.reduce<Filter>(
      (f, r) => addRuleToFilter(f, r, false),
      filter,
    ),
    key: workflow.fallback,
  }));
  return res;
};

const defaultRange = { min: 1, max: 4000 };
const defaultFilter = [defaultRange, defaultRange, defaultRange, defaultRange];

const sumOfAcceptedParts = (data: { workflows: Workflows, parts: Part[] }): number => {
  const acceptedParts = data.parts.filter(processPart(data.workflows));
  return sum(acceptedParts.map(p => sum(p)));
};

const distinctAcceptableParts = (data: { workflows: Workflows, parts: Part[] }): number => {
  return sum(filterFromWorkflow({
    workflows: data.workflows,
    filter: defaultFilter,
    key: 'in',
  }).map(filterSize));
};

export const getSolutions = memo((): { p1: number, p2: number } => {
  const data = parseInput();
  return {
    p1: sumOfAcceptedParts(data),
    p2: distinctAcceptableParts(data),
  };
});
