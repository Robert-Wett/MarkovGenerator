
const MarkovGenerator = require('./lib/markovGenerator');

const filePrefix = './files/trump';
const TrumpSeedFiles = [
  `${filePrefix}1.txt`,
  `${filePrefix}2.txt`,
  `${filePrefix}3.txt`,
  `${filePrefix}4.txt`,
  `${filePrefix}5.txt`,
  `${filePrefix}6.txt`,
  `${filePrefix}7.txt`,
  `${filePrefix}8.txt`,
  `${filePrefix}9.txt`,
  `${filePrefix}10.txt`,
  `${filePrefix}11.txt`,
  `${filePrefix}12Corona.txt`,
  `${filePrefix}13RallySpeeches.txt`,
  `${filePrefix}14ArlingtonVA.txt`,
];

const CreateTrumpBot = (seeds = TrumpSeedFiles, markov = MarkovGenerator) =>
  new markov(seeds);

module.exports =  {
  TrumpSeedFiles,
  MarkovGenerator,
  CreateTrumpBot,
};
