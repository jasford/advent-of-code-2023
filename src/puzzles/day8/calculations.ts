import { memo } from 'radash';
import inputRaw from './input.txt?raw';

interface Node {
  label: string
  data: [string, string]
  left?: Node
  right?: Node
}

const parseNode = (line: string): Node => {
  const [label, turns] = line.split(' = ');
  const data = turns.slice(1, -1).split(',').slice(0, 2).map(s => s.trim()) as [string, string];
  return { label, data };
};

const linkNodes = (nodes: Node[]): void => {
  nodes.forEach(node => {
    node.left = nodes.find(n => n.label === node.data[0]);
    node.right = nodes.find(n => n.label === node.data[1]);
  });
};

const parseData = memo((): { nodes: Node[], path: string } => {
  const [path, data] = inputRaw.trim().split('\n\n');
  const nodes = data.split('\n').map(parseNode);
  linkNodes(nodes);
  return { nodes, path };
});

const lcm = (n1: number, n2: number): number => {
  const max = Math.max(n1, n2);
  const min = Math.min(n1, n2);
  let i = max;
  while (i % min !== 0) i += max;
  return i;
};

const stepsToNode = ({
  path, pathCursor, node, predicate,
}: {
  path: string
  pathCursor: number
  node: Node
  predicate: (node: Node) => boolean
}): { steps: number, node: Node, pathCursor: number } | null => {
  let count = 0;
  let currentNode = node;
  let cursor = pathCursor;
  while (count === 0 || !predicate(currentNode)) {
    const direction = path[cursor];
    const nextNode = direction === 'L' ? currentNode.left : currentNode.right;
    if (nextNode === undefined) return null;
    currentNode = nextNode;
    count += 1;
    cursor = cursor < (path.length - 1) ? cursor + 1 : 0;
  }
  return {
    steps: count,
    pathCursor: cursor,
    node: currentNode,
  };
};

const getP1 = memo((): number => {
  const { path, nodes } = parseData();
  const node = nodes.find(n => n.label === 'AAA');
  if (node === undefined) return 0;
  return stepsToNode({
    path,
    pathCursor: 0,
    node,
    predicate: n => n.label === 'ZZZ',
  })?.steps ?? 0;
});

const getP2 = memo((): number => {
  const { path, nodes } = parseData();
  const startNodes = nodes.filter(n => n.label.endsWith('A'));
  return startNodes.map(node => {
    const stepsToZ = stepsToNode({
      path,
      node,
      pathCursor: 0,
      predicate: n => n.label.endsWith('Z'),
    });
    if (stepsToZ === null) return 0;
    const loop = stepsToNode({
      path,
      node: stepsToZ.node,
      pathCursor: stepsToZ.pathCursor,
      predicate: n => n === stepsToZ.node,
    });
    return loop?.steps ?? 0;
  }).reduce((a, b) => lcm(a, b), 1);
});

export const getSolutions = memo((): { p1: number, p2: number } => ({
  p1: getP1(),
  p2: getP2(),
}));
