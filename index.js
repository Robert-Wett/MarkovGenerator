const MarkovGenerator = require('./lib/markovGenerator');

const filePrefix = './files/trump';
const trumpBot = new MarkovGenerator([
  `${filePrefix}1.txt`,
  `${filePrefix}2.txt`,
  `${filePrefix}3.txt`,
  `${filePrefix}4.txt`,
  `${filePrefix}5.txt`,
  `${filePrefix}6.txt`,
  `${filePrefix}7.txt`,
  `${filePrefix}8.txt`,
]);

trumpBot.generate(15).then((gibberish) => console.log(`${gibberish}\n\n`));
trumpBot.generate(15).then((gibberish) => console.log(`${gibberish}\n\n`));
trumpBot.generate(15).then((gibberish) => console.log(`${gibberish}\n\n`));
trumpBot.generate(15).then((gibberish) => console.log(`${gibberish}\n\n`));
trumpBot.generate(15).then((gibberish) => console.log(`${gibberish}\n\n`));