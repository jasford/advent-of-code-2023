interface PuzzleDay {
  headline: string
  summary: string
}

const puzzles: PuzzleDay[] = [
  {
    headline: 'Trebuchet?!',
    summary: "For day one we're parsing calibration code strings. I built a syntax highlighter to see how the parsing algorithm works interactively.",
  },
  {
    headline: 'Cube Conundrum',
    summary: 'Struggled to visualize this one. Ended up with some little retro-looking color cards to sort of show how the calculation works.',
  },
  {
    headline: 'Gear Ratios',
    summary: 'For this one we get a giant SVG image showing color-coded data. Less interesting to look at, but was helpful in troubleshooting the solution code.',
  },
  {
    headline: 'Scratchcards',
    summary: 'Finally a data set that lends itself to some nice graphing! The output is an exponential growth curve that seems to collapse to zero every so often.',
  },
  {
    headline: 'Give A Seed A Fertilizer',
    summary: 'Pretty ugly for now.',
  },
];

export default puzzles;
