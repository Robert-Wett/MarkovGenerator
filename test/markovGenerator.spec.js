const sinon = require('sinon');
const expect = require('chai').expect;
const path = require('path');

const MarkovGenerator = require('../lib/markovGenerator');
const none = 'NONWORD';

describe('MarkovGenerator', () => {

  describe('#constructor()', () => {
    it('accepts a string filePaths value', done => {
      const markov = new MarkovGenerator('./test/fixtures/PaulGrahamPAStartup.txt');
      markov.generate().then(output => {
        expect(output).to.be.ok;
        done();
      });
    });

    it('accepts an array filePaths value', done => {
      const markov = new MarkovGenerator([
        './test/fixtures/PaulGrahamPAStartup.txt',
        './test/fixtures/TheBeatitudes.txt'
      ]);
      markov.generate().then(output => {
        expect(output).to.be.ok;
        done();
      });
    });

    it('accepts relative or full paths', () => {
      const markov = new MarkovGenerator([
        path.resolve('./test/fixtures/PaulGrahamPAStartup.txt'),
        './test/fixtures/TheBeatitudes.txt'
      ]);
      markov.generate().then(output => {
        expect(output).to.be.ok;
        done();
      });
    })
    
    it('supports Order-n groupings', done => {
      const [expectedM1Length, expectedM3Length] = [1, 3];
      const [m1, m2] = [
        new MarkovGenerator('./test/fixtures/TheBeatitudes.txt', expectedM1Length),
        new MarkovGenerator('./test/fixtures/TheBeatitudes.txt', expectedM3Length)
      ];
      
      Promise.all([
        m1.generate(),
        m2.generate()
      ]).then(results => {
        expect(Object.keys(m1.table)[0].split(' ').length).to.equal(expectedM1Length);
        expect(Object.keys(m2.table)[0].split(' ').length).to.equal(expectedM3Length);
        done();
      });
    });
  });

  describe('#generate()', () => {
    it('creates output text with minimum length specified', done => {
      const markov = new MarkovGenerator('./test/fixtures/PaulGrahamPAStartup.txt');
      const expectedMinOutputLen = 500;
      markov.generate(expectedMinOutputLen).then(output => {
        expect(output.length).to.be.at.least(expectedMinOutputLen);
        done();
      });
    });

    it('reads in files and builds table only once with successive .generate() calls', done => {
      let markov = new MarkovGenerator('./test/fixtures/PaulGrahamPAStartup.txt');
      sinon.spy(markov, '_readAndParseFile');

      markov.generate().then(() => {
        return markov.generate();
      }).then(() => {
        expect(markov._readAndParseFile.calledOnce).to.be.true;
        done();
      });
    });
  });
});
