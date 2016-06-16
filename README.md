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
Yields:

`'Unfortunately I saved the toughest part for last. There is one more thing you need to know your face, and how to slim your nose and not make it look great. I just think you need to be constantly reminding oneself of the grim reaper hovering at everyone's shoulder. Perhaps a better solution is to look at the empirical evidence. Look at the histories of the most effective things a university could do to become a startup hub, and it's pretty clear why. A city has to tolerate strangeness to be a startup hub, and Pittsburgh hasn't got it: investors. Silicon Valley has a big investor community in the short term. But fortunately there are three trends that make that less necessary than it used to be. One is that startups are increasingly cheap to start, so you just don't need as much outside money as you used to. The second is that thanks to things like Kickstarter, a startup can get to revenue faster. You can put something on Kickstarter from anywhere. The third is programs like Y Combinator. A startup from anywhere in the world can go to YC for 3 months, pick up funding, and then return home if they want.'`
