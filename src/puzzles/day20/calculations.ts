import { memo, set } from 'radash';
import inputRaw from './input.txt?raw';

enum Pulse { L, H }

interface QueuedPulse {
  pulse: Pulse
  source: string
  target: string
}

interface State {
  modules: Modules
  queue: QueuedPulse[]
  sent: {
    [Pulse.L]: number
    [Pulse.H]: number
  }
  halted: boolean
  pushCount: number
}

interface ModBase {
  type: string
  output: string[]
}
interface Broadcaster extends ModBase {
  type: 'broadcaster'
}

interface FlipFlop extends ModBase {
  type: 'flipflop'
  state: boolean
}

interface Conjunction extends ModBase {
  type: 'conjunction'
  state: Record<string, Pulse>
  lastHighPulse: number
  highPulseCycle: number
}

type Module = Broadcaster | FlipFlop | Conjunction;
type Modules = Record<string, Module>;

const parseInput = (): Modules => {
  const modules: Modules = {
    button: {
      type: 'broadcaster',
      output: ['broadcaster'],
    },
  };
  inputRaw.trim().split('\n').forEach(row => {
    const [source, dest] = row.split(' -> ');
    const output = dest.split(', ');
    if (source[0] === '%') {
      modules[source.substring(1)] = {
        type: 'flipflop',
        state: false,
        output,
      } satisfies FlipFlop;
    } else if (source[0] === '&') {
      modules[source.substring(1)] = {
        type: 'conjunction',
        state: {},
        output,
        lastHighPulse: 0,
        highPulseCycle: 0,
      } satisfies Conjunction;
    } else if (source === 'broadcaster') {
      modules.broadcaster = {
        type: 'broadcaster',
        output,
      } satisfies Broadcaster;
    }
  });
  Object.keys(modules).forEach(key => {
    const mod = modules[key];
    if (mod.type !== 'conjunction') return;
    Object.keys(modules).forEach(key2 => {
      const mod2 = modules[key2];
      if (mod2.output.includes(key)) mod.state[key2] = Pulse.L;
    });
  });
  return modules;
};

const lcm = (n1: number, n2: number): number => {
  const max = Math.max(n1, n2);
  const min = Math.min(n1, n2);
  let i = max;
  while (i % min !== 0) i += max;
  return i;
};

const runState = (state: State, halt?: string): State => {
  const pulseEntry = state.queue.shift();
  if (pulseEntry === undefined) return state;
  const { pulse, target, source } = pulseEntry;
  const nextState = {
    ...state,
    sent: { ...state.sent, [pulse]: state.sent[pulse] + 1 },
    pushCount: state.pushCount + (source === 'button' ? 1 : 0),
  };
  if (halt !== undefined && target === halt && pulse === Pulse.L) {
    nextState.halted = true;
  }
  const mod = state.modules[target];
  if (mod === undefined) return nextState;
  const queuePulse = (pulse: Pulse) => (t: string) => {
    nextState.queue = [
      ...nextState.queue,
      { target: t, pulse, source: target },
    ];
  };
  if (mod.type === 'broadcaster') {
    mod.output.forEach(queuePulse(pulse));
    return nextState;
  }
  if (mod.type === 'flipflop') {
    if (pulse === Pulse.H) return nextState;
    nextState.modules = {
      ...nextState.modules,
      [target]: { ...mod, state: !mod.state },
    };
    mod.output.forEach(queuePulse(!mod.state ? Pulse.H : Pulse.L));
    return nextState;
  }
  if (mod.type === 'conjunction') {
    const nextMod = set(mod, `state.${source}`, pulse);
    const allHigh = Object.values(nextMod.state).find(p => p === Pulse.L) === undefined;
    const toSend = allHigh ? Pulse.L : Pulse.H;
    if (toSend === Pulse.H) {
      if (nextMod.lastHighPulse > 0 && nextMod.highPulseCycle === 0) {
        nextMod.highPulseCycle = nextState.pushCount - nextMod.lastHighPulse;
      }
      nextMod.lastHighPulse = nextState.pushCount;
    }
    mod.output.forEach(queuePulse(toSend));
    nextState.modules = set(nextState.modules, target, nextMod);
    return nextState;
  }
  return nextState;
};

const getP1 = memo((): number => {
  let state: State = {
    modules: parseInput(),
    queue: [],
    sent: { [Pulse.L]: 0, [Pulse.H]: 0 },
    pushCount: 0,
    halted: false,
  };
  const pushButton = (): void => {
    state.queue = [{ source: 'button', target: 'broadcaster', pulse: Pulse.L }];
    while (state.queue.length > 0) {
      state = runState(state, 'mx');
    }
  };
  for (let i = 0; i < 1000; i++) pushButton();
  return state.sent[Pulse.L] * state.sent[Pulse.H];
});

const getP2 = memo((): number => {
  let state: State = {
    modules: parseInput(),
    queue: [],
    sent: { [Pulse.L]: 0, [Pulse.H]: 0 },
    pushCount: 0,
    halted: false,
  };
  const pushButton = (): void => {
    state.queue = [{ source: 'button', target: 'broadcaster', pulse: Pulse.L }];
    while (state.queue.length > 0) {
      state = runState(state, 'rx');
    }
  };
  while (!state.halted && state.pushCount < 10000) {
    pushButton();
    const cycles = ['dh', 'qd', 'dp', 'bb'].map(
      key => (state.modules[key] as Conjunction).highPulseCycle,
    );
    if (!cycles.includes(0)) return cycles.reduce(lcm);
  }
  return state.pushCount;
});

export const getSolutions = memo((): { p1: number, p2: number } => {
  const p1 = getP1();
  const p2 = getP2();
  return { p1, p2 };
});
