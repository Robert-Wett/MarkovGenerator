const fs = require('fs');
const path = require('path');
const readline = require('readline');
const inspect = require('util').inspect;
const _ = require('lodash');

const NONWORD = 'NONWORD';

class MarkovGenerator {
  constructor(filePaths, prefixLen=2) {
    if (Array.isArray(filePaths)) {
      this.filePaths = filePaths.map(p => path.resolve(p));
    } else {
      this.filePaths = [path.resolve(filePaths)];
    }
    this.prefixLen = prefixLen;
    this.table = {};
  }

  generate(outputLen=200) {
    return this._buildTable().then(() => {
      let [base, outputArray, current, output] = [this._getBase(), [], , ];
      // Build out the main part of the output to satisfy minimum length
      while (outputArray.length < outputLen) {
        current = _.sample(this.table[base.join(' ')]);
        if (!current) {
          base = this._getBase();
        } else {
          if (current !== NONWORD) {
            outputArray.push(current);
          }
          base.push(current);
          base.shift();
        }
      }
      // Try for a bit to end on a word with a period/end of sentence.
      for (let i = 0; i < 25 && current[current.length - 1] !== '.'; i++) {
        current = _.sample(this.table[base.join(' ')]);
        outputArray.push(current);
        base.shift();
        base.push(current);
      }

      output = outputArray.join(' ');
      output = output[output.length - 1] === '.' ? output : `${output}.`;

      return Promise.resolve(output);
    });
  }

  _buildTable() {
    if (Object.keys(this.table).length) {
      return Promise.resolve();
    }

    return Promise.all(
      this.filePaths.map(f => this._readAndParseFile(f, this._getBase()))
    );
  }

  _readAndParseFile(filePath, seed) {
    const readStream = fs.createReadStream(filePath);
    const reader = readline.createInterface({ input: readStream });
    let sentence = seed;

    reader.on('line', line => {
      if (line !== '') {
        sentence = sentence.concat(line.split(' '));
        while (sentence.length > this.prefixLen) {
          this._chomp(sentence);
        }
      }
    });

    return new Promise(resolve => {
      reader.on('close', () => {
        sentence.push(NONWORD);
        resolve(this._chomp(sentence));
      });
    });
  }

  _chomp(sentence) {
    let i = 0;
    let keyName = [];
    for (i; i < this.prefixLen; i++) {
      keyName.push(sentence[i]);
    }

    if (sentence[i]) {
      keyName = keyName.join(' ');
      this.table[keyName] = (this.table[keyName] || []).concat([sentence[i]]);
      sentence.shift();
    }
  }

  _getBase() {
    return new Array(this.prefixLen + 1).join(NONWORD + ' ').trim().split(' ');
  }
};

module.exports = MarkovGenerator;
