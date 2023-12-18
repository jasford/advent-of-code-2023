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
    summary: 'Just barely go this one done. No visualization yet. Hopefully I can come back to this one. I have some ideas.',
  },
  {
    headline: 'Wait For It',
    summary: 'An easier puzzle, and an opportunity to use a slider bar and do a little algebraic graphing!',
  },
  {
    headline: 'Camel Cards',
    summary: 'A simplified version of poker, sorting hands based on scoring rules. Didn\'t have time to make a visualization.',
  },
  {
    headline: 'Haunted Wasteland',
    summary: 'A branching graph of nodes with left and right edges. No visualization today.',
  },
  {
    headline: 'Mirage Maintenance',
    summary: 'Derivatives of number sequences to predict the next (and previous) number. No visualization for this one either.',
  },
  {
    headline: 'Pipe Maze',
    summary: 'A giant pipe loop with a gazillion bends in it. I managed to make an SVG to show the pipe loop and highlight the open space fully contained by the loop.',
  },
  {
    headline: 'Cosmic Expansion',
    summary: 'This one uses taxi cab distances with a fun concept of stars in an expanding universe. Lots going on today and no time to make a visualization.',
  },
  {
    headline: 'Hot Springs',
    summary: 'I struggled with this one. First day I had to look at a solution someone else wrote to see how to get this to perform better.',
  },
  {
    headline: 'Point of Incidence',
    summary: 'This one was easier (thankfully), but I was a day behind. Haven\'t had time to make a visualization in a while.',
  },
  {
    headline: 'Parabolic Reflector Dish',
    summary: 'Moving rocks on a dish by tilting it - I made a little d-pad with keyboard controls for this one.',
  },
  {
    headline: 'Lens Library',
    summary: 'A simple hash function and series of steps to align the lenses. This one was fast and easy for me, but I did\'t make a visualization.',
  },
  {
    headline: 'The Floor Will Be Lava',
    summary: 'A beam of light bouncing off an array of angled mirrors. This was fun to visualize. May revisit to add an animation.',
  },
];

export default puzzles;
