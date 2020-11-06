# Markov Generator
Given a filename or an array of filenames, this class will stream in each seed file and build an overall table from which it generates markov text output from. Inspired by [this dailyprogrammer challenge.](https://www.reddit.com/r/dailyprogrammer/comments/4n6hc2/20160608_challenge_270_intermediate_generating/)

### Example Usage
```javascript
const filesRoot = './files';
const seedFiles = [
  `${filesRoot}/Kardashian.txt`,
  `${filesRoot}/PaulGrahamLifeIsShort.txt`,
  `${filesRoot}/PaulGrahamPAStartup.txt`,
  `${filesRoot}/PaulGrahamWhyNerdsAreUnpopular.txt`
];
const markov = new MarkovGenerator(seedFiles);
markov.generate().then(console.log);
```

## This branch
This branch is set up to specifically create fake trump tweets based on over 700 entries culled by a friend. It's set up with an index.js already, so just do this:

```
git clone git@github.com:Robert-Wett/MarkovGenerator.git;
cd MarkovGenerator;
npm install;
node index.js
```