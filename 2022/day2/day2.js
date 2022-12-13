const fs = require('fs'),
  readline = require('readline'),
  path = require('path'),
  filePath = path.join(__dirname, 'day2-input.txt');

const values = {
  'A': 0,
  'B': 1,
  'C': 2,
  'X': 0,
  'Y': 1,
  'Z': 2
};

function differenceMod3(difference) {
  // negative numbers get mapped to the inverse mod 3 of their absolute values
  if (difference < 0) return 3 + difference;
  return difference;
}

const outcomes = {
  0: 3,
  1: 0,
  2: 6
};

function computeScore(round) {
  const difference = differenceMod3(round[0] - round[1]);
  const outcome = outcomes[difference];
  const score = outcome + round[1] + 1;
  return score;
}

function parseLine(line) {
  return [values[line[0]], values[line[2]]];
}

async function readLines() {
  const fileStream = fs.createReadStream(filePath);
  const lineReader = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let totalScore = 0;

  for await (const line of lineReader) {
    const round = parseLine(line);
    totalScore += computeScore(round);
  }

  console.log(totalScore);
}

readLines();